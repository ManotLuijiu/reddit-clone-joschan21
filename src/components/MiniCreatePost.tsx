'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Session } from 'next-auth';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import {Link2, ImageIcon} from 'lucide-react'

import UserAvatar from './Navbar/UserAvatar';

interface MiniCreatePostProps {
    session: Session | null;
}

const MiniCreatePost: React.FC<MiniCreatePostProps> = ({ session }) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <li className="overflow-hidden rounded-md bg-white shadow list-none">
            <div className="h-full px-2 py-2 lg:px-6 lg:py-4 flex justify-between lg:gap-6">
                <div className="relative">
                    <UserAvatar
                        user={{
                            name: session?.user.name || null,
                            image: session?.user.image || null,
                        }}
                    />
                    <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
                </div>

                <Input
                    readOnly
                    onClick={() => router.push(pathname + '/submit')}
                    placeholder="แสดงความเห็น"
                />

                <Button
                    onClick={() => router.push(pathname + '/submit')}
                    variant="ghost"
                >
                    <ImageIcon className='text-zinc-600' />
                </Button>

                <Button
                onClick={() => router.push(pathname + '/submit')}
                variant="ghost"
                >
                    <Link2 className="text-zinc-600" />
                </Button>
            </div>
        </li>
    );
};
export default MiniCreatePost;
