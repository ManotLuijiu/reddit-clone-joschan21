import React from 'react';
import Link from 'next/link'
import UserAuthForm from '../Auth/UserAuthForm';

import { Icons } from '../Navbar/Icons';

type SignInProps = {};

const SignIn: React.FC<SignInProps> = () => {
    return (
        <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
                <Icons.logo className="mx-auto h-10 w-10" />
                <h1 className="text-2xl tracking-tight">
                    เอสธีท ยินดีต้อนรับค่ะ
                </h1>
                {/* <p className="text-sm text-zinc-700 max-w-xs mx-auto">
                    ขั้นตอนนี้เป็นขั้นตอน การลงทะเบียนเป็นลูกค้าของ<br />บริษัท เอสธีท อินเตอร์เนชั่นแนล จำกัด
                    By continuing, you are setting up a Esthete account and
                    agree to our User Agreement
                </p> */}

                {/* sign in form */}
                <UserAuthForm />
                <p className="px-8 text-center text-sm text-zinc-700">
                    เป็นลูกค้าใหม่?{' '}
                    <Link href="/sign-up" className="hover:text-zinc-800 text-sm underline underline-offset-4">
                    ลงทะเบียน
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default SignIn;
