import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full max-w-[450px]' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum dolor itaque, consectetur excepturi tempora optio amet consequuntur, obcaecati quibusdam repellendus necessitatibus, eveniet nam mollitia animi dicta explicabo. Quisquam, aspernatur similique!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab nisi recusandae in? Doloremque porro fuga hic facilis corporis nesciunt alias officia provident consequuntur iusto, natus delectus sunt adipisci modi magnam!</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse cupiditate aspernatur expedita excepturi iure rerum sunt repellendus iusto temporibus facilis, odio eos sequi tempore eius perspiciatis. Tempore accusantium nihil nesciunt!</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className="flex  flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600 ' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil quos eum voluptate velit, quae inventore aliquid molestias rerum sint quidem ab nostrum minus ipsum sed alias quaerat aut expedita quo.</p>

        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600 ' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil quos eum voluptate velit, quae inventore aliquid molestias rerum sint quidem ab nostrum minus ipsum sed alias quaerat aut expedita quo.</p>

        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Expceptional Customer Service:</b>
          <p className='text-gray-600 ' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil quos eum voluptate velit, quae inventore aliquid molestias rerum sint quidem ab nostrum minus ipsum sed alias quaerat aut expedita quo.</p>

        </div>
      </div>
      
    </div>
  )
}

export default About
