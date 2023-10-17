// import React, { useEffect, useState } from 'react'
// import logo from '../../public/images/logo.PNG'
// import Image from 'next/image';
// import { User } from '@/types/types';
// import { getTodaysDate } from '@/utils';
// import zodiac from '../images/pisces.png';
// import Navbar from './Navbar';
// import { insights } from '@/mockdata';

// // interface HomepageProps {
// //   user: User
// // }

// const Homepage = () => {


//   const [user, setUser] = useState<User>(userData)
//   const [userInsights, setUserInsights] = useState(insights)
//   return (
//     <div className='relative h-full flex flex-col'>
//       <div className='mt-10 h-full'>
//         <Image className='ml-5' width={300} height={100} alt="Logo" src={logo} />
//         <h1 className='mt-7 text-center text-3xl'>Daily Horoscope</h1>
//         <h2 className='text-center text-lg'>{getTodaysDate()}</h2>
//         <div className='flex justify-center items-center flex-col'>
//           <Image width={250} height={100} alt="Logo" src={`/images/${user.data.sign}.png`} />
//           <div className='w-2/3 h-45 mt-5 border border-white border-1 overflow-scroll rounded-lg px-5 py-1'>
//             <p>{insights.data.horoscope}</p>
//           </div>
//         </div>
//       </div>
//       <Navbar />
//     </div>
//   )
// }

// export default Homepage