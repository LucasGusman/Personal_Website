import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 3D Model Component
function MascotModel({ isHovered }) {
  // Load the model from public directory
  const { scene } = useGLTF('/mascot.glb');
  const group = useRef();
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));
  const globalMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Listen to mouse movement globally across the entire window
    const handleMouseMove = (event) => {
      // Normalize coordinates to range between -1 and 1
      globalMouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      globalMouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!group.current) return;

    // Read from the global mouse tracker instead of the restricted Canvas pointer
    targetRotation.current.y = (globalMouse.current.x * Math.PI) / 3; // Turn left/right
    targetRotation.current.x = -(globalMouse.current.y * Math.PI) / 6; // Look up/down

    // Smoothly interpolate current rotation towards target using lerp
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotation.current.x, 0.1);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotation.current.y, 0.1);

    // Add a hover bouncing animation when the user mouses over the mascot
    if (isHovered) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 6) * 0.1;
    } else {
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 0, 0.1);
    }
  });

  return (
    <group ref={group}>
      <Center>
        {/* Offset the auto-generated 3D model's default orientation by rotating it 135 degrees to the left */}
        <primitive object={scene} scale={3.5} rotation={[0, -3 * Math.PI / 4, 0]} />
      </Center>
    </group>
  );
}

export default function Mascot() {
  const [message, setMessage] = useState("Greetings, Commander. System standing by.");
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const customMessage = entry.target.getAttribute('data-mascot');
          if (customMessage) {
            setMessage(customMessage);
            setIsVisible(true);
          }
        }
      });
    }, {
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0
    });

    const timeoutId = setTimeout(() => {
      const targets = document.querySelectorAll('[data-mascot]');
      targets.forEach(target => observer.observe(target));
    }, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-end gap-4 pointer-events-auto font-sans select-none">

      {/* Speech Bubble */}
      <div 
        className={`relative max-w-[250px] bg-[var(--white-bg)] border border-[var(--border-color)] p-4 rounded-2xl rounded-br-sm shadow-xl transition-all duration-500 ease-out origin-bottom-right
          ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}
      >
        <p className="text-sm text-[var(--text-primary)] font-medium leading-relaxed transition-colors duration-500">
          {message}
        </p>
        {/* Little decorative bubble tail */}
        <div className="absolute -bottom-2 right-4 w-4 h-4 bg-[var(--white-bg)] border-b border-r border-[var(--border-color)] rotate-45 transform transition-colors duration-500"></div>
      </div>

      {/* Mascot Avatar - Clicking hides/shows the bubble */}
      <div 
        onClick={() => setIsVisible(!isVisible)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative group cursor-pointer w-28 h-28 transform transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[var(--accent-teal)] rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-colors duration-500"></div>

        {/* 3D WebGL Canvas */}
        <div className={`relative w-full h-full rounded-full overflow-hidden shadow-2xl bg-gradient-to-tr from-[var(--text-secondary)] to-[var(--text-primary)] border border-[var(--border-color)] transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2.5} />
            {/* The Environment preset provides highly realistic reflections based on city lighting */}
            <Environment preset="city" />
            <Suspense fallback={null}>
              <MascotModel isHovered={isHovered} />
            </Suspense>
          </Canvas>
        </div>
      </div>

    </div>
  );
}
