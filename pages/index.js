import Image from 'next/image';
import Header from '@/components/main/Header.js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import {BetterCard, Card, Review, SpecialCard, StaffCard} from '@/components/cards';
import debounce from 'lodash/debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faHandshakeSimple, faLocationPin, faCoins, faGaugeSimpleHigh, faShield, faHeartPulse, faHandHoldingDollar, faTerminal, faMemory, faMicrochip, faHdd, faEthernet, faGlobeEurope, faEllipsis, faGlobe, faLeftRight, faFingerprint, faPerson, faGlobeAmericas, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {motion, useScroll} from 'framer-motion';


import TasteBit from '@/components/home/\'a_little_taste\'';
import { useRouter } from 'next/router';
import Footer from '@/components/main/Footer';
import Head from 'next/head';
import PocketBase from "pocketbase";
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const [whmcsCategories, setWHMCSCategories] = useState([]);
  const [headerLoading, setHeaderLoading] = useState(true);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [hotProducts, setHotProducts] = useState([]);
  const [partners, setPartners] = useState([]);
  const [index, setIndex] = React.useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewsFetched, setReviewsFetched] = useState(false);

  useEffect(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    // Handling hero expanding n shit
  
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const TEXTS = ['dedicated', 'web', 'wordpress', 'minecraft']

  useEffect(() => {
    window.scrollTo(0, 0);
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  
  const handleHoverOver = (e) => {
    setHoveredCard(e.id);
  }


  useEffect(() => {
    // Handling header shrinking
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!reviewsFetched) {
        try {
          const pb = new PocketBase('https://pb.solsticehosting.co.uk');
          const reviews = await pb.collection('reviews').getList(1, 4, {
            filter: 'display=1',
            sort: 'created'
          })
          const hotProducts = await pb.collection('products').getFullList({
            filter: 'hot=1',
            expand: 'category',
            sort: 'price'
          })
          const partners = await pb.collection('partners').getFullList({
            filter: 'display=1',
            sort: 'title',
          })
          console.log(hotProducts);
          setReviews(reviews.items);
          setHotProducts(hotProducts);
          setPartners(partners);
          setReviewsFetched(true);
        }
        catch (e) {
          setReviewsFetched(false);
          // do nothing.
        }
      }
    }
    fetchReviews();
  }, []);

  const scrolledDownClasses = scrollY >= 275 ? 'rounded-br-none' : 'rounded-br-none lg:rounded-br-[20rem]';


  return (
    <main className='bg-gray-950 w-[100vw]'>
      <Head>
        <title>Home - SolsticeHosting</title>
        <meta name="description" content="A small cloud hosting company based our of the UK. Your success is our priority: We aim to provide you one of the best hosting experiences: the one you deserve." />
        <meta name="keywords" content="UK web hosting, reliable hosting, hosting solutions, Affordable hosting, Reliable server hosting, Secure hosting solutions, Scalable web hosting, Fast website hosting, Shared hosting plans, Cloud hosting solutions, E-commerce hosting, WordPress hosting, dedicated server hosting, UK dedicated hosting, reliable dedicated servers, High-performance servers, Customizable dedicated servers, Enterprise-level hosting, Scalable dedicated hosting, 24/7 server monitoring, Data center hosting, SSD dedicated servers, Linux/Windows dedicated hosting, Minecraft server hosting, game server hosting, UK Minecraft hosting, Game server hosting, Minecraft server, Affordable Minecraft hosting, Modded Minecraft servers, DDoS protected game servers, Low-latency Minecraft hosting, Bukkit/Spigot server hosting, Minecraft server backups, Pterodactyl control panel" />
      </Head>
      {/* Importing Header */}
      <Header className={'z-90'} />
      {/* Main Page Content */}
      <div className={`h-[85vh] overflow-hidden ml-0`}>
      <div className={`flex h-full flex-col w-screen pt-0 pl-0 pb-4 pr-4 border-2 -ml-1 -mt-1 border-transparent ${scrolledDownClasses} bg-gradient-to-r from-purple-500 to-orange-500 transition-all duration-300`}>
      <div className={`flex h-full w-full justify-start items-center px-4 lg:p-20 m-0 overflow-hidden bg-gradient-to-br ${scrolledDownClasses} to-gray-800 from-gray-900 text-gray-200 transition-all duration-300`}>
        <h1 className='text-5xl lg:text-6xl font-extrabold'>
            Hosting your <br className='lg:hidden' />project is {' '}
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-orange-500 hover:drop-shadow-xl hover:from-orange-500 hover:to-purple-500 hover:saturate-150 transition-all duration-200'>
              easy
            </span>
            ,<br className='lg:hidden' />
            <span className='font-bold text-5xl text-gray-300 gap-4 pt-4 z-0 transition-all duration-200 hidden lg:flex'>
              with our       <span className='font-extrabold z-80'><TextTransition springConfig={presets.wobbly} className='z-80'>{TEXTS[index % TEXTS.length]}</TextTransition></span>hosting
            </span>
          </h1>
        </div>
      </div>
      </div>
      <div className='lg:p-20'>
        <span className='text-5xl text-gray-100 font-bold gap-4 select-none hidden md:flex'>A little taste of 
        <Image src="/assets/colour.svg" width="210" height="100" alt={'Solstice'}/></span>
        <div className='grid grid-cols-1 p-2 gap-8 lg:grid-cols-4 pt-8'>
          <TasteBit text={"Customer-First"} icon={faFaceSmile} cols={3}/>
          <TasteBit text={"Stellar support"} icon={faHandshakeSimple} cols={1}/>
          <TasteBit text={"Top-Tier locations"} icon={faLocationPin} cols={2}/>
          <TasteBit text={"Affordable"} icon={faCoins} cols={2}/>
          <TasteBit text={"Performant"} icon={faGaugeSimpleHigh} cols={1}/>
          <TasteBit text={"Accommodating refunds"} icon={faHandHoldingDollar} cols={3}/>
          <TasteBit text={"Enterprise security"} icon={faShield} cols={2}/>
          <TasteBit text={"Great uptime"} icon={faHeartPulse} cols={2}/>
        </div>
      </div>
      
      {hotProducts?.length > 0 && (
      <div className='hidden lg:block pt-4 pb-4 pl-4 bg-gradient-to-b from-purple-600 to-orange-500 rounded-tl-[20.25rem]'>
        <div className='bg-red-100 h-[105vh] rounded-tl-[20rem] border-solid overflow-hidden transition-all duration-200'>
          <div className='relative top-20'>
            <div className='flex flex-col gap-12'>
            <h1 className='text-5xl text-center font-extrabold text-gray-800'>What&apos;s <span className='bg-clip-text text-transparent bg-gradient-to-br transition-all duration-200 from-purple-500 to-orange-500 hover:from-orange-500 hover:to-purple-500 hover:saturate-150 hover:scale-105'>hot</span> right now?</h1>
            <div className='w-full flex justify-between px-[8rem] min-h-full'>
              <motion.div
                  className='hidden lg:block bg-gradient-to-br from-purple-600 to-orange-500 h-10 rounded-lg w-10 transition-all duration-100 self-end'
                  style={{
                    x: 100,
                    y: 20,
                    rotate: 0
                  }}
                  whileInView={{
                    rotate: -30,
                    x: 0,
                    y: 0
                  }}
                  whileHover={{
                    scale: 1.1,
                    filter: 'saturate(150%)',
                    transition: {
                      duration: 0.5,
                    }
                  }}
                  whileTap={{
                    scale: 0.9,
                    transition: {
                      duration: 0.2,
                    }
                  }}
                />
              <motion.div
                  className='hidden lg:block bg-gradient-to-br from-purple-600 to-orange-500 h-12 rounded-lg w-12 self-center transition-all duration-100'
                  initial={{
                    rotate: 45,
                    x: 75,
                    y: 100,
                  }}
                />      
            </div>
            
            <div className='w-full justify-center gap-x-16 gap-y-8 items-center grid grid-cols-8'>
              {/* Card */}
              <div className='col-span-1'></div>
              {hotProducts?.length > 0 && hotProducts?.map((product, index) => (
                <Card 
                key={index}
                id={index}
                title={product.name} 
                category={product.expand.category}
                price={product.price} 
                items={product.features}
                itemId={product.itemId}
                currentId={hoveredCard}
                setHoveredCard={setHoveredCard}
              />      
              )) }
              <div className='col-span-1'></div>  
              <div className='col-span-1'></div>           

            </div>
              <span className='pb-4 w-full text-center text-2xl italic text-gray-600 tracking-wide'>All come with friendly, stellar support included for <span className='font-bold'>free</span>.</span>
            </div>
      
          </div>
        </div>
        </div>
        )}
        <div className='p-8 pb-24 lg:p-24 w-full flex flex-col justify-center gap-24'>
          <div className='flex flex-col gap-4 justify-center w-ful'>
            <p className='w-full text-5xl text-center text-white font-extrabold'>Meet the Team</p>
            <p className='text-center text-gray-200 text-2xl italic tracking-wide'>Brilliant people bringing brilliant products.</p>
          </div>
          <div className='flex flex-col lg:flex-row gap-16'>
            <StaffCard 
              name={'Macauley C.'} 
              title={'CEO'} 
              desc={'Spearheadding the strategic direction and growth of Solstice.'} 
              email={'mclark@solsticehosting.co.uk'} 
              image={'/assets/team/clerk.png'}
              router={router}
            />
            <StaffCard 
              name={'Alex J.'} 
              title={'COO & Developer'} 
              desc={"Creating and maintaining Solstice's vision of product quality"} 
              email={'ajones@solsticehosting.co.uk'} 
              image={'/assets/team/alexx.jpeg'}
              router={router}
              />
          </div>
        </div>
        {reviews.length > 0 && (
        <div className='pt-4 pr-4 bg-gradient-to-r from-purple-500 to-orange-500 lg:rounded-tr-[20.35rem]'>
          <div className='bg-red-100 h-max lg:rounded-tr-[20rem] overflow-hidden transition-all duration-200 px-2 py-20 lg:p-20 flex flex-col gap-14 items-center'>
            <p className='text-5xl text-center font-extrabold text-gray-800'>What do our customers say? <br />
            <span className='text-xl tracking-wide italic font-semibold text-gray-600'>We&apos;re rated 4.1 Stars on TrustPilot</span></p>
            <div className='w-full grid-cols-2 lg:grid-cols-6 grid gap-4 grid-rows-auto'>
              {reviews && reviews?.map((review, index) => (
                <Review 
                key={index}
                stars={review.rating}
                name={review.reviewer}
                title={review.title}
                review={review.review}
                />
              ))}
            </div>
            <p className='text-2xl font-semibold text-gray-800 text-center'>Read more reviews just like these on our <Link className='font-extrabold cursor-pointer' href={'https://uk.trustpilot.com/review/solsticehosting.co.uk'} target='_blank'>TrustPilot</Link></p>
        </div>
      </div> )}
        <Footer />
    </main>
  );
}
