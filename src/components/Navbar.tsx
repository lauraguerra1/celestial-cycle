import React from 'react'
import home from '../images/house.png'
import calendar from '../images/calendar.png'
import user from '../images/user.png'
import Image from 'next/image'

const Navbar = () => {
    return (
        <nav className='flex fixed bottom-0 h-20 w-full bg-lightgray'>
            <div className='flex w-full h-20 icon-container items-center'>
                <div className='h-5/6 w-20 flex p-5 justify-center flex-col items-center'>
                    <div className='rounded-xl bg-darkgray w-10 p-33'>
                        <Image width={45} height={45} alt='user logo' src={calendar} />
                    </div>
                    <p>Calendar</p>
                </div>
                <div className='h-5/6 w-20 flex p-5 justify-center flex-col items-center'>
                    <div className='rounded-xl bg-darkgray w-10 p-33'>
                        <Image width={45} height={45} alt='user logo' src={home} />
                    </div>
                    <p>Home</p>
                </div>
                <div className='h-5/6 w-20 flex p-5 justify-center flex-col items-center'>
                    <div className='rounded-xl bg-darkgray w-10 p-33'>
                        <Image width={45} height={45} alt='user logo' src={user} />
                    </div>
                    <p>Logout</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar