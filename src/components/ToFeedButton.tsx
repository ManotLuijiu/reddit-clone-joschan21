"use client";

import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/Button";

const ToFeedButton = () => {
    const pathname = usePathname()

    // if path is /r/serum, turn into /
    // if path is /r/serum/post/afa;fa;, turn into /r/serum

    const subredditPath = getSubredditPath(pathname)

    return (
        <a href={subredditPath} id="to__feed_button" className={buttonVariants({variant: 'ghost'})}>
            <ChevronLeft className="h-4 w-4 mr-1 text-gray-900" />
            {subredditPath === '/' ? (
                <span className="text-gray-900">
                กลับไปที่หน้าหลัก
                </span>
                ) : (
                    <span className="text-gray-900">
                    กลับไปที่เว็บบอร์ด'
                    </span>
                    )}
        </a>
    )
}

const getSubredditPath = (pathname: string) => {
    const splitPath = pathname.split('/')

    if (splitPath.length === 3) return '/'
    else if (splitPath.length > 3) return `/${splitPath[1]}/${splitPath[2]}`
    // default path, in case pathname does not match expected format
    else return '/'
}

export default ToFeedButton
