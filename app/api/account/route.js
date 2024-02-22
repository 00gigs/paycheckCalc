import account from '@/app/(models)/user'

import {NextResponse} from 'next/server'

export async function POST(req){
    console.log('POST RAN')
    try {
        const body = await req.json()
        const accountData = body.formData
        await account.create(accountData)
        return NextResponse.json({messeage:'user created',},{status:201})
    } catch (error) {
        return NextResponse.json({messeage:'error',error},{status:500})
    }
}