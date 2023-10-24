/*
 * @Author: diana
 * @Date: 2023-10-22 15:17:00
 * @LastEditTime: 2023-10-24 21:15:36
 */
import { ConnectButton } from "web3uikit"
export default function Header() {
    return (
        <div className="p-5 border-b-2 flex flex-row">
            <div className="py-4 px-4 font-bold text-xl"> Upload Video</div>
            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
