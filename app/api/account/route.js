
import account from "@/app/(models)/user"
import post from  "../../(models)/posts"
import {NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

// export async function account(req){
//     // console.log('POST RAN')
// //use  different model methods for different forms 
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
//use switch cases  by passing the 'formtype' name property through case 
//and destructuring the body request to access multiple form names  to use 
//different model methods representing  different forms 
    try {

        const body = await req.json()
        switch(body.formType){
            case 'forumPost':
            const newPost= await post.create(body)
            return NextResponse.json({ message: `Post made successfully`, newPost }, { status: 201 });
            case 'user':
                const hashed = await bcryptjs.hash(body.password,10)
                const newAccount = await account.create(
                    {...body,
                        password:hashed,}
                        )
            return NextResponse.json({message:`account made successfully${newAccount}`,},{status:201})
            case 'login':
                try {
                 
                    const user  =await account.findOne({email: body.email})
                    if(!user){
                      return NextResponse.json({ message: "User not found" }, { status: 404 });
                    }
                      const match = await bcryptjs.compare(body.password,user.password)
                      if(!match){
                          return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
                      }
                          const token = jwt.sign({userId_name: user },process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
                          return NextResponse.json({ message: "Login successful", token }, { status: 200 });
                } catch (error) {
                    console.error(error); // Log the error for better debugging.
        return NextResponse.json({ message: 'Login process failed', error: error.message }, { status: 500 });
                }
           
        }
       
    } catch (error) {
        return NextResponse.json({message:'error',error},{status:500})
    }
}
//used _ in front of req to ignore declare error 
export async function GET(req){
    //edit  find method to return most recent 
    try {
        const posts = await post.find();
    
        console.log(JSON.stringify(posts, null, 2));

        // Now, each post in the `posts` array should have an `account` object with `name` and `email`
        // You can directly return the modified posts array with populated account information
        return NextResponse.json(posts, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({message:'error',error},{status:500});
    }
}