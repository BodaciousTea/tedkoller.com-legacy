import React, { useState, useEffect } from "react";
import {sitePath} from "@/lib/site-path";

function Welcome() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isPastWelcome = window.scrollY > window.innerHeight;
      setIsScrolled(isPastWelcome);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="h-screen bg-cover bg-center relative welcome-section" style={{ backgroundImage: `url("${sitePath("/images/Section Top 1.jpg")}")` }}>
      <div className="cloud-banner-container">
        <img src={sitePath("/images/cloudsBannerText.png")} alt="Ted Koller Cloud Banner" className="cloud-banner" />

        <img src={sitePath("/images/cloud2.png")} className={`cloud cloud2 ${isScrolled ? 'move-up' : ''}`} alt="Cloud 2" />
        <img src={sitePath("/images/cloud3.png")} className={`cloud cloud3 ${isScrolled ? 'move-up' : ''}`} alt="Cloud 3" />
        <img src={sitePath("/images/cloud4.png")} className={`cloud cloud4 ${isScrolled ? 'move-up' : ''}`} alt="Cloud 4" />
        <img src={sitePath("/images/cloud5.png")} className={`cloud cloud5 ${isScrolled ? 'move-up' : ''}`} alt="Cloud 5" />        
        <img src={sitePath("/images/cloud1.png")} className={`cloud cloud1 ${isScrolled ? 'move-up' : ''}`} alt="Cloud 1" />
      </div>
    </div>
  );
}

export default Welcome;
