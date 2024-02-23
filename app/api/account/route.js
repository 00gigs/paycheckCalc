// import account from "../../(models)/user"
import post from  "../../(models)/posts"
import {NextResponse} from 'next/server'



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
        const forumPost = body
        await post.create(forumPost)
        return NextResponse.json({message:`Post made ${forumPost}`,},{status:201})
    } catch (error) {
        return NextResponse.json({message:'error',error},{status:500})
    }
}