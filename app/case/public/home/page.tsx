"use client"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Cookies from 'js-cookie'; // استيراد مكتبة js-cookie
import Link from 'next/link';
import { names_public} from '@/data/homePage'
import {withAuthForLoggedInUsers} from '@/lib/withAuthForLoggedInUsers';


const Home =()=> {
  const token = Cookies.get('token');
  useEffect(() => {
    AOS.init();
  }, []);
  return (
   <div className=" container_items ">
      {
        names_public.map((name) => (
          <Link href={name === 'مواعيد تجديد المتهمين' ? '/case/public/management' : '/case/public/add'}  className="item flex items-center  shadow-2xl cursor-pointer  " data-aos={name === 'مواعيد تجديد المتهمين' ? 'fade-right' : 'fade-left'}  data-aos-duration="3000"  key={name}>
            <h1 className=" font-bold text-6xl w-[427px] text-center select-none">{name}</h1>
          </Link>
        ))
      }
   </div>
  );
}

export default withAuthForLoggedInUsers(Home);
