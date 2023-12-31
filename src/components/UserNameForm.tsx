'use client';

import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { UsernameValidator } from '@/lib/validators/username';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from './ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, 'id' | 'username'>;
}

type FormData = z.infer<typeof UsernameValidator>;

const UserNameForm = ({ user, className, ...props }: UserNameFormProps) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: user?.username || '',
    },
  });

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: FormData) => {
      const payload: FormData = { name };

      const { data } = await axios.patch(`/api/username/`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'ชื่อนี้มีคนใช้แล้ว',
            description: 'โปรดเปลี่ยนเป็นชื่ออื่น',
            variant: 'destructive',
          });
        }
      }

      return toast({
        title: 'เกิดปัญหาบางอย่าง',
        description: 'ชื่อของคุณยังไม่ได้เปลี่ยน กรุณาลองใหม่อีกครั้ง',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      toast({
        description: 'เปลี่ยนชื่อของคุณสำเร็จ',
      });
      router.refresh();
    },
  });

  return (
    <form
    className={cn(className)}
    onSubmit={handleSubmit((e) => updateUsername(e))}
    {...props}
    >
        <Card>
            <CardHeader>
                <CardTitle>ชื่อของคุณ</CardTitle>
                <CardDescription>
                    คุณสามารถเปลี่ยนชื่อผู้ใช้ได้ตามต้องการ
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative grid gap-1">
                    <div className="absolute top-0 left-0 w-16 h-10 grid place-items-center">
                        <span className="text-sm text-zinc-400">
                            ชื่อผู้ใช้/
                        </span>
                    </div>
                    <Label className='sr-only' htmlFor='name'>
                        Name
                    </Label>
                    <Input
                    id="name"
                    className='w-[400px] pl-14'
                    size={32}
                    {...register('name')}
                    />
                    {errors?.name && (
                        <p className="px-1 text-xs text-red-600">
                            {errors.name.message}
                        </p>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button isLoading={isLoading}>เปลี่ยนชื่อผู้ใช้</Button>
            </CardFooter>
        </Card>
    </form>
  )
};
export default UserNameForm;
