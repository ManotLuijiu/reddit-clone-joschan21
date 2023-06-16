'use client';

import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

import { Icons } from '../Navbar/Icons';
import { Button } from '../ui/Button';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: React.FC<UserAuthFormProps> = ({ className, ...props }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const loginWithGoogle = async () => {
        setIsLoading(true);

        try {
            await signIn('google');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'There was an error logging in whit Google',
                variant: 'destructive',
            });
            // eslint-disable-next-line no-console
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn('flex justify-center', className)} {...props}>
            <Button
                type="button"
                onClick={loginWithGoogle}
                isLoading={isLoading}
                disabled={isLoading}
                size="sm"
                className="w-full"
            >
                {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
                Google
            </Button>
        </div>
    );
};
export default UserAuthForm;
