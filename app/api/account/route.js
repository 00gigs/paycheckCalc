// Import necessary libraries and models
import account from "@/app/models/user";
import post from "../../models/posts";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import moneyinfo from "@/app/models/money";

// Helper function to handle responses
const handleResponse = (res, status, data) => {
  res.status(status).json(data);
};

export default async function handler(req, res) {
  const { method } = req;
  
  try {
    if (method === "POST") {
      const body = await req.json();
      switch (body.formType) {
        case "forumPost":
          const newPost = await post.create(body);
          handleResponse(res, 201, { message: "Post made successfully", newPost });
          break;
        case "user":
          const hashedPassword = await bcryptjs.hash(body.password, 10);
          const newAccount = await account.create({ ...body, password: hashedPassword });
          handleResponse(res, 201, { message: "Account created successfully", newAccount });
          break;
        case "userMoney":
          const moneyEntry = await moneyinfo.create(body);
          handleResponse(res, 201, { message: "Savings/investment information added", moneyEntry });
          break;
        case "login":
          const user = await account.findOne({ email: body.email });
          if (!user) {
            return handleResponse(res, 404, { message: "User not found" });
          }
          const isMatch = await bcryptjs.compare(body.password, user.password);
          if (!isMatch) {
            return handleResponse(res, 401, { message: "Invalid email or password" });
          }
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
          handleResponse(res, 200, { message: "Login successful", token });
          break;
        default:
          handleResponse(res, 400, { message: "Invalid form type" });
      }
    } else if (method === "GET") {
      const url = new URL(req.url);
      const type = url.searchParams.get('type');
      switch (type) {
        case 'posts':
          const posts = await post.find().sort({ createdAt: -1 });
          handleResponse(res, 200, posts);
          break;
        case 'financialDetails':
          const userId = url.searchParams.get('userId');
          const financialDetails = await moneyinfo.findOne({ finAccount: userId }).sort({ createdAt: -1 });
          if (!financialDetails) {
            return handleResponse(res, 404, { message: "Financial details not found" });
          }
          handleResponse(res, 200, financialDetails);
          break;
        default:
          handleResponse(res, 400, { message: "Invalid request type" });
      }
    } else if (method === "DELETE") {
      // Assuming 'type' parameter is passed to identify deletion context
      const url = new URL(req.url);
      const type = url.searchParams.get('type');
      switch (type) {
        case 'financialDetails':
          const userId = url.searchParams.get('userId');
          // Perform delete operation here, for example, to delete financial details
          // Adjust the query as per your requirements
          await moneyinfo.deleteOne({ finAccount: userId });
          handleResponse(res, 200, { message: "Financial details deleted successfully" });
          break;
        default:
          handleResponse(res, 400, { message: "Invalid delete operation" });
      }
    } else {
      res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
      handleResponse(res, 405, { message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error("Server error:", error);
    handleResponse(res, 500, { message: "Server error", error: error.message });
  }
}
