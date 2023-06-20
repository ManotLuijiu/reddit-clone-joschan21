// import GlowingBG from "@/components/GlowingBG/GlowingBG";
import CustomFeed from '@/components/homepage/CustomFeed';
import GeneralFeed from '@/components/homepage/GeneralFeed';
import { buttonVariants } from '@/components/ui/Button';
import { Separator } from '@/components/ui/separator';
import { getAuthSession } from '@/lib/auth';
import { Home as HomeIcon } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function Home() {
  const session = await getAuthSession();

  return (
    <>
      <h1 className="font-semibold text-gray-950 text-4xl md:text-5xl">
        กะทู้ของคุณ
      </h1>
      {/* <GlowingBG /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* feed */}
        {/* @ts-expect-error server component */}
        {session ? <CustomFeed /> : <GeneralFeed />}
        
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
                หน้ากะทู้ เอสธีท บอร์ด ส่วนตัวของคุณ
                คุณสามารถเข้ามาดูความเห็นในประเด็นที่คุณชื่นชอบได้ตลอดเวลา
              </p>
            </div>

            <Link
              className={buttonVariants({
                className: 'w-full mt-4 mb-6',
              })}
              href="/r/create"
            >
              สร้างกะทู้ บนเอสธีทบอร์ด
            </Link>
            {/* <Separator className='my-4' /> */}
            <span className="mt-4 py-4 text-xs text-gray-900">สงวนลิขสิทธิ์ &copy; บริษัท เอสธีท อินเตอร์เนชั่นแนล จำกัด</span>
          </dl>
        </div>
      </div>
    </>
  );
}
