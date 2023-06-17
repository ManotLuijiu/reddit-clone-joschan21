// import GlowingBG from "@/components/GlowingBG/GlowingBG";
import { buttonVariants } from "@/components/ui/Button";
import { HomeIcon } from "lucide-react";
import Link  from 'next/link';

export default function Home() {
    return (
        <>
            <h1 className="font-semibold text-gray-950 text-4xl md:text-5xl">กะทู้ของคุณ</h1>
              {/* <GlowingBG /> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
              {/* feed */}

              {/* subreddit info */}
              <div className="overflow-hidden h-fit rounded-lg border border-gold1 order-first md:order-last">
                <div className="bg-emerald-100 px-6 py-4">
                  <p className="text-gray-950 font-semibold py-3 flex items-center gap-1.5">
                    <HomeIcon className="w-4 h-4" />
                    หน้าหลักเอสธีทบอร์ด
                  </p>
                </div>

                <dl className="-my-3 divide-y divide-gray-900 px-6 py-4 text-sm leading-6">
                  <div className="flex justify-between gap-x-4 py-3">
                    <p className="text-gray-900">
                      หน้ากะทู้ เอสธีท บอร์ด ส่วนตัวของคุณ คุณสามารถเข้ามาดูความเห็นในประเด็นที่คุณชื่นชอบได้ตลอดเวลา
                    </p>
                  </div>

                  <Link className={buttonVariants({
                    className: 'w-full mt-4 mb-6'
                  })}
                  href='/r/create'
                  >
                  สร้างกะทู้ บนเอสธีทบอร์ด
                  </Link>
                </dl>
              </div>
            </div>
        </>
    );
}
