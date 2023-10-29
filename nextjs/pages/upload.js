import Link from "next/link"
import Header from "../components/Header"
import React, { useEffect, useState, createRef } from "react"
import { useNotification, Modal } from "web3uikit"

import { NftCard, Stepper, Form, Input,Upload } from "@web3uikit/core"

import { ethers } from "ethers"
import { useMoralis } from "react-moralis"
import networkMapping from "../constants/networkMapping.json"
import videoNFT_abi from "../constants/VideoNFT.json"
import accounts from "../constants/account.json"
const VideoNFT_addr = networkMapping["534351"].VideoNFT[0]
const TESTNET_URL = "https://sepolia-rpc.scroll.io/"
const wallet1 = process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function UploadPage() {
    const { account } = useMoralis()
    const dispatch = useNotification()
    const [videoTitle, setVideoTitle] = useState("")

    // NFT info
    const [isVisible, setIsVisible] = useState(false)
    const [moralisApiResult,setmoralisApiResult] = useState({})

    const onUploadfile = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        formData.append("title", videoTitle)

        const response = await fetch("/api/uploadfile", {
            method: "POST",
            body: formData,
        })

        const data = await response.json()
        console.log(data)
    }

    const onUploadimg = async (event) => {
        event.preventDefault()

        // const formElement = document.getElementById('coverForm');
        // const formData = new FormData(formElement);

        const formData = new FormData(event.target)
        formData.append("title", videoTitle)
        console.log(formData)

        const response = await fetch("/api/uploadimg", {
            method: "POST",
            body: formData,
        })

        const data = await response.json()
        console.log(data)
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
        console.log(VideoNFT_addr)
        console.log(videoNFT_abi)
        console.log(wallet_admin)
        const videoNFT = new ethers.Contract(VideoNFT_addr, videoNFT_abi, wallet_admin)
        console.log("videoNFT", videoNFT)
        const tokenUri =
            "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json"

        const tx1 = await videoNFT.uploadVideo(tokenUri, account)
        await tx1.wait(1)

        const tokenid = Number(await videoNFT.getTokenCounter())-1;
        console.log("tokenid", tokenid)

        setmoralisApiResult({
                amount: '1',
                // block_number: '15957801',
                // block_number_minted: '12346998',
                contract_type: 'ERC721',
                // last_metadata_sync: '2022-10-04T14:50:00.573Z',
                // last_token_uri_sync: '2022-10-04T14:49:59.308Z',
                metadata: '{"image":"ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4","attributes":[{"trait_type":"Background","value":"Aquamarine"},{"trait_type":"Fur","value":"Pink"},{"trait_type":"Eyes","value":"3d"},{"trait_type":"Mouth","value":"Bored"},{"trait_type":"Clothes","value":"Service"}]}',
                minter_address: wallet_admin,
                name: 'VideoNFT',
                owner_of: account,
                symbol: 'VNFT',
                token_address: tx1.to,
                token_hash: tx1.hash,
                token_id: tokenid ,
                token_uri: 'https://ipfs.moralis.io:2053/ipfs/bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json',
        })

        dispatch({
            type: "success",
            message: `Mint NFT to ${reflect(account)}`,
            title: "Upload successful",
            position: "topR",
        })
        setIsVisible(true)
    }

    function reflect(address) {
        const str1 = address.slice(0, 6)
        const str2 = address.slice(-6)
        return str1 + "..." + str2
    }

    return (
        <div className="container mx-auto p-4">
            <Header />

            <br />

            <div
                style={{
                    height: '1px',
                    minHeight: '600px'
                }}
            >
                <Stepper
                    onComplete={function noRefCheck() { }}
                    onNext={function noRefCheck() { }}
                    onPrev={function noRefCheck() { }}
                    step={1}
                    stepData={[
                        {
                            content:
                                <div className="flex justify-center items-center w-full h-96 border border-gray-300 border-1 border-dotted rounded-lg">
                                    <div className="mb-4 ml-5">
                                        {/* <label htmlFor="title" className="font-normal text-2xl">
                                            视频标题
                                        </label>

                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={videoTitle}
                                            onChange={(e) => setVideoTitle(e.target.value)}
                                            className="border rounded p-2 ml-2 w-60 h-10"
                                        /> */}
                                        <Input
                                            label="视频标题"
                                            name="Test text Input"
                                            value={videoTitle}
                                            onBlur={function noRefCheck() { }}
                                            onChange={(e) => setVideoTitle(e.target.value)}
                                        />
                                    </div>

                                </div>,
                        },
                        {
                            content:
                                <div className="flex justify-center items-center w-full h-96 border border-gray-300 border-1 border-dotted rounded-lg">
                                    <form onSubmit={onUploadfile} encType="multipart/form-data">
                                        {/* <div className="mb-4 ml-5">
                                            <label htmlFor="title" className="font-normal text-2xl">
                                                视频标题
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={videoTitle}
                                                onChange={(e) => setVideoTitle(e.target.value)}
                                                className="border rounded p-2 ml-2 w-1/3 h-10"
                                            />
                                        </div> */}
                                        <div className="mt-10 mb-4 ml-24">
                                            <label htmlFor="video" className="font-normal text-2xl ">
                                                上传视频
                                            </label>
                                            <input
                                                type="file"
                                                id="video"
                                                name="file"
                                                className="border rounded p-2 ml-2 w-1/3 h-15"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">
                                                上传视频
                                            </button>
                                        </div>
                                    </form>
                                </div>,
                        },
                        {
                            content:
                                <div className="flex justify-center items-center w-full h-96 border border-gray-300 border-1 border-dotted rounded-lg">
                                    <form onSubmit={onUploadimg} encType="multipart/form-data">
                                        <div className="mt-5 mb-4 flex items-center">
                                            <label htmlFor="cover" className="font-normal text-2xl">
                                                上传封面
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="cover"
                                                name="image"
                                                className="border rounded p-2 ml-2 h-15"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                                            >
                                                上传封面
                                            </button>

                                            {/* <Upload
                                                id="cover"
                                                name="image"
                                                acceptedFiles="image/*"
                                                descriptionText="请选择视频封面"
                                                onChange={(e)=>onUploadimg(e.target)}
                                                type="file"
                                                theme="withIcon"
                                            /> */}
                                        </div>
                                    </form>
                                </div>,
                        },
                    ]}
                />
            </div>

            {/* NFTCard Modal */}
            <Modal width="50%" isVisible={isVisible}>
                <NftCard
                    chain="Scroll Sepolia"
                    moralisApiResult={moralisApiResult}
                    customize={{
                        // backgroundColor: '#F0F8FF',
                        border: '2px solid black',
                        // borderRadius: '10px',
                        // fontSize: '16px',
                        // fontWeight: '700',
                        // margin: '50px',
                        // padding: '20px',
                        width: '100%',
                        height: '100%',
                    }}
                />
            </Modal>

            <Link href="/">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">返回首页</button>
            </Link>
        </div>
    )
}

export default UploadPage
