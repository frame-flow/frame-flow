/*
 * @Author: diana
 * @Date: 2023-10-22 15:17:00
 * @LastEditTime: 2023-10-22 22:27:42
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
import { useContext } from "react"
import { SharedStateContext } from "../components/SharedStateContext"


const VIDToken_addr = networkMapping["534351"].VIDToken[0]
const TESTNET_URL = "https://sepolia-rpc.scroll.io/"

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
            <div className="flex justify-start">

            
            <div className="w-1/6 h-min-screen border-r border-gray-200">
                a
            </div>
            <div className="w-5/6 h-full ml-3">
                {/* home header */}
                <div className="py-6 px-6 font-bold text-xl flex items-center justify-between">
                    {/* <div>Video List</div> */}
                    <Link href={`/tx/tx`} className="font-bold">
                        <p>查询余额</p>
                    </Link>

                    {/* upload video icon  */}
                    <Link href={`/upload`} className="font-bold">
                        <div className="w-10 h-10">
                            <svg t="1697982203281" class="icon" width="50" height="50" viewBox="0 0 1024 1024">
                                <path d="M512 737.536m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" fill="#9aacd9" p-id="13811"></path><path d="M972.8 721.9712a36.4544 36.4544 0 0 0-36.4544 36.4544c0 54.272-36.0448 100.096-78.7456 100.096H166.4c-42.7008 0-78.7456-45.8752-78.7456-100.096a36.4544 36.4544 0 0 0-72.9088 0c0 95.3856 68.0448 173.0048 151.6544 173.0048h691.2c83.6096 0 151.6544-77.6192 151.6544-173.0048a36.4544 36.4544 0 0 0-36.4544-36.4544zM367.1552 312.2688a38.0928 38.0928 0 0 0 27.136-11.264L473.6 221.696v377.6a38.4 38.4 0 0 0 76.8 0V221.7472l79.2576 79.3088a38.4 38.4 0 1 0 54.3232-54.3232L539.1872 101.888a38.4 38.4 0 0 0-54.3232 0L340.0192 246.7328a38.4 38.4 0 0 0 27.136 65.536z" fill="#9aacd9" p-id="13812"></path>
                            </svg>
                        </div>
                        {/* <p>上传视频</p> */}
                    </Link>
                </div>

                {/* lastest 3 videos */}
                <p className="ml-3 text-3xl">最新热点</p>
                <div className="h-96 grid grid-flow-row auto-rows-min grid-cols-3">
                    {videos.slice(0, 3).map((video) => (
                        <div key={video.id} className="border border-1 border-black-200 rounded-lg m-2 h-2/3 hover:-translate-y-2">
                            <Link href={`/${video.id}`} onClick={handlewatchClick}>
                                <img src={video.thumbnail} alt={video.title} className="w-full h-5/6 border-black-200" />
                                <div className="h-1/6 flex justify-center items-center">
                                    <p className="font-bold text-xl text-gray-400">{video.title}</p>
                                </div>

                            </Link>
                        </div>
                    ))}
                </div>

                {/* videos */}
                <p className="-mt-10 ml-3 text-3xl">最新热点</p>
                <div className="grid grid-flow-row auto-rows-min grid-cols-4">
                    {videos.slice(3,).map((video) => (
                        <div key={video.id} className="border border-1 border-black-200 m-2 h-full rounded-lg hover:-translate-y-2">
                            <Link href={`/${video.id}`} onClick={handlewatchClick}>
                                <img src={video.thumbnail} alt={video.title} className="w-full h-5/6 border-black-200" />
                                <div className="h-1/6 flex justify-center items-center">
                                    <p className="font-bold text-xl text-gray-400">{video.title}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
            </div>
        </>
    )
}
