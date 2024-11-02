"use client"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import {withAuthForLoggedInUsers} from '@/lib/withAuthForLoggedInUsers'
const Home =()=> {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
   <div className=" container_items  h-[60vh]">
      <h1 className=' text-6xl'>
      منظومة تيسر الاعمال داخل نيابة اجا الجزئية
      </h1>
   </div>
  );
}

export default withAuthForLoggedInUsers(Home);
