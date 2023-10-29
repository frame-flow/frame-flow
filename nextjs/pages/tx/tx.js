import Header from "../../components/Header2"
import { Button, Widget } from "web3uikit"
import { ethers } from "ethers"
import networkMapping from "../../constants/networkMapping.json"
import vidToken_abi from "../../constants/VIDToken.json"
import accounts from "../../constants/account.json"
import { useEffect } from "react"
import { useState, useContext } from "react"
import { SharedStateContext } from "../../components/SharedStateContext"
import { useMoralis } from "react-moralis"

const VIDToken_addr = networkMapping["534351"].VIDToken[0]
const TESTNET_URL = "https://sepolia-rpc.scroll.io/"
const platform_address = accounts["scroll"][1]
const advertiser_address = accounts["scroll"][2]

export default function Tx() {
    const wallet1 = process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY
    console.log("wallet1", wallet1)

    const [user1balance, setuser1Balance] = useState("0")
    const [user2balance, setuser2Balance] = useState("0")
    const [user3balance, setuser3Balance] = useState("0")

    const {
        userbalance,
        setuserBalance,
        platformbalance,
        setplatformBalance,
        advertiserbalance,
        setadvertiserBalance,
    } = useContext(SharedStateContext)
    const { account } = useMoralis()

    useEffect(() => {
        if (account) {
            const interval = setInterval(async () => {
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

                // const tx = await vidToken.mint(user_address, ethers.parseEther("100"))
                // console.log("tx", tx)
                const user_balance = ethers.formatEther(await vidToken.balanceOf(account))
                const platform_balance = ethers.formatEther(await vidToken.balanceOf(platform))
                const advertiser_balance = ethers.formatEther(await vidToken.balanceOf(advertiser))
                const user1_balance = ethers.formatEther(await vidToken.balanceOf(user1_address))
                const user2_balance = ethers.formatEther(await vidToken.balanceOf(user2_address))
                const user3_balance = ethers.formatEther(await vidToken.balanceOf(user3_address))

                console.log(advertiser_balance.toString())
                setuserBalance(user_balance.toString())
                setadvertiserBalance(advertiser_balance.toString())
                setplatformBalance(platform_balance.toString())
                setuser1Balance(user1_balance.toString())
                setuser2Balance(user2_balance.toString())
                setuser3Balance(user3_balance.toString())
            }, 5000) // 每5秒刷新一次余额

            return () => clearInterval(interval) // 在组件卸载时清除定时器
        }
    }, [account])

    async function handlewatchTVClick() {
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

        const tx1 = await vidToken.playVideo(account, ethers.parseEther("300"))
        await tx1.wait(1)
        const tx2 = await vidToken.playVideo(platform, ethers.parseEther("700"))

        const user_balance = ethers.formatEther(await vidToken.balanceOf(account))
        const platform_balance = ethers.formatEther(await vidToken.balanceOf(platform))

        setuserBalance(user_balance.toString())

        setplatformBalance(platform_balance.toString())
    }
    async function handlewatchADClick() {
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

        // const transaction = vidToken.functions[burn](advertiser, ethers.parseEther("100"))
        // const burn_token = vidToken.getFunction("burn")
        // const transaction = burn_token(advertiser, ethers.parseEther("100"))
        // const txx = new ethers.Transaction()
        // txx.clone(transaction)
        // await accounts.sendTransaction(txx)
        // const tx = await accounts.sendTransaction(transaction)

        const tx3 = await vidToken.clickAD(advertiser, ethers.parseEther("1000"))

        const advertiser_balance = ethers.formatEther(await vidToken.balanceOf(advertiser))

        setadvertiserBalance(advertiser_balance.toString())
    }
    // function reflect(address) {
    //     const str1 = address.slice(0, 6)
    //     const str2 = address.slice(-6)
    //     return str1 + "..." + str2
    // }

    async function handlrefreshClick() {
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

        const user_balance = ethers.formatEther(await vidToken.balanceOf(account))
        const platform_balance = ethers.formatEther(await vidToken.balanceOf(platform))
        const advertiser_balance = ethers.formatEther(await vidToken.balanceOf(advertiser))
        const user1_balance = ethers.formatEther(await vidToken.balanceOf(user1_address))
        const user2_balance = ethers.formatEther(await vidToken.balanceOf(user2_address))
        const user3_balance = ethers.formatEther(await vidToken.balanceOf(user3_address))

        console.log(advertiser_balance.toString())
        setuserBalance(user_balance.toString())
        setadvertiserBalance(advertiser_balance.toString())
        setplatformBalance(platform_balance.toString())
        setuser1Balance(user1_balance.toString())
        setuser2Balance(user2_balance.toString())
        setuser3Balance(user3_balance.toString())
    }

    return (
        <div>
            <Header />
            {/* buttons */}
            <div className="flex m-48 mt-5 mb-5">
              
                <button className="text-2xl text-gray-50 bg-red-400 w-40 rounded-lg h-12 
                bg-gradient-to-r from-bluebtnl to-bluebtnr hover-rectangle" onClick={handlewatchTVClick}>
                    Watch Vedio
                </button>

                <button className="text-2xl text-gray-50 bg-red-400 w-32 rounded-lg h-12 
                bg-gradient-to-r from-btnl to-btnr hover-purple ml-5" onClick={handlewatchADClick}>
                    Refresh
                </button>

                <button className="text-2xl text-gray-50 bg-red-400 w-32 rounded-lg h-12 
                bg-gradient-to-r from-bluebtnl to-bluebtnr hover-rectangle ml-5" onClick={handlewatchADClick}>
                    Watch AD
                </button>
            </div>

            <div className="flex justify-center items-center">
                <div className="rounded-lg w-2/3">
                    <div style={{ display: 'grid', gap: '20px', padding: '40px 20px'}}>
                        <section style={{ display: 'flex', gap: '20px' }}>
                            <Widget className="h-30"  info={userbalance} title="Current Account Balance" />
                            
                        </section>
                        <section style={{ display: 'flex', gap: '20px' }}>
                            <Widget className="h-30"  info={user1balance} title="Creator1 Balance">
                                {/* <div>CHART COMING SOON</div> */}
                            </Widget>
                            <Widget className="h-30"  info={user2balance} title="Creator2 Balance">
                            </Widget>
                            <Widget className="h-30"  info={user3balance} title="Creator3 Balance">
                            </Widget>
                        </section>
                        <section style={{ display: 'flex', gap: '20px' }}>
                            <Widget className="h-30"  info={platformbalance} title="Video Platform Balance" />
                            <Widget className="h-30"  info={advertiserbalance} title="Advertiser Balance" />

                        </section>
                    </div>

                </div>
            </div>

        </div>
    )
}
