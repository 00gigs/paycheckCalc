import React from 'react'


const Login = () => {


  return (
    <div>
      <div className='flex justify-center h-screen items-center '>
        <div className="border-spacing-2 border-4 p-4 border-orange-300">
        <form name='form' className='flex flex-col gap-5 w-min'>
        <input type='email'  name='Email' placeholder='Email' className='rounded text-center'/>
        <input type='password' name='Password' placeholder='Password' className='rounded text-center'/>
      <button type='submit' className='hover:text-xl underline '>Login</button>
      <button type='submit' className='hover:text-xl underline'>Register</button>
      
        </form>
        </div>
      </div>
    </div>
  )
}

export default Login