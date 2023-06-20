'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { CreateSubredditPayload } from '@/lib/validators/subreddit';
import { toast } from '@/hooks/use-toast';
import { useCustomToasts } from '@/hooks/use-custom-toasts';

type pageProps = {};

const RCreatePage: React.FC<pageProps> = () => {
    const [input, setInput] = useState<string>('');
    const router = useRouter();
    const {loginToast} = useCustomToasts()

    const {mutate: createCommunity, isLoading} = useMutation({
        mutationFn: async () => {
            const payload: CreateSubredditPayload = {
                name: input,
            }

            const {data} = await axios.post('/api/subreddit', payload)
            return data as string
        },
        onError: (err) => {
            if(err instanceof AxiosError) {
                if(err.response?.status === 409) {
                    return toast({
                        title: 'ชื่อกะทู้ซ้ำ',
                        description: 'โปรดสร้างกะทู้ด้วยชื่อใหม่',
                        variant: 'destructive'
                    })
                }

                if (err.response?.status === 422) {
                    return toast({
                        title: 'ชื่อกะทู้ไม่สั้นหรือยาวเกินไป',
                        description: 'โปรดเลือกชื่อกะทู้ระหว่าง 3 และ 21 ตัวอักษร',
                        variant: 'destructive'
                    })
                }

                if(err.response?.status === 401) {
                    return loginToast()
                }
            }

            toast({
                title: 'เกิดปัญหาบางอย่าง',
                description: 'ไม่สามารถสร้างกะทู้นี้ได้ โปรดติดต่อ manotlj@outlook.com',
                variant: 'destructive'
            })
        },
        onSuccess: (data) => {
            router.push(`/r/${data}`)
        }
    })

    return (
        <div className="relative container flex items-center h-full max-w-3xl mx-auto">
            <div className='absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob'></div>
            <div className='absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000'></div>
            <div className='absolute top-40 left-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000'></div>
            <div className="relative bg-white text-gray-900 w-full h-fit p-4 rounded-lg space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">สร้างกะทู้</h1>
                </div>

                <hr className="bg-zinc-500 h-px" />

                <div>
                    <p className="text-lg font-medium">ชื่อกะทู้</p>
                    <p>
                        กรุณาใส่ชื่อกะทู้ {' '}
                        <span className="text-sm italic text-orange-700">

                        (***เมื่อกดปุ่มบันทึก ไม่สามารถแก้ไขชื่อได้)
                        </span>
                    </p>

                    <div className="relative mt-2">
                        <p className="absolute text-sm left-0 w-16 inset-y-0 grid place-items-center">
                            เอสธีท/
                        </p>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="pl-14"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button variant='subtle' onClick={() => router.back()}>
                        ยกเลิก
                    </Button>
                    <Button isLoading={isLoading} disabled={input.length === 0} onClick={() => createCommunity()}>สร้างกะทู้</Button>
                </div>
            </div>
        </div>
    );
};
export default RCreatePage;
