import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import UserAccountNav from '../UserAccountNav';
import SearchBar from '../SearchBar';
import { buttonVariants } from '../ui/Button';
import { Icons } from './Icons';

const Navbar = async () => {
    const session = await getServerSession(authOptions);
    // eslint-disable-next-line no-console
    console.log('session',session)
    return (
        <div className="fixed top-0 inset-x-0 h-fit bg-gradient-to-r from-green1 to-green2 border-b border-gold1 z-[10] py-2">
            <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
                {/* Logo */}
                <Link href="/" className="flex gap-2 items-center">
                    <Icons.logo />
                    <p className="hidden text-gray-50 text-[2rem] font-medium md:block">
                        กระดานสนทนา
                    </p>
                </Link>

                {/* Search bar */}
                <SearchBar />

                {/* actions */}
                {session?.user ? (
                    <UserAccountNav user={session.user} />
                ) : (
                    <Link href="/sign-in" className={buttonVariants()}>
                        ลงชื่อเข้าใช้
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
