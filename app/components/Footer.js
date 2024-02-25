import React from 'react'

const Footer = () => {
  return (
        <div className="flex flex-col items-center w-full    bg-slate-700">
    <div className=" h-7 text-center items-center gap-10 grid-cols-3 grid">
      <a className='hover:bg-slate-400 w-7 h-7 rounded-lg' href='#'>
      <img width="50" height="50" src="https://img.icons8.com/ios/50/twitterx--v1.png" alt="twitterx--v1"/>
      </a>
      <a className='hover:bg-slate-400 w-7 h-7 rounded-lg' href='#'>
      <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/instagram-new--v1.png" alt="instagram-new--v1"/>
      </a>
      <a className='hover:bg-slate-400 w-7 h-7 rounded-lg' href='#'>
      <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/facebook-new.png" alt="facebook-new"/>
      </a>
      
      </div>
    </div>
  )
}

export default Footer