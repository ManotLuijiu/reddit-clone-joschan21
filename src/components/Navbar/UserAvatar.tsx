import { User } from 'next-auth';
import Image from 'next/image';
import React from 'react';
import { AvatarProps } from '@radix-ui/react-avatar';

import { Avatar, AvatarFallback } from '../ui/Avatar';
import { Icons } from './Icons';

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, 'name' | 'image'>;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => {
    const {name} = user
    return (
        <Avatar {...props}>
            {user.image ? (
                <div className="relative aspect-square h-full w-full">
                    <Image
                        fill
                        src={user.image}
                        // alt="profile picture"
                        alt={`profile picture ${name}`}
                        referrerPolicy="no-referrer"
                    />
                </div>
            ) : (
                <AvatarFallback>
                    <span className='sr-only'>{user?.name}</span>
                    <Icons.user className='h-4 w-4' />
                </AvatarFallback>
            )}
        </Avatar>
    );
};
export default UserAvatar;
