// import Navbar from '@/components/Navbar';
// import { useState } from 'react';
// import Image from 'next/image';
// import logo from '../../public/images/logo.PNG'
// // import addUser from './api/addUser';

// type UserInfoProps = {
//   name: string;
//   zodiacSign: string;
//   birthday: string;
// };

// export default function UserInfoForm() {

//   const [userInfo, setUserInfo] = useState<UserInfoProps>({
//     name: '',
//     zodiacSign: '',
//     birthday: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUserInfo({...userInfo, [name]: value});
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(userInfo);
//     const res = await fetch('/api/addUser', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({userInfo}),
//     })
//     .then((res) => {
//       res.json()
//       console.log(res)
//     })
//   }

//   return (
//     <div className='relative h-full flex flex-col'>
//       <div className='mt-10 h-full'>
//         <Image className='ml-5' width={300} height={100} alt="Logo" src={logo} />
//         <h1 className='mt-7 text-center text-3xl'>Welcome!</h1>
//         <p>Since this is your first time using this app, please fill out the following information:</p>
//       </div>
//       <form className='relative h-full flex flex-col text-black' onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input type="text" id="name" name="name" value={userInfo.name} onChange={handleChange}/>
//         </div>
//         <div>
//           <label htmlFor="zodiacSign">Zodiac Sign:</label>
//           <input type="text" id="zodiacSign" name="zodiacSign" value={userInfo.zodiacSign} onChange={handleChange}/>
//         </div>
//         <div>
//           <label htmlFor="birthday">Birthday:</label>
//           <input type="date" id="birthday" name="birthday" value={userInfo.birthday} onChange={handleChange}/>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       <Navbar />
//     </div>
//   );
// };

