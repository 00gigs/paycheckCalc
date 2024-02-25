import { createContext,useContext,useState } from "react";

const authContext = createContext()
export const Authprovider = ({children}) =>{
    const [user, setUser] = useState(null)

    const loginUser = async(email,password)=>{
        try {
            // Replace '/api/login' with your actual login endpoint
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            // Assuming the response includes the user object and token
            setCurrentUser(data.user); // Set the user in context
            localStorage.setItem('token', data.token); // Optionally store the token in localStorage
        } catch (error) {
            console.error(error);
            // Handle login error (e.g., show error message)
        }
    }
    const value = {
        user,
        loginUser, // Make loginUser available to components
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
