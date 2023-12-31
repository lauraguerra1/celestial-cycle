import profilePicture from '../../public/images/demo-user.png';
import Image from 'next/image';

type LoginProps = {
  logIn: (id: number) => void
}
const Login = ({logIn}: LoginProps) => {

  return (
    <section className='mt-10 flex flex-col items-center'>
      <h1 className='text-4xl mt-10 celestial-cursive text-mellow-yellow text-center'>Celestial Cycle</h1> 
      <button className="mt-10 relative group" onClick={() => logIn(1)}>
        <div className="w-60 h-60 relative overflow-hidden">
          <Image className='h-full w-full object-cover rounded-full' src={profilePicture} alt='drawing of woman with tattoo of lotus flower on her back'/>     
          <p className="flex items-center text-2xl celestial-cursive h-10 absolute top-1/2 bottom-1/2 w-40 left-10 opacity-75 rounded-full bg-white px-4 py-2 text-center">Click to demo</p>
        </div>
      </button>
      <section className='my-10 self-stretch flex justify-center items-center'>
        <div className="border-t-2 border-mellow-yellow w-1/3"></div>
        <p className='text-2xl celestial-cursive text-mellow-yellow mx-3'>Or</p>
        <div className="border-t-2 border-mellow-yellow w-1/3"></div>
      </section>
      <button onClick={() => logIn(1)} className='thick-regular rounded-full bg-white opacity-60 w-3/5 py-2 max-w-3xl'>Login</button>
    </section>
  );
}

export default Login;