import React from 'react'


const Login = () => {


  return (
    <div>
      <div className='flex justify-center h-screen items-center '>
        <div className="border-spacing-2 m-3 border-4 p-4 border-orange-300 md:h-80 md:w-full ">
        <form name='form' className='flex flex-col gap-5 md:text-2xl'>
        <input type='email'  name='Email' placeholder='Email' className='rounded text-center bg-transparent'/>
        <input type='password' name='Password' placeholder='Password' className='rounded text-center  bg-transparent'/>
      <button type='submit' className='hover:text-xl underline '>Login</button>
      <button type='submit' className='hover:text-xl underline'>Register</button>
      
        </form>
        </div>
      </div>
    </div>
  )
}

export default Login