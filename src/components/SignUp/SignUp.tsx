import Link from 'next/link';
import React from 'react';

import UserAuthForm from '../Auth/UserAuthForm';
import { Icons } from '../Navbar/Icons';

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
    return (
        <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
                <Icons.logo className="mx-auto h-10 w-10" />
                <h1 className="text-2xl font-semibold tracking-tight">
                    ลงทะเบียน
                </h1>
                {/* <p className="text-sm max-w-xs mx-auto">
                    By continuing, you are setting up a EstheteBoard account and
                    agree to our User Agreement and Privacy Policy.
                </p> */}
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
                เคยลงทะเบียนแล้ว?{' '}
                <Link
                    href="/sign-in"
                    className="hover:text-brand text-sm underline underline-offset-4"
                >
                    ลงชื่อเข้าใช้
                </Link>
            </p>
        </div>
    );
};
export default SignUp;
