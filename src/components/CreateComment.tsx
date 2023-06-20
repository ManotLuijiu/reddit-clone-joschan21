'use client';

import { Button } from '@/components/ui/Button';
import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { toast } from '@/hooks/use-toast';
import { CommentRequest } from '@/lib/validators/comment';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
}

const CreateComment: React.FC<CreateCommentProps> = ({ postId, replyToId }) => {
  const [input, setInput] = useState<string>('');
  const router = useRouter();
  const { loginToast } = useCustomToasts();

  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { postId, text, replyToId };

      const { data } = await axios.patch(
        `/api/subreddit/post/comment`,
        payload,
      );
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: 'เกิดปัญหาบางอย่าง',
        description: "ไม่สามารถบันทึกความเห็นของคุณได้ โปรดลองอีกครั้ง",
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
      setInput('');
    },
  });

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="comment">ความเห็นของคุณ</Label>
      <div className="mt-2">
        <Textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="คุณคิดว่าอย่างไรกับเรื่องนี้"
        />

        <div className="mt-2 flex justify-end">
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => comment({ postId, text: input, replyToId })}
          >
            โพสต์
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateComment;
