"use client";

import React from 'react';
import Image from 'next/image';

type CustomImageRendererProps = {
    data: any
};

const CustomImageRenderer:React.FC<CustomImageRendererProps> = ({data}) => {
    const src = data.file.url
    
    return (
        <div className="relative w-full min-h-[15rem]">
            <Image alt='image' className='object-contain' fill src={src} />
        </div>
    )
}
export default CustomImageRenderer;