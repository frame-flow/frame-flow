// test/VIDToken.test.js

const { assert, expect } = require("chai")

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
        it("Only admin can set the Advertiser", async function () {
            await expect(
                vidToken.connect(user1).setAdvertiser(user1.address, true)
            ).to.be.revertedWithCustomError(vidToken, "VIDToken__NotAdmin")
        })
    })

    describe("Video play and Ad click", function () {
        it("Should mint tokens when a video is played", async function () {
            await vidToken.connect(admin).playVideo(user1.address, 1000)
            expect(await vidToken.balanceOf(user1.address)).to.equal(1000)
        })

        it("Only admin can call play video", async function () {
            await expect(
                vidToken.connect(user1).playVideo(user1.address, 1000)
            ).to.be.revertedWithCustomError(vidToken, "VIDToken__NotAdmin")
        })

        it("Only admin can call clickAD", async function () {
            await expect(
                vidToken.connect(user1).clickAD(advertiser.address, 1000)
            ).to.be.revertedWithCustomError(vidToken, "VIDToken__NotAdmin")
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

        it("Advertiser cannot sell ", async function () {
            await expect(
                vidToken.connect(advertiser).transfer(user2.address, 500)
            ).to.be.revertedWithCustomError(
                vidToken,
                "VIDToken__AdvertisersCannotSellToken"
            )
        })

        it("Whitelisted non-advertisers cannot sell to non-advertisers", async function () {
            await vidToken.connect(admin).playVideo(user1.address, 1000)

            await expect(
                vidToken.connect(user1).transfer(user2.address, 500)
            ).to.be.revertedWithCustomError(
                vidToken,
                "VIDToken__OnlySellToAdvertisers"
            )
        })

        it("Allows transfer from non-advertiser to advertiser", async function () {
            await vidToken.connect(user1).transfer(advertiser.address, 500)
            expect(await vidToken.balanceOf(advertiser.address)).to.equal(500)
            expect(await vidToken.balanceOf(user1.address)).to.equal(500)
        })
    })

    describe("TransferFrom", function () {
        beforeEach(async function () {
            await vidToken.connect(admin).playVideo(user1.address, 1000)
            await vidToken.connect(admin).playVideo(advertiser.address, 1000)
            await vidToken
                .connect(admin)
                .setAdvertiser(advertiser.address, true)
            vidToken.connect(user1).approve(admin.address, 1000)
            vidToken.connect(user1).approve(advertiser, 1000)
            vidToken.connect(advertiser).approve(admin, 1000)
        })

        it("Cannot sell to non-advertisers", async function () {
            await expect(
                vidToken.connect(admin).transferFrom(user1, user2.address, 500)
            ).to.be.revertedWithCustomError(
                vidToken,
                "VIDToken__OnlySellToAdvertisers"
            )
        })

        it("Advertisers cannot sell Token", async function () {
            await vidToken.connect(admin).playVideo(user1.address, 1000)

            await expect(
                vidToken
                    .connect(admin)
                    .transferFrom(advertiser.address, user2.address, 500)
            ).to.be.revertedWithCustomError(
                vidToken,
                "VIDToken__AdvertisersCannotSellToken"
            )
        })

        it("Allows transfer from non-advertiser to advertiser", async function () {
            await vidToken
                .connect(admin)
                .transferFrom(user1.address, advertiser.address, 500)
            expect(await vidToken.balanceOf(advertiser.address)).to.equal(1500)
            expect(await vidToken.balanceOf(user1.address)).to.equal(500)
        })
    })

    describe("getAdvertiser", function () {
        it("Check for advertisers", async function () {
            expect(await vidToken.getAdvertiser(admin.address)).to.equal(false)
        })
    })
    describe("setWhiteList", function () {
        it("Only admin can modify whiteList", async function () {
            await expect(
                vidToken.connect(user1).setWhiteList(advertiser.address, true)
            ).to.be.revertedWithCustomError(vidToken, "VIDToken__NotAdmin")
        })
        it("Add whitelist item", async function () {
            await vidToken
                .connect(admin)
                .setWhiteList(whitelistUser.address, true)
            expect(await vidToken.getWhiteList(whitelistUser.address)).to.equal(
                true
            )
        })
    })
})
