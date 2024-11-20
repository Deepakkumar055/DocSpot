import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        
   <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
    {/* left side */}
<div>

<img className='mb-5 w-40' src={assets.logo} alt="" />
<p className='w-full md:w-2/3 text-gray-600 leading-6'>we are best for you sincce 2024 we are here to help with the best of the services and we a genrousity</p>
  


</div>
{/* center  side*/}

<div>
<p className='text-xl font-medium mb-5'>Company</p>
<ul className='flex flex-col gap-2 text-gray-600'>
<li>Home</li>
<li>about</li>
<li>contact</li>
<li>Privacy Policy</li>
</ul>


</div>

{/* right side */}
<div>
<p  className='text-xl font-medium mb-5'>GET IN TOUCH</p>

<ul className='flex flex-col gap-2 text-gray-600 ' >
<li className=''>+91 7018318078</li>
<li>deepakkumr2098@gmail.com</li>
</ul>

</div>



         
   </div>
 {/* copywrite text */}
   <div >
    <hr />
    <p className='text-center text-gray-600 py-5 text-sm'>Copyright 2024@ Pescripto - All Rights Reserved.</p>

   </div>


    </div>
  )
}

export default Footer