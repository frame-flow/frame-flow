// test/TokenMarketplace.test.js

const { expect, assert } = require("chai")

describe("TokenMarketplace", function () {
    let VIDToken, TokenMarketplace, token, marketplace, owner, seller, buyer

    beforeEach(async function () {
        VIDToken = await ethers.getContractFactory("VIDToken")
        TokenMarketplace = await ethers.getContractFactory("TokenMarketplace")
        ;[owner, seller, buyer] = await ethers.getSigners()

        token = await VIDToken.deploy(owner.address)
        marketplace = await TokenMarketplace.deploy(token.target)
        await token.connect(owner).setWhiteList(marketplace.target, true)
        await token.connect(owner).setAdvertiser(buyer.address, true)

        // Mint some tokens for the seller
        await token.playVideo(seller.address, ethers.parseEther("1000"))
    })
    describe("Create order Failed NotApprovedForMarketplace", function () {
        it("Should create a new order", async function () {
            await expect(
                marketplace
                    .connect(seller)
                    .createOrder(
                        ethers.parseEther("100"),
                        ethers.parseEther("0.01")
                    )
            ).to.be.revertedWithCustomError(
                marketplace,
                "NotApprovedForMarketplace"
            )
        })
        it("Insufficient token balance", async function () {
            await expect(
                marketplace
                    .connect(buyer)
                    .createOrder(
                        ethers.parseEther("100"),
                        ethers.parseEther("0.01")
                    )
            ).to.be.reverted
        })
        it("Price must be greater than zero", async function () {
            await expect(
                marketplace
                    .connect(buyer)
                    .createOrder(ethers.parseEther("100"), 0)
            ).to.be.reverted
        })
    })

    describe("Create order", function () {
        it("Should create a new order", async function () {
            await token
                .connect(seller)
                .approve(marketplace.target, ethers.parseEther("100"))
            await marketplace
                .connect(seller)
                .createOrder(
                    ethers.parseEther("100"),
                    ethers.parseEther("0.01")
                )

            const order = await marketplace.orders(0)
            expect(order.seller).to.equal(seller.address)
            expect(order.amount).to.equal(ethers.parseEther("100"))
            expect(order.price).to.equal(ethers.parseEther("0.01"))
        })
    })

    describe("Buy tokens", function () {
        beforeEach(async function () {
            await token
                .connect(seller)
                .approve(marketplace.target, ethers.parseEther("100"))
            await marketplace
                .connect(seller)
                .createOrder(ethers.parseEther("100"), 1)
        })

        it("Invaild order id", async function () {
            await expect(marketplace.connect(buyer).buyTokens(1, { value: 1 }))
                .to.be.reverted
        })
        it("Should allow a buyer to purchase tokens", async function () {
            const price = await marketplace.getPrice(0)

            await expect(
                marketplace
                    .connect(buyer)
                    .buyTokens(1, { value: price - BigInt(1) })
            ).to.be.reverted
        })

        it("Should allow a buyer to purchase tokens", async function () {
            const price = await marketplace.getPrice(0)

            await marketplace.connect(buyer).buyTokens(0, { value: price })
            expect(await token.balanceOf(buyer.address)).to.equal(
                ethers.parseEther("100")
            )
            expect(
                await ethers.provider.getBalance(marketplace.target)
            ).to.equal(ethers.parseEther("100"))
            expect(await marketplace.getProceeds(seller.address)).to.equal(
                ethers.parseEther("100")
            )
        })
    })

    describe("Withdraw proceeds", function () {
        beforeEach(async function () {
            await token
                .connect(seller)
                .approve(marketplace.target, ethers.parseEther("100"))
            await marketplace
                .connect(seller)
                .createOrder(ethers.parseEther("100"), 1)

            const price = await marketplace.getPrice(0)

            await marketplace.connect(buyer).buyTokens(0, { value: price })
        })

        it("Should allow a seller to withdraw their proceeds", async function () {
            const beforeBalance = await ethers.provider.getBalance(
                seller.address
            )
            const ProceedsBefore = await marketplace
                .connect(seller)
                .getProceeds(seller.address)

            const tx = await marketplace.connect(seller).withdrawProceeds()
            const afterBalance = await ethers.provider.getBalance(
                seller.address
            )

            const txReceipt = await tx.wait()
            const gasUsed = txReceipt.gasUsed * txReceipt.gasPrice

            // expect(afterBalance - (beforeBalance + gasUsed)).to.equal(
            //     ProceedsBefore
            // )
            assert(
                (afterBalance + gasUsed).toString() ==
                    (beforeBalance + ProceedsBefore).toString()
            )
        })
        it("Should not allow a non-seller to withdraw proceeds", async function () {
            await expect(
                marketplace.connect(buyer).withdrawProceeds()
            ).to.be.revertedWithCustomError(marketplace, "NoProceeds")
        })
    })
})
