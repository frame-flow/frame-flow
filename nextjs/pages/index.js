/*
 * @Author: diana
 * @Date: 2023-10-22 15:17:00
 * @LastEditTime: 2023-10-29 14:59:57
 */
import Link from "next/link"

import path from "path"

export async function getStaticProps() {
    const fs = require("fs") // Import fs inside the function

    const videoDir = path.join(process.cwd(), "public", "videos")
    const filenames = fs.readdirSync(videoDir)

    const videos = filenames.map((filename) => ({
        id: path.basename(filename, ".mp4"),
        title: path.basename(filename, ".mp4"),
        thumbnail: `/thumbnails/${path.basename(filename, ".mp4")}.jpg`,
    }))
    return {
        props: {
            videos,
        },
    }
}

import { ethers } from "ethers"
import networkMapping from "../constants/networkMapping.json"
import vidToken_abi from "../constants/VIDToken.json"
import account from "../constants/account.json"
import { Widget } from "@web3uikit/core"
import { useContext } from "react"
import { SharedStateContext } from "../components/SharedStateContext"
import Footer from "../components/Footer"
// import Tx from "../pages/tx/tx"

const VIDToken_addr = networkMapping["534351"].VIDToken[0]
const TESTNET_URL = "https://sepolia-rpc.scroll.io/"
const bgImg = `/default.jpg`

export default function HomePage({ videos }) {
    const {
        userbalance,
        setuserBalance,
        platformbalance,
        setplatformBalance,
        advertiserbalance,
        setadvertiserBalance,
    } = useContext(SharedStateContext)

    async function handlewatchClick() {
        // const provider = new ethers.JsonRpcProvider(TESTNET_URL)
        // const wallet_admin = new ethers.Wallet(wallet1, provider)
        // const admin = accounts["scroll"][0]
        // const platform = accounts["scroll"][1]
        // const advertiser = accounts["scroll"][2]
        // const user1_address = accounts["scroll"][3]
        // const user2_address = accounts["scroll"][4]
        // const user3_address = accounts["scroll"][5]
        // console.log("platform", platform)
        // console.log("user_account", user1_address)
        // const vidToken = new ethers.Contract(VIDToken_addr, vidToken_abi, wallet_admin)
        // console.log("vidToken", vidToken)
        // const tx1 = await vidToken.playVideo(account, ethers.parseEther("300"))
        // await tx1.wait(1)
        // const tx2 = await vidToken.playVideo(platform, ethers.parseEther("700"))
        // const user_balance = ethers.formatEther(await vidToken.balanceOf(account))
        // const platform_balance = ethers.formatEther(await vidToken.balanceOf(platform))
        // setuserBalance(user_balance.toString())
        // setplatformBalance(platform_balance.toString())
    }
    return (
        <>
            <div className="w-full">
                {/* home header */}
                <div className="py-6 px-6 font-bold text-xl flex items-center justify-between w-full h-34 fixed bg-header">
                    <p className="text-5xl text-gray-50">Frame-Flow</p>
                    <div>
                        <Link href={`/tx/tx`} className="font-bold text-gray-50">
                            <button className="w-24 h-10 hover-underline text-xl">查询余额</button>
                        </Link>
                        <Link href={`/swap`} className="font-bold text-gray-50 ml-10">
                            <button className="w-24 h-10 hover-underline text-xl">swap</button>
                        </Link>
                    </div>

                    {/* upload video icon  */}
                    <Link href={`/upload`} className="font-bold">
                        <button className="text-2xl text-gray-50 bg-red-400 w-36 rounded-lg h-16  bg-gradient-to-r from-upload-btnl to-upload-btnr hover-rectangle">
                            上传视频
                        </button>
                    </Link>
                </div>

                <div className="w-full h-128 bg-gradient-to-r from-btnl to-btnr text-center  bg-grayG">
                    <img src={bgImg} className="h-full w-full z-0" />

                    <p className="text-5xl text-gray-50 -mt-80"></p>
                    {/* <Tx/> */}
                </div>

                {/* <div className="h-80 w-full bg-gray-50 z-50">
                </div> */}

                {/* videos */}
                <div className="w-7/8 h-full bg-gray-500 bg-grayG -mt-10">
                    <div className="bg-darkB m-8 rounded-lg ">
                        {/* lastest 3 videos */}
                        {/* <p className="ml-3 text-3xl text-gray-50">最新热点</p> */}
                        <div className="m-10 ml-0 h-96 rounded-lg grid grid-flow-row auto-rows-min grid-cols-3 p-5">
                            {videos.slice(0, 3).map((video) => (
                                <div
                                    key={video.id}
                                    className="ml-5 h-full hover:-translate-y-2 bg-videoBg  rounded-3xl"
                                >
                                    <Link href={`/${video.id}`} onClick={handlewatchClick}>
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-4/6  rounded-tl-3xl rounded-tr-3xl"
                                        />
                                        <div className="h-1/6 flex justify-center items-center">
                                            <p className="font-bold text-xl text-gray-50">
                                                {video.title}
                                            </p>
                                        </div>

                                        <button className="text-2xl text-gray-50 w-full rounded-3xl h-24 bg-noHover   hover:bg-gradient-to-r hover:from-btnl hover:to-btnr">
                                            播放
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* videos */}
                        <p className="ml-3 mt-60 text-3xl text-gray-50">精彩推荐</p>
                        <div className="m-10 ml-0 h-84 rounded-lg grid grid-flow-row auto-rows-min grid-cols-4 gap-y-5">
                            {videos.slice(3).map((video) => (
                                <div
                                    key={video.id}
                                    className="ml-5 h-full hover:-translate-y-2 bg-videoBg  rounded-3xl"
                                >
                                    <Link href={`/${video.id}`} onClick={handlewatchClick}>
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-4/6  rounded-tl-3xl rounded-tr-3xl"
                                        />
                                        <div className="h-1/6 flex justify-center items-center">
                                            <p className="font-bold text-xl text-gray-50">
                                                {video.title}
                                            </p>
                                        </div>
                                        <button className="text-2xl text-gray-50 w-full rounded-3xl h-16 bg-noHover hover:bg-gradient-to-r hover:from-btnl hover:to-btnr">
                                            播放
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="py-6 px-6 font-bold text-xl flex justify-center items-center w-full h-34 bg-footer ">
                        <p>Created by klhknkjmgyukiljk</p>
                    </div>
                </div>
            </div>
        </>
    )
}
