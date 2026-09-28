"use client";
import React, { useEffect, useState, useRef } from "react";
import Welcome from "./Welcome";
import About from "./About";
import Gallery from "./Gallery";
import "@/styles/main.css";
import {sitePath} from "@/lib/site-path";

const SCROLL_DURATION = 850;
const WHEEL_THRESHOLD = 12;

function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProgrammaticScroll = useRef(false);
  const currentSectionIndex = useRef(0);
  const [disableSnap, setDisableSnap] = useState(false);
  const [welcomeScrolled, setWelcomeScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      document.body.classList.add("mobile");

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = sitePath("/styles/main.mobile.css");
      link.onload = () => {
        setTimeout(() => setIsLoading(false), 300); // Give CSS time to apply
      };
      link.onerror = () => {
        console.warn("❌ Failed to load mobile CSS");
        setIsLoading(false);
      };

      // Safety fallback in case onload never fires
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      document.head.appendChild(link);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const sectionTop = (index: number) => sectionHeight() * index;
    const sectionHeight = () => scrollContainer.clientHeight;

    const finishProgrammaticScroll = () => {
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
      scrollEndTimer.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, SCROLL_DURATION);
    };

    const scrollToSection = (index: number) => {
      const targetIndex = Math.max(0, Math.min(index, 2));
      currentSectionIndex.current = targetIndex;
      isProgrammaticScroll.current = true;
      scrollContainer.scrollTo({
        top: sectionTop(targetIndex),
        behavior: "smooth",
      });
      finishProgrammaticScroll();
    };

    const handleScroll = () => {
      const height = sectionHeight();
      const scrollTop = scrollContainer.scrollTop;
      const galleryStart = height * 2;
      const nearestSection = Math.round(scrollTop / height);

      setDisableSnap(scrollTop >= galleryStart - 5);
      setWelcomeScrolled(scrollTop > height * 0.35);
      currentSectionIndex.current = Math.max(0, Math.min(nearestSection, 2));
    };

    const handleWheel = (e: WheelEvent) => {
      const height = sectionHeight();
      const scrollTop = scrollContainer.scrollTop;
      const galleryTop = height * 2;
      const inGallery = scrollTop >= galleryTop - 4;
      const galleryAtTop = scrollTop <= galleryTop + 8;

      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
      if (isProgrammaticScroll.current) {
        e.preventDefault();
        return;
      }

      if (inGallery) {
        if (galleryAtTop && e.deltaY < 0) {
          e.preventDefault();
          scrollToSection(1);
        }
        return;
      }

      e.preventDefault();
      scrollToSection(e.deltaY > 0 ? currentSectionIndex.current + 1 : currentSectionIndex.current - 1);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    handleScroll();

    return () => {
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
      scrollContainer.removeEventListener("scroll", handleScroll);
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleScrollArrow = () => {
    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      const sectionHeight = scrollContainer.clientHeight;
      const currentTop = scrollContainer.scrollTop;
      const currentIndex = Math.round(currentTop / sectionHeight);
      const nextTop = currentIndex >= 2 ? 0 : (currentIndex + 1) * sectionHeight;

      scrollContainer.scrollTo({ top: nextTop, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Fullscreen Loader */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-auto">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white" />
        </div>
      )}

      <div
        ref={containerRef}
        className={`legacy-scroll h-screen overflow-y-scroll ${
          disableSnap ? "legacy-scroll--free" : ""
        } ${isLoading ? "overflow-hidden" : ""}`}
      >
        <section className="h-screen">
          <Welcome isScrolled={welcomeScrolled} />
        </section>

        <section className="h-screen">
          <About />
        </section>

        <section className="min-h-screen">
          <Gallery />
        </section>

        <div
          className="fixed z-10 cursor-pointer bottom-[1.8vw] left-1/2 transform -translate-x-1/2 duration-500"
          onClick={handleScrollArrow}
        >
          <img className="w-[1.2vw]" src={sitePath("/images/scroll-arrow.svg")} alt="Scroll arrow" />
        </div>
      </div>
    </>
  );
}

export default HomePage;
