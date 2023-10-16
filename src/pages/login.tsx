import profilePicture from '../images/demo-user.png';
import Image from 'next/image';
const Login = () => { 
  return (
    <section>
      <h1>This will be the login page</h1>
      <button className='relative bg-cover bg-center'>
        <Image className='rounded-full' src={profilePicture}  alt='drawing of woman with tattoo of lotus flower on her back'/>
        <p className='opacity-60 rounded-full bg-white px-4 py-2 absolute z-2 text-center'>Click to demo</p>
      </button>
    </section>
  )
}

export default Login