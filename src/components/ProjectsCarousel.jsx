import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

const PROJECTS = [
  { id: 1, title: 'Venus Rover - HeroX', image: '/projects/Picture2.jpg', link: '/projects/1' },
  { id: 2, title: 'UF Rocket Team - NASA SL', image: '/projects/VideoCapture.jpg', link: '/projects/2' },
  { id: 3, title: 'Music Visualizer - SwampHacks', image: '/projects/sevenColors.gif', link: '/projects/3' },
  { id: 4, title: 'CubeSat Build', image: '/projects/cubeSatBuild.jpg', link: '/projects/4' },
  { id: 5, title: 'Design and Manufacturing Lab', color: '#21859c', link: '/projects/5' },
  { id: 6, title: 'Anomalous Electron Transport in HETs', image: '/projects/HETs.jpg', link: '/projects/6' },
  { id: 7, title: 'PROJECT 07', color: '#fca311', link: '/projects/7' },
  { id: 8, title: 'PROJECT 08', color: '#12122b', link: '/projects/8' },
];

function CarouselGroup() {
  const scrollOffset = useRef(0);
  const rotationVelocity = useRef(0);
  const isDragging = useRef(false);
  const previousX = useRef(0);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    previousX.current = e.clientX;
    rotationVelocity.current = 0;
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousX.current;
    previousX.current = e.clientX;
    rotationVelocity.current = deltaX * 0.002;
  };

  const handlePointerUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      document.body.style.cursor = 'auto';
    }
  };

  const handleWheel = (e) => {
    e.stopPropagation();
    // Scroll down moves the carousel forward
    rotationVelocity.current -= e.deltaY * 0.0005;
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  useFrame(() => {
    if (!isDragging.current) {
      scrollOffset.current += rotationVelocity.current;
      rotationVelocity.current *= 0.95; // Friction multiplier
    } else {
      scrollOffset.current += rotationVelocity.current;
    }
  });

  return (
    <group onWheel={handleWheel}>
      {/* Invisible hit plane to catch pointer down everywhere in the background */}
      <mesh visible={false} onPointerDown={handlePointerDown} position={[0, 0, -2]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial />
      </mesh>

      {PROJECTS.map((project, i) => (
        <CarouselItem
          key={project.id}
          project={project}
          index={i}
          total={PROJECTS.length}
          scrollOffset={scrollOffset}
          onDragStart={handlePointerDown}
        />
      ))}
    </group>
  );
}

function CarouselItem({ project, index, total, scrollOffset, onDragStart }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();
  const pointerDownPos = useRef({ x: 0, y: 0 });

  const angleStep = (Math.PI * 2) / total;

  useFrame(() => {
    if (!meshRef.current) return;

    // 1. Calculate continuous angle based on global scroll
    const rawAngle = (index * angleStep) + scrollOffset.current;

    // Normalize angle cleanly to [-PI, PI]
    const angle = Math.atan2(Math.sin(rawAngle), Math.cos(rawAngle));

    // 2. Coverflow Mathematics (Ellipse path)
    const radiusX = 6;
    const radiusZ = 3.5;

    const targetX = Math.sin(angle) * radiusX;
    // Pushes adjacent items further back. Center item is at z=0.
    const targetZ = Math.cos(angle) * radiusZ - radiusZ;

    // Calculate elegant rotation. Items face slightly inward.
    const maxRotation = Math.PI / 3; // 60 degrees max turn
    const rotationFactor = Math.sin(angle); // 0 at center, 1 at right, 0 at back
    const targetRotY = -rotationFactor * maxRotation;

    // Hover effect (moves up, no scale change)
    const targetY = hovered ? 0.3 : 0;

    // 3. Smooth Interpolation for premium feel
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.1);
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
    if (onDragStart) onDragStart(e);
  };

  const handleClick = (e) => {
    e.stopPropagation();

    const dx = Math.abs(e.clientX - pointerDownPos.current.x);
    const dy = Math.abs(e.clientY - pointerDownPos.current.y);

    if (dx > 5 || dy > 5) return; // Ignore drag

    window.location.href = project.link;
  };

  return (
    <group ref={meshRef}>
      <group
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
      >
        {/* Soft floating shadow plane behind the tile */}
        <mesh position={[0, -0.2, -0.1]}>
          <planeGeometry args={[3.4, 2.4]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.15} />
        </mesh>

        {/* Thin Frame Border */}
        <mesh position={[0, 0, -0.01]} castShadow receiveShadow>
          <planeGeometry args={[3.55, 2.55]} />
          <meshStandardMaterial color={hovered ? '#ed4153' : '#ffffff'} roughness={0.4} />
        </mesh>

        {/* Project Image or Colored Placeholder */}
        {project.image ? (
          <Image url={project.image} scale={[3.5, 2.5]} position={[0, 0, 0]} />
        ) : (
          <mesh position={[0, 0, 0]} castShadow>
            <planeGeometry args={[3.5, 2.5]} />
            <meshStandardMaterial color={project.color} roughness={0.3} metalness={0.1} />
          </mesh>
        )}

        {/* Label */}
        <Text
          position={[0, -1.6, 0.1]}
          fontSize={0.18}
          color="#043b5c"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#faf8f2"
          letterSpacing={0.1}
        >
          {project.title}
        </Text>
      </group>
    </group>
  );
}

export default function ProjectsCarousel() {
  return (
    <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing overflow-hidden">
      <Canvas shadows camera={{ position: [0, 0, 8.5], fov: 45 }}>
        {/* Deep background fog to softly hide items that rotate behind */}
        <fog attach="fog" args={['#faf8f2', 6, 14]} />

        <ambientLight intensity={0.9} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Environment preset="studio" />

        <React.Suspense fallback={null}>
          <CarouselGroup />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
