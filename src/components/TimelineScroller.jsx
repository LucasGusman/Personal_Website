import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DATA = [
  { id: 1, year: '2025', title: 'Venus Rover Probe', desc: 'Entering the harsh atmosphere of the second planet. Concept testing and atmospheric pressure simulations completed.', img: '/projects/Picture2.jpg' },
  { id: 2, year: '2023', title: 'Lunar Base Architecture', desc: 'Structural models for sustained human presence on the lunar south pole, focusing on radiation shielding and modular deployment.', img: '/projects/VideoCapture.jpg' },
  { id: 3, year: '2021', title: 'Orbital Visualizer', desc: 'A multi-spectral visualization tool for tracking orbital debris and plotting safe trajectory corridors in low Earth orbit.', img: '/projects/sevenColors.gif' },
  { id: 4, year: '2019', title: 'CubeSat Build', desc: 'Final assembly and systems integration of the custom 3U CubeSat structure, preparing for deployment from the ISS.', img: '/projects/cubeSatBuild.jpg' },
  { id: 5, year: '2017', title: 'Deep Space Comm Network', desc: 'Upgrading the physical antenna arrays and signal processing pipelines for the Deep Space Network to support higher bandwidth telemetry.', img: '/projects/HETs.jpg' },
];

export default function TimelineScroller() {
  const containerRef = useRef(null);
  const playheadRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    // Playhead movement maps to total scroll progress of the container
    gsap.to(playheadRef.current, {
      y: () => trackRef.current.offsetHeight - playheadRef.current.offsetHeight,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });

    // Content animations & Active Index updating
    const items = gsap.utils.toArray('.timeline-item');
    items.forEach((item, index) => {
      // Fade and slide up the content
      gsap.fromTo(item,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // Update active index strictly when items pass the center of the screen
      ScrollTrigger.create({
        trigger: item,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full flex flex-col md:flex-row min-h-screen bg-[var(--bg-primary)] transition-colors duration-500 pt-16 md:pt-0">

      {/* Left Sticky Sidebar (The Spine) */}
      <div className="hidden md:flex w-1/3 lg:w-1/4 sticky top-0 h-screen flex-col items-end justify-center py-20 pr-10 border-r border-[var(--border-color)] transition-colors duration-500 z-10">

        {/* Massive Rotated Active Year Container */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 -rotate-90 origin-right flex justify-center items-center h-48 w-96 pointer-events-none">
          <div className="relative h-full w-full flex items-center justify-center">
            {TIMELINE_DATA.map((data, index) => (
              <div
                key={data.id}
                className={`absolute font-baunk text-[8vw] md:text-[6vw] tracking-wider leading-none transition-all duration-700 ease-in-out whitespace-nowrap
                            ${activeIndex === index ? 'opacity-100 translate-y-0 text-[var(--text-secondary)]' :
                    activeIndex > index ? 'opacity-0 -translate-y-full' : 'opacity-0 translate-y-full'}
                        `}
                style={{
                  textShadow: activeIndex === index ? '0 0 20px var(--orb-teal)' : 'none'
                }}
              >
                {data.year}
              </div>
            ))}
          </div>
        </div>

        {/* The Track Line Container */}
        <div ref={trackRef} className="absolute right-[-1px] top-[15vh] bottom-[15vh] w-[2px] bg-gradient-to-b from-transparent via-[var(--border-hover)] to-transparent">
          {/* The Playhead Dot */}
          <div
            ref={playheadRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--accent-red)] shadow-[0_0_15px_var(--accent-red)] transition-colors duration-500 z-20"
          >
            <div className="absolute inset-0 rounded-full bg-[var(--white-bg)] scale-50 opacity-80 transition-colors duration-500"></div>
          </div>
        </div>

      </div>

      {/* Right Scrollable Content */}
      <div className="w-full md:w-2/3 lg:w-3/4 px-6 md:px-16 lg:px-24 py-[50vh] flex flex-col gap-[75vh]">
        {TIMELINE_DATA.map((item, index) => (
          <div key={item.id} className="timeline-item flex flex-col justify-center min-h-[50vh] max-w-2xl relative z-10">
            <div className="md:hidden text-[var(--accent-red)] font-baunk text-5xl mb-4 opacity-50">{item.year}</div>
            <div className="text-[var(--accent-teal)] font-mono text-sm tracking-widest uppercase mb-4 transition-colors duration-500">
              LOG // {item.year}.0{index + 1}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[var(--text-secondary)] mb-6 transition-colors duration-500">
              {item.title}
            </h2>
            <p className="text-lg text-[var(--text-primary)]/80 leading-relaxed mb-10 transition-colors duration-500 font-light">
              {item.desc}
            </p>

            {item.img && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent-teal)] shadow-lg hover:shadow-[0_0_30px_var(--orb-teal)] transition-all duration-700 group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-primary)] to-transparent opacity-40 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
