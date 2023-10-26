// test/TokenMarketplace.test.js

const { expect } = require("chai")

describe("TokenMarketplace", function () {
    let VIDToken, TokenMarketplace, token, marketplace, owner, seller, buyer

    beforeEach(async function () {
        VIDToken = await ethers.getContractFactory("VIDToken")
        TokenMarketplace = await ethers.getContractFactory("TokenMarketplace")
        ;[owner, seller, buyer] = await ethers.getSigners()

        token = await VIDToken.deploy(owner.address)
        marketplace = await TokenMarketplace.deploy(token.address)

        // Mint some tokens for the seller
        await token.playVideo(seller.address, ethers.utils.parseEther("1000"))
    })

    describe("Create order", function () {
        it("Should create a new order", async function () {
            await token
                .connect(seller)
                .approve(marketplace.address, ethers.utils.parseEther("100"))
            await marketplace
                .connect(seller)
                .createOrder(
                    ethers.utils.parseEther("100"),
                    ethers.utils.parseEther("0.01")
                )

            const order = await marketplace.orders(0)
            expect(order.seller).to.equal(seller.address)
            expect(order.amount).to.equal(ethers.utils.parseEther("100"))
            expect(order.price).to.equal(ethers.utils.parseEther("0.01"))
        })
    })

    describe("Buy tokens", function () {
        beforeEach(async function () {
            await token
                .connect(seller)
                .approve(marketplace.address, ethers.utils.parseEther("100"))
            await marketplace
                .connect(seller)
                .createOrder(
                    ethers.utils.parseEther("100"),
                    ethers.utils.parseEther("0.01")
                )
        })

        it("Should allow a buyer to purchase tokens", async function () {
            await marketplace
                .connect(buyer)
                .buyTokens(0, { value: ethers.utils.parseEther("1") })
            expect(await token.balanceOf(buyer.address)).to.equal(
                ethers.utils.parseEther("100")
            )
            expect(
                await ethers.provider.getBalance(marketplace.address)
            ).to.equal(0)
            expect(await marketplace.getProceeds(seller.address)).to.equal(
                ethers.utils.parseEther("1")
            )
        })
    })

    describe("Withdraw proceeds", function () {
        beforeEach(async function () {
            await token
                .connect(seller)
                .approve(marketplace.address, ethers.utils.parseEther("100"))
            await marketplace
                .connect(seller)
                .createOrder(
                    ethers.utils.parseEther("100"),
                    ethers.utils.parseEther("0.01")
                )
            await marketplace
                .connect(buyer)
                .buyTokens(0, { value: ethers.utils.parseEther("1") })
        })

        it("Should allow a seller to withdraw their proceeds", async function () {
            const beforeBalance = await ethers.provider.getBalance(
                seller.address
            )
            const tx = await marketplace.connect(seller).withdrawProceeds()
            const afterBalance = await ethers.provider.getBalance(
                seller.address
            )

            const txReceipt = await tx.wait()
            const gasUsed = txReceipt.gasUsed.mul(tx.gasPrice)

            expect(afterBalance.sub(beforeBalance.add(gasUsed))).to.equal(
                ethers.utils.parseEther("1")
            )
        })
    })
})
