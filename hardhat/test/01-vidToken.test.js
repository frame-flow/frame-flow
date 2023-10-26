// test/VIDToken.test.js

const { expect } = require("chai")

describe("VIDToken", function () {
    let VIDToken, vidToken, admin, advertiser, user1, user2, whitelistUser

    beforeEach(async function () {
        VIDToken = await ethers.getContractFactory("VIDToken")
        ;[admin, advertiser, user1, user2, whitelistUser] =
            await ethers.getSigners()

        vidToken = await VIDToken.deploy(admin.address)
    })

    describe("Deployment", function () {
        it("Should set the correct admin", async function () {
            expect(await vidToken.getAdmin()).to.equal(admin.address)
        })
    })

    describe("Video play and Ad click", function () {
        it("Should mint tokens when a video is played", async function () {
            await vidToken.connect(admin).playVideo(user1.address, 1000)
            expect(await vidToken.balanceOf(user1.address)).to.equal(1000)
        })

        it("Should burn tokens when an ad is clicked", async function () {
            await vidToken
                .connect(admin)
                .setAdvertiser(advertiser.address, true)
            await vidToken.connect(admin).playVideo(advertiser.address, 1000)
            await vidToken.connect(admin).clickAD(advertiser.address, 500)
            expect(await vidToken.balanceOf(advertiser.address)).to.equal(500)
        })
    })

    describe("Transfers", function () {
        beforeEach(async function () {
            await vidToken.connect(admin).playVideo(user1.address, 1000)
            await vidToken
                .connect(admin)
                .setAdvertiser(advertiser.address, true)
        })

        it("Advertiser cannot sell if not whitelisted", async function () {
            await expect(
                vidToken.connect(advertiser).transfer(user2.address, 500)
            ).to.be.revertedWith("VIDToken__AdvertisersCannotSellToken")
        })

        it("Whitelisted non-advertisers cannot sell to non-advertisers", async function () {
            await vidToken
                .connect(admin)
                .setWhiteList(whitelistUser.address, true)
            await vidToken.connect(admin).playVideo(whitelistUser.address, 1000)
            await expect(
                vidToken.connect(whitelistUser).transfer(user2.address, 500)
            ).to.be.revertedWith("VIDToken__OnlySellToAdvertisers")
        })

        it("Allows transfer from non-advertiser to advertiser", async function () {
            await vidToken.connect(user1).transfer(advertiser.address, 500)
            expect(await vidToken.balanceOf(advertiser.address)).to.equal(500)
            expect(await vidToken.balanceOf(user1.address)).to.equal(500)
        })
    })
})
