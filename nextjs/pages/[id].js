import { useRouter } from "next/router"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

import { ethers } from "ethers"
import networkMapping from "../constants/networkMapping.json"
import vidToken_abi from "../constants/VIDToken.json"
import accounts from "../constants/account.json"
import React, { useContext } from "react"
import { SharedStateContext } from "../components/SharedStateContext"

import { Avatar } from "@web3uikit/core"

const VIDToken_addr = networkMapping["534351"].VIDToken[0]
const TESTNET_URL = "https://sepolia-rpc.scroll.io/"
const wallet1 = process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY


const userImg = "/test.jpg"

export default function VideoPage() {
    const {
        userbalance,
        setuserBalance,
        platformbalance,
        setplatformBalance,
        advertiserbalance,
        setadvertiserBalance,
    } = useContext(SharedStateContext)
    const router = useRouter()
    const [videoId, setVideoId] = useState(null)

    const adImages = ["/ad/adimage/ad1.jpg", "/ad/adimage/ad2.jpg", "/ad/adimage/ad3.jpg"]
    const adVideos = ["/ad/advideo/ad1.mp4", "/ad/advideo/ad2.mp4", "/ad/advideo/ad3.mp4"]

    const [currentAdIndex, setCurrentAdIndex] = useState(0)
    const adInterval = useRef(null)

    useEffect(() => {
        if (router && router.query) {
            setVideoId(router.query.id)
        }
    }, [router])

    useEffect(() => {
        adInterval.current = setInterval(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adImages.length)
        }, 1000)

        return () => {
            clearInterval(adInterval.current)
        }
    }, [])

    useEffect(() => {
        play()
    }, [])

    const handleAdClick = async (index) => {
        const videoIdFromAd = adVideos[index].split("/").pop().split(".")[0]
        setVideoId(videoIdFromAd)
        // 这里可以是广告页面的路由，例如/ad/ad1，你需要根据实际情况调整
        const adPagePath = `/ad/${adVideos[index].split("/").pop().split(".")[0]}`
        router.push(adPagePath)
        const provider = new ethers.JsonRpcProvider(TESTNET_URL)

        const wallet_admin = new ethers.Wallet(wallet1, provider)
        const admin = accounts["scroll"][0]
        const platform = accounts["scroll"][1]
        const advertiser = accounts["scroll"][2]
        const user1_address = accounts["scroll"][3]
        const user2_address = accounts["scroll"][4]
        const user3_address = accounts["scroll"][5]
        console.log("platform", platform)
        console.log("user_account", user1_address)

        const vidToken = new ethers.Contract(VIDToken_addr, vidToken_abi, wallet_admin)
        console.log("vidToken", vidToken)

        const tx3 = await vidToken.clickAD(advertiser, ethers.parseEther("1000"))

        const advertiser_balance = ethers.formatEther(await vidToken.balanceOf(advertiser))

        setadvertiserBalance(advertiser_balance.toString())
    }

    async function play() {
        const tokenID = router.query.id
        console.log("videoId", tokenID)
        const provider = new ethers.JsonRpcProvider(TESTNET_URL)
        const wallet_admin = new ethers.Wallet(wallet1, provider)
        const admin = accounts["scroll"][0]
        const platform = accounts["scroll"][1]
        const advertiser = accounts["scroll"][2]
        const user1_address = accounts["scroll"][3]
        const user2_address = accounts["scroll"][4]
        const user3_address = accounts["scroll"][5]
        console.log("platform", platform)
        console.log("user_account", user1_address)
        const vidToken = new ethers.Contract(VIDToken_addr, vidToken_abi, wallet_admin)
        console.log("vidToken", vidToken)
        console.log("videoId", tokenID)
        if (tokenID == "晚霞") {
            const tx1 = await vidToken.playVideo(user1_address, ethers.parseEther("300"))
            await tx1.wait(1)
        }
        if (tokenID == "草原") {
            const tx1 = await vidToken.playVideo(user2_address, ethers.parseEther("300"))
            await tx1.wait(1)
        }
        if (tokenID == "雪山") {
            const tx1 = await vidToken.playVideo(user3_address, ethers.parseEther("300"))
            await tx1.wait(1)
        }
        if (tokenID == "日落") {
            const tx1 = await vidToken.playVideo(user1_address, ethers.parseEther("300"))
            await tx1.wait(1)
        }

        const tx2 = await vidToken.playVideo(platform, ethers.parseEther("700"))
    }

    if (!videoId) {
        return <div>Loading...</div>
    }

    return (
        <div className="w-full h-full">
            {/* header */}
            <div className="py-6 px-6 font-bold text-xl flex items-center justify-between bg-grayG">
                <h1 className="text-gray-50">Playing Video {videoId}</h1>
                <Link href={`/`} className="text-gray-50 font-bold">
                    <p>返回首页</p>
                </Link>
            </div>


            <div className="flex justify-center w-full h-min-screen bg-grayG">

                {/* video */}
                <div className="w-3/5 h-1/4 mr-5 bg-videobg border-2 border-grayG rounded-lg">
                    <video controls >
                        <source src={`/videos/${videoId}.mp4`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <div className="w-full h-16 flex justify-end">
                        <button className="text-2xl text-grayG mt-3 mr-5 w-32 h-10 rounded-xl bg-videobtn flex hover:border hover:border-gray-500">
                            <div className="ml-3 w-6 h-10">
                                <svg t="1698481648662" class="icon" viewBox="0 0 1092 1024" version="1.1" width="33" height="40"><path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" p-id="2727" fill="#707070"></path></svg>
                            </div>
                            <span className="ml-5 mt-1 text-gray-50">点赞</span>
                        </button>
                        <button className="text-2xl text-grayG mt-3 mr-5 w-32 h-10 rounded-xl bg-videobtn flex hover:border hover:border-gray-500">
                            <div className="ml-3 w-6 h-10">
                                <svg t="1698481648662" class="icon" viewBox="0 0 1092 1024" version="1.1" width="33" height="40"><path d="M46.8992 1006.045867L23.210667 926.5152A557.6704 557.6704 0 0 1 0 766.839467c0-298.3936 235.178667-541.149867 524.288-541.149867 9.557333 0 26.760533 0.2048 45.602133 0.750933V52.224c0-36.0448 21.640533-52.224 43.008-52.224 12.014933 0 24.1664 4.846933 36.181334 14.404267l417.792 334.2336c16.110933 12.970667 25.3952 31.3344 25.3952 50.517333 0 19.114667-9.284267 37.4784-25.463467 50.3808l-417.792 334.2336c-11.946667 9.557333-24.098133 14.472533-36.181333 14.472533-21.367467 0-42.939733-16.1792-42.939734-52.292266V581.2224a1798.826667 1798.826667 0 0 0-45.533866-0.8192c-209.578667 0-391.850667 139.0592-453.700267 346.112l-23.7568 79.530667zM524.356267 275.114667c-261.802667 0-474.794667 220.5696-474.794667 491.656533 0 22.1184 1.365333 44.100267 4.232533 65.7408C140.765867 649.216 320.853333 530.8416 524.288 530.8416c13.789867 0 43.690667 0.546133 71.338667 1.706667l23.7568 0.955733v210.466133l416.426666-333.141333c4.369067-3.4816 6.826667-7.645867 6.826667-11.741867 0-4.096-2.4576-8.192-6.826667-11.741866l-416.426666-333.141334V277.845333l-25.736534-1.024c-26.760533-1.024-56.046933-1.6384-69.358933-1.6384z" fill="#707070" p-id="1454"></path></svg>
                            </div>
                            <span className="ml-5 mt-1  text-gray-50">分享</span>
                        </button>
                        <button className="text-2xl text-grayG mt-3 mr-0 w-32 h-10 rounded-xl bg-videobtn flex hover:border hover:border-gray-500">
                            <div className="ml-3 w-6 h-10">
                                <svg t="1698481648662" class="icon" viewBox="0 0 1092 1024" version="1.1" width="33" height="40"><path d="M832 64H217.6v742.4H960V192l-128-128zM304 156.8H768V275.2H304V156.8z m556.8 556.8h-556.8V390.4h556.8v323.2z" p-id="5939" fill="#707070"></path><path d="M704 448h128v128h-128zM830.976 0zM830.976 0zM768 857.6V960H64V256h102.4v601.6z" p-id="5940" fill="#707070"></path></svg>
                            </div>
                            <span className="ml-5 mt-1  text-gray-50">保存</span>
                        </button>


                    </div>
                </div>

                <div className="w-1/4 h-full px-4 py-4 bg-videobg h-1/3 border-2 border-grayG rounded-lg mt-0">
                    {/* ad */}
                    <div className="w-full h-48" onClick={play}>
                        <img
                            src={adImages[currentAdIndex]}
                            alt="Advertisement"
                            className="transition-opacity w-full h-full"
                            onClick={() => handleAdClick(currentAdIndex)}
                        />
                    </div>

                    <div className="w-full h-120 text-gray-50">
                        <div className="mt-20">
                            <div className="flex">
                                <Avatar
                                    image="https://academy.moralis.io/wp-content/uploads/2021/12/Illustration4_home.svg"
                                    isRounded
                                    theme="image"
                                    size={60}
                                />
                                <span className="ml-5 mt-5">0x1234567&nbsp;:&nbsp;&nbsp;好漂亮的风景</span>
                            </div>

                            <div className="flex mt-8">
                                <Avatar
                                    isRounded
                                    theme="image"
                                    size={60}
                                />
                                <span className="ml-5 mt-5">0x11111111&nbsp;:&nbsp;&nbsp;看了很想去这里体验一下</span>
                            </div>

                            <div className="flex mt-8">
                                <Avatar
                                    text="DM"
                                    isRounded
                                    size={60}
                                />
                                <span className="ml-5 mt-5">0x22222222&nbsp;:&nbsp;&nbsp;很治愈</span>
                            </div>

                            <div className="flex mt-8">
                                <Avatar
                                     avatarBackground="#003470"
                                     characterAmount={3}
                                     isRounded
                                     text="Ethereum"
                                     theme="letters"
                                    size={60}
                                />
                                <span className="ml-5 mt-5">0x3333333&nbsp;:&nbsp;&nbsp; 漫山雪花飘，天地遍苍茫。</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
