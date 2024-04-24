import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import {motion} from 'framer-motion';
import { Button } from './ui/button';
import Link from 'next/link';

/* export function Card({title, price, item1, icon1, item2, icon2, item3, icon3, item4, icon4, item5, icon5, item6, icon6, item7, icon7}) {
    return (
        <div className='bg-gray-900 flex flex-col justify-center items-center rounded-xl gap-2 overflow-hidden shadow-2xl hover:scale-105  transition-all duration-200 col-span-2'>
                <span className='text-4xl font-extrabold text-gray-200 pt-16 pb-4 px-16'>{title}</span>
                <span className='font-bold pb-8 text-white text-xl'>£{price} / month*</span>
                <span className='py-6 pb-8 flex flex-col bg-red-50 w-full text-gray-700 px-20 font-medium gap-4'>
                  <span className='flex gap-4 items-center'><FontAwesomeIcon icon={icon1}/> {item1}</span>
                  <span className='flex gap-4 items-center'><FontAwesomeIcon icon={icon2}/> {item2}</span>
                  <span className='flex gap-4 items-center'><FontAwesomeIcon icon={icon3}/> {item3}</span>
                  <span className='flex gap-4 items-center'><FontAwesomeIcon icon={icon4}/> {item4}</span>
                  <span className='flex gap-4 items-center'><FontAwesomeIcon icon={icon5}/> {item5}</span>
                  <span className='flex gap-4 items-center'><FontAwesomeIcon icon={icon6}/> {item6}</span>
                  <span className='flex gap-4 items-center'><FontAwesomeIcon icon={icon7}/> {item7}</span>
                </span>
              </div>
    )
} */
export function Card(props) {
  const isHovered = props.currentId === props.id && 'bg-gradient-to-br from-orange-700 to-purple-600';
  const thisIsHovered = () => {
      props.setHoveredCard(props.id);
  }
  const thisIsNotHovered = () => {
      props.setHoveredCard(1);
  }

  return (
      <motion.div className={`flex flex-col justify-center items-center rounded-xl ${isHovered} gap-2 overflow-hidden bg-gray-900 transition-all duration-200 shadow-2xl hover:scale-105 col-span-2  hover:saturate-[200%]`}
          onMouseEnter={thisIsHovered}
          onMouseLeave={thisIsNotHovered}
          whileHover={{ scale: 1.05}}
      >
          <span className='text-4xl font-extrabold text-gray-200 pt-16 pb-4 px-16'>{props.title}</span>
          <span className='font-bold pb-8 text-white text-xl'>£{props.price} / month*</span>
          <span className='py-6 pb-8 flex flex-col bg-red-50 w-full text-gray-700 px-10 font-medium gap-4'>
              {props.items && (props.items).map((item, index) => (
                <span className='px-10 flex gap-4 items-center whitespace-nowrap' key={index}>{item}</span>
              ))}

              <Link href={`https://billing.solsticehosting.co.uk/store/${props?.category?.billingSlug}/${props.itemId}`} target='_blank'>
              <Button className="w-[100%] mt-8 rounded-lg bg-gray-900">
                  Order
              </Button>
              </Link>
          </span>
      </motion.div>
  )
}





export function StaffCard({name, title, desc, image, email, router}) {
  return (
    <div className='group w-full bg-gray-800 rounded-lg flex gap-4  overflow-hidden outline outline-gray-700 outline-2 hover:outline-purple-500 hover:outline-4 transition-all duration-75'>
      <div className='w-full bg-gray-800 rounded-lg flex gap-4 overflow-hidden outline outline-gray-700transition-all duration-75'>
        <div className='flex-col flex gap-4 p-8 h-full justify-center'>
          <div>
          <p className='text-white text-2xl font-bold'>{name}</p>
          <p className='text-gray-400 text-xl'>{title}</p>
          </div>
          <p className='text-white'>{desc}</p>
          <Link href={`mailto:${email}`}>
          <motion.button 
          className='w-1/2 bg-gray-300 py-2 px-6 rounded-lg shadow-2xl cursor-pointer'
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          >Email</motion.button>
          </Link>
        </div>
        <Image src={image} alt={name} width="300" height="300" className='hidden lg:block w-1/2 grayscale rounded-l-full outline-2 group-hover:grayscale-0 transition-all duration-200 outline-gray-700 outline shadow-2xl'/>
      </div>
    </div>
  )
}

export function Review({ name, stars, review, title }) {
  // Calculate the integer and fractional parts of stars
  const integerStars = Math.floor(stars);
  const fractionalStars = stars - integerStars;

  // Create an array of full star icons based on the integer part of stars
  const fullStarIcons = Array.from({ length: integerStars }, (_, index) => (
    <FontAwesomeIcon key={`full_${index}`} icon={faStar} className='hover:text-orange-400 transition-all duration-200' />
  ));

  // Render a half star if the fractional part of stars is greater than 0
  const halfStarIcon = fractionalStars > 0 ? <FontAwesomeIcon icon={faStarHalf} className='hover:text-orange-400 transition-all duration-200'  /> : null;

  return (
    <div className={`col-span-3 bg-gray-800 p-8 rounded-lg flex flex-col gap-4 items-center`}>
      <div className='w-full flex gap-6 justify-between items-center'>
        <span className='text-xl text-white font-bold'>{name}</span>
        <span className='text-lg whitespace-nowrap text-purple-500 hover:text-purple-400 drop-shadow-lg'>
          {fullStarIcons}
          {halfStarIcon}
        </span>
      </div>
      <div className='w-full h-[1px] bg-gray-700'></div>
      <div className='w-full text-gray-100 flex flex-col items-start justify-start text-left'>
        <span className='text-lg font-semibold'>{title}</span>
        <span>{review}</span>
      </div>
    </div>
  );
}

export function ShopCard(props) {
  return (
    <div className='col-span-2 bg-gradient-to-r from-orange-400 to-purple-500 rounded-lg'>
      <div className='bg-white h-full w-full rounded-lg p-8 px-0 flex flex-col items-center gap-4'>
        <div className='w-full flex flex-col gap-1 items-center'>
          <span className='text-3xl font-extrabold text-gray-900 pb-2'>{props.title}</span>
          <span className='text-lg font-semibold text-gray-700 pb-6'>£{props.price}/month</span>
        </div>
        <div className='flex flex-col gap-8 items-center'>
          <span className='flex flex-col w-full text-gray-700 px-20 font-medium gap-4 whitespace-nowrap'>
          {props.items && (props.items).map((item, index) => (
            <span className='flex gap-4 items-center whitespace-nowrap' key={index}>{item}</span>
          ))}
          </span>
          <Link  href={`${props.link && props.link}`} className='w-full flex justify-center' target='_blank'><button className='w-4/5 bg-gray-900 text-white py-2 rounded-lg transition-all duration-200 hover:font-semibold hover:scale-95'>{props.link ? 'Order' : 'Coming Soon'}</button></Link>
        </div>
      </div>
    </div>
  )
}
export function ShopSpecialCard(props) {
  return (
    <div className='col-span-2 p-2 bg-gradient-to-r from-orange-400 to-purple-500 transition-all duration-200 rounded-lg hover:saturate-150 hover:to-orange-400 hover:from-purple-500'>
    <div className='bg-white h-full w-full rounded-lg p-8 px-0 flex flex-col items-center gap-4'>
      <div className='w-full flex flex-col gap-1 items-center'>
        <span className='text-3xl font-extrabold text-gray-900 pb-2'>{props.title}</span>
        <span className='text-lg font-semibold text-gray-700 pb-6'>£{props.price}/month</span>
      </div>
      <div className='flex flex-col gap-6 items-center'>
        <span className='flex flex-col w-full text-gray-700 px-20 font-medium gap-4'>
        {props.items && (props.items).map((item, index) => (
            <span className='flex gap-4 items-center whitespace-nowrap' key={index}>{item}</span>
          ))}
        </span>
        <Link  href={`${props.link && props.link}`} className='w-full flex justify-center' target='_blank'><button className='w-4/5 bg-gray-900 text-white py-2 rounded-lg transition-all duration-200 hover:font-semibold hover:scale-95'>{props.link ? 'Order' : 'Coming Soon'}</button></Link>
      </div>
    </div>
  </div>
  )
}



export function DediCard(props) {
  return (
    <div className='col-span-2 bg-gradient-to-r from-orange-400 to-purple-500 rounded-lg'>
      <div className='bg-white h-full w-full rounded-lg p-8 px-0 flex flex-col items-center gap-4'>
        <div className='w-full flex flex-col gap-1 items-center'>
          <span className='text-3xl font-extrabold text-gray-900 pb-2'>{props.title}</span>
          <span className='text-lg font-semibold text-gray-700 pb-6'>£{props.price}/month</span>
        </div>
        <div className='flex flex-col gap-8 items-center'>
          <span className='flex flex-col w-full text-gray-700 px-20 font-medium gap-4 whitespace-nowrap'>
                  {props.items && (props.items).map((item, index) => (

                    <span className='flex gap-4 items-center' key={index}>{item}</span>

                  ))}
          </span>
          <button className='w-3/5 lg:w-4/5 bg-gray-900 text-white py-2 rounded-lg transition-all duration-200 hover:font-semibold hover:scale-95' onClick={() => (props.link && window.open(props.link, '_blank'))}>{props.link ? 'Order' : 'Coming Soon'}</button>
        </div>
      </div>
    </div>
  )
}
export function DediSpecialCard(props) {
  return (
    <div className='col-span-2 p-2 bg-gradient-to-r from-orange-400 to-purple-500 transition-all duration-200 rounded-lg hover:saturate-150 hover:to-orange-400 hover:from-purple-500'>
    <div className='bg-white h-full w-full rounded-lg p-8 px-0 flex flex-col items-center gap-4'>
      <div className='w-full flex flex-col gap-1 items-center'>
        <span className='text-3xl font-extrabold text-gray-900 pb-2'>{props.title}</span>
        <span className='text-lg font-semibold text-gray-700 pb-6'>£{props.price}/month</span>
      </div>
      <div className='flex flex-col gap-6 items-center'>
        <span className='flex flex-col w-full text-gray-700 px-20 font-medium gap-4'>
                {props.items && (props.items).map((item, index) => (

                    <span className='flex gap-4 items-center whitespace-nowrap' key={index}>{item}</span>
                    
                  ))}
        </span>
        <button className='w-3/5 lg:w-4/5 bg-gray-900 text-white py-2 rounded-lg transition-all duration-200 hover:font-semibold hover:scale-95' onClick={() => (props.link && window.open(props.link, '_blank'))}>{props.link ? 'Order' : 'Coming Soon'}</button>
      </div>
    </div>
  </div>
  )
}