import account from "@/app/(models)/user";
import post from "../../(models)/posts";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import moneyinfo from "@/app/(models)/money";

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

export async function POST(req) {
console.log("POST RAN");
//use switch cases  by passing the 'formtype' name property through case
//and destructuring the body request to access multiple form names  to use
//different model methods representing  different forms
try {
const body = await req.json();
switch (body.formType) {
case "forumPost":
const newPost = await post.create(body);
return NextResponse.json(
{ message: `Post made successfully`, newPost },
{ status: 201 }
);
case "user":
const hashed = await bcryptjs.hash(body.password, 10);
const newAccount = await account.create({ ...body, password: hashed });
return NextResponse.json(
{ message: `account made successfully${newAccount}` },
{ status: 201 }
);
case "userMoney":
try {
const moneyEntry = await moneyinfo.create(body);
console.log("money entry:", moneyEntry);
console.log("moneyBody:", body);


      return NextResponse.json(
        { message: `savings/invesment  information ${moneyEntry}` },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("Error creating money entry:", dbError);
      return NextResponse.json(
        {
          message: "error",
          error: dbError.message || "Database operation failed",
        },
        { status: 500 }
      );
    }

  case "login":
    try {
      const user = await account.findOne({ email: body.email });
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 },
          alert('wrong creditials please try again or sign up')
        );
      }
      const match = await bcryptjs.compare(body.password, user.password);
      if (!match) {
        return NextResponse.json(
          { message: "Invalid email or password" },
          { status: 401 }
        );
      }
      const token = jwt.sign(
        { userId_name: user },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      return NextResponse.json(
        { message: "Login successful", token },
        { status: 200 }
      );
    } catch (error) {
      console.error(error); // Log the error for better debugging.
      return NextResponse.json(
        { message: "Login process failed", error: error.message },
        { status: 500 }
      );
    }
}



} catch (error) {
return NextResponse.json({ message: "error", error }, { status: 500 });
}
}

export async function GET(req) {

const url = new URL(req.url);
// Extract query parameters from the request URL
const type = url.searchParams.get('type');

try {
switch (type) {
case 'posts':
// Handling GET requests for posts
const posts = await post.find().sort({createdAt: -1}); // Assuming there's a createdAt field for sorting
console.log(JSON.stringify(posts, null, 2));
return NextResponse.json(posts, { status: 200 });


  case 'financialDetails':
  //👇🏻GETS CURRENT USER
 const user =   url.searchParams.get('userId')



const financialDetails = await moneyinfo.findOne({finAccount:user}).sort({createdAt: -1});


    if (!financialDetails) {
      return NextResponse.json({ message: "Financial details not found" }, { status: 404 });
    }
    return NextResponse.json(financialDetails, { status: 200 });

  default:
    return NextResponse.json({ message: "Invalid request type" }, { status: 400 });
}



} catch (error) {
console.error("Error in GET:", error);
return NextResponse.json({ message: "error", error: error.message }, { status: 500 });
}
}

//make a line of code that queries a delete for when a user clears the amounts in the database.