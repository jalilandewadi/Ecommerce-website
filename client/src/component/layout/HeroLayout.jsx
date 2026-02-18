import React from 'react'
import heroImg from '../../assets/rabbit-hero.webp'
import { Link } from 'react-router-dom'

const HeroLayout = () => {
  return (
    <section className='relative'>
        <img src={heroImg} alt="Rabbit" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover' />
        <div className="absolute inset-0 flex justify-center items-center">
            <div className="text-center text-white p-6">
                <h1 className='text-4xl md:text-9xl font-bold tracking-tight uppercase mb-4'>
                    Vacation <br /> Ready
                </h1>
                <p className='text-sm tracking-tight md:text-lg mb-6'>
                    Explore our vacation-ready outfits with fast Worldwide Shippin.
                </p>
                <Link to={"#"} className='bg-white text-gray-950 p-3 rounded-sm text-lg'>
                Shop Now</Link>
            </div>
        </div>
    </section>
  )
}

export default HeroLayout
