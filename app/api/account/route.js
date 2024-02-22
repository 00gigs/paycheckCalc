import account from "../../(models)/user"

import {NextResponse} from 'next/server'



export async function POST(req){
    console.log('POST RAN')
//how to use  different model methods for different forms 
    try {
        const body = await req.json()
        const accountData = body
        await account.create(accountData)
        return NextResponse.json({messeage:'user created',},{status:201})
    } catch (error) {
        return NextResponse.json({messeage:'error',error},{status:500})
    }
}