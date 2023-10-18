import logo from '../../public/images/logo.PNG'
import Image from 'next/image';

export default function Logo() {
  return (<Image className='ml-5' width={300} height={100} alt="Logo" src={logo} />)
}