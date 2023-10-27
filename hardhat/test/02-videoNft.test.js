// test/VideoNFT.test.js

const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("VideoNFT", function () {
    let VideoNFT, videoNFT, admin, user1, platform1

    beforeEach(async function () {
        VideoNFT = await ethers.getContractFactory("VideoNFT")
        ;[admin, user1, platform1] = await ethers.getSigners()
        videoNFT = await VideoNFT.deploy(admin.address)
    })

    describe("Deployment", function () {
        it("Should initialize correctly", async function () {
            expect(await videoNFT.getTokenCounter()).to.equal(0)
        })
    })

    describe("Upload video", function () {
        it("Should mint a new NFT when a video is uploaded", async function () {
            await videoNFT
                .connect(admin)
                .uploadVideo("token_uri_1", user1.address)
            expect(await videoNFT.tokenURI(0)).to.equal("token_uri_1")
            expect(await videoNFT.ownerOf(0)).to.equal(user1.address)
        })

        it("Should reject non-admin uploads", async function () {
            await expect(
                videoNFT
                    .connect(user1)
                    .uploadVideo("token_uri_1", user1.address)
            ).to.be.revertedWithCustomError(videoNFT, "VideoNFT__NotAdmin")
        })
    })

    describe("Change platform", function () {
        beforeEach(async function () {
            await videoNFT
                .connect(admin)
                .uploadVideo("token_uri_1", user1.address)
        })

        it("Should allow NFT owner to change the platform", async function () {
            await videoNFT.connect(user1).changePlatform(0, platform1.address)
            expect(await videoNFT.getNftplatform(0)).to.equal(platform1.address)
        })

        it("Should reject platform change by non-owners", async function () {
            await expect(
                videoNFT.connect(platform1).changePlatform(0, platform1.address)
            ).to.be.revertedWithCustomError(videoNFT, "VideoNFT__NotOwner")
        })
    })

    describe("Transfer restrictions", function () {
        beforeEach(async function () {
            await videoNFT
                .connect(admin)
                .uploadVideo("token_uri_1", user1.address)
        })

        it("Should not allow transfers", async function () {
            await expect(
                videoNFT
                    .connect(user1)
                    .transferFrom(user1.address, platform1.address, 0)
            ).to.be.revertedWithCustomError(
                videoNFT,
                "VideoNFT__NFTCannotTransfer"
            )
            await expect(
                videoNFT
                    .connect(user1)
                    .safeTransferFrom(user1.address, platform1.address, 0)
            ).to.be.revertedWithCustomError(
                videoNFT,
                "VideoNFT__NFTCannotTransfer"
            )
        })
    })
})
