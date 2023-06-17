"use client";

import { useOnClickOutside } from '../../hooks/use-on-click-outside';
import React, {useState, useRef} from 'react';
import {formatTimeToNow} from '@/lib/utils';
import {CommentRequest} from '@/lib/validators/comment';
import {Comment, CommentVote, User} from '@prisma/client';
import {useSession} from 'next-auth/react'

import { useMutation } from '@tanstack/react-query';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

type ExtendedComment = Comment & {
    votes: CommentVote[]
    author: User
};

interface PostCommentProps  {
    comment: ExtendedComment
    votesAmt: number
    currentVote: CommentVote | undefined
    postId: string
};

const PostComment:React.FC<PostCommentProps> = ({
    comment,
    votesAmt,
    currentVote,
    postId,
}) => {
    const {data: session} = useSession()
    const [isReplying, setIsReplying] = useState<boolean>(false)
    const commentRef = useRef<HTMLDivElement>(null)
    const [input, setInput] = useState<string>(`@${comment.author.username} `)
    const router = useRouter();

    useOnClickOutside(commentRef, () => {
        setIsReplying(false)
    })

    const {mutate: postComment, isLoading} = useMutation({
        mutationFn: async ({postId, text, replyToId}: CommentRequest) => {
            const payload: CommentRequest = {postId, text, replyToId}

            const {data} = await axios.patch(`/api/subreddit/post/comment/`, payload)
            return data
        },
        onError: () => {
            return toast({
                title: 'Something went wrong',
                description: 'Comment wasn&apos;t created successfully. Please try again.',
                variant: 'destructive'
            })
        },
        onSuccess: () => {
            router.refresh()
            setIsReplying(false)
        }
    })
    
    return <div>Have a good coding</div>
}
export default PostComment;


