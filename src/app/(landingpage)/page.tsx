'use client';

import CBannerSignUp from '@/components/organism/CBannerSIgnUp';
import CCategory from '@/components/organism/CCategory';
import CClients from '@/components/organism/CClients';
import CFeaturedJobs from '@/components/organism/CFeaturedJobs';
import CHero from '@/components/organism/CHero';
import CLatestJobs from '@/components/organism/CLatestJobs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React from 'react';

export default function Home() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
    });
  }, []);

  return (
    <div>
      {/* <div className="absolute w-2/3 h-screen top-0 right-0 -z-10">
        <Image src="/images/pattern.png" alt="images" fill />
      
      </div> */}

      <div className="px-32 mb-10">
        <CHero />

        <CClients />

        <CCategory />

        <CBannerSignUp />

        <CFeaturedJobs />

        <CLatestJobs />
      </div>
    </div>
  );
}
