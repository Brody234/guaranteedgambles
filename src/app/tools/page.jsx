'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Tools() {
    const router = useRouter()
    useEffect(()=>{
        router.push('/tools/arbitrage')
    }, [])
    return(
        <>
        </>
    )
}