/*
 * @Author: diana
 * @Date: 2023-10-28 10:21:23
 * @LastEditTime: 2023-10-29 21:16:46
 */
// pages/ad/adpage/[id].js

import { useRouter } from "next/router"
import Link from "next/link"

function AdPage() {
    const router = useRouter()
    const { id } = router.query

    if (!id) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="py-6 px-6 font-bold text-xl flex items-center justify-between bg-grayG">
                <h1 className="text-gray-50">Playing Ad Video {id}</h1>
                <Link href={`/`} className="text-gray-50 font-bold">
                    <p>返回首页</p>
                </Link>
            </div>

            <div className="flex justify-center w-full h-full bg-grayG">
                <video controls autoPlay>
                    <source src={`/ad/advideo/${id}.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="w-full h-16 flex justify-end bg-videobg">
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
    )
}

export default AdPage
