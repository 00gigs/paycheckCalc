// import account from "../../(models)/user"
import account from "@/app/(models)/user"
import post from  "../../(models)/posts"
import {NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'


// export async function account(req){
//     // console.log('POST RAN')
// //how to use  different model methods for different forms 
//     try {
//         const body = await req.json()
//         const accountData = body
//         await account.create(accountData)
//         return NextResponse.json({message:'user created',},{status:201})
//     } catch (error) {
//         return NextResponse.json({message:'error',error},{status:500})
//     }
// }

export async function POST(req){
    console.log('POST RAN')
//how to use  different model methods for different forms 
    try {

        const body = await req.json()
        switch(body.formType){
            case 'forumPost':
            await post.create(body)
            break;
            case 'user':
                const hashed = await bcryptjs.hash(body.password,10)
            const newAccount = await account.create(
                {...body,
                password:hashed,}
                )
                return NextResponse.json({message:`Post made ${newAccount}`,},{status:201})
            default:
                throw new Error('Unknown form type');
        }
        
    } catch (error) {
        return NextResponse.json({message:'error',error},{status:500})
    }
}