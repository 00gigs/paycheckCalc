import React from 'react'

const Footer = () => {
  return (
        <div className="flex flex-col items-center w-full    bg-slate-800">
    <div className="text-center items-center gap-10 grid-cols-3 grid">
      <a href='#'>
      <img width="50" height="50" src="https://img.icons8.com/ios/50/twitterx--v1.png" alt="twitterx--v1"/>
      </a>
      <a href='#'>
      <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/instagram-new--v1.png" alt="instagram-new--v1"/>
      </a>
      <a href='#'>
      <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/facebook-new.png" alt="facebook-new"/>
      </a>
      
      </div>
    </div>
  )
}

export default Footer