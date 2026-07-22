import React, { useRef, Suspense, useCallback, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, OrbitControls, Grid, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Memoize geometries outside component to avoid recreation
const sphereGeom = new THREE.SphereGeometry(1.8, 32, 32);
const ring1Geom = new THREE.RingGeometry(2.6, 2.62, 64);
const ring2Geom = new THREE.RingGeometry(3, 3.02, 64);
const smallSphere1Geom = new THREE.SphereGeometry(0.5, 16, 16);
const torusGeom = new THREE.TorusGeometry(1, 0.05, 8, 40);
const smallSphere2Geom = new THREE.SphereGeometry(0.4, 16, 16);
const cursorGeom = new THREE.SphereGeometry(0.05, 8, 8);

const ArchitecturalForm = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 8;
      meshRef.current.rotation.y = Math.sin(t / 4) / 8 + t * 0.1;
      meshRef.current.rotation.z = Math.sin(t / 4) / 20;
      meshRef.current.position.y = Math.sin(t / 1.5) / 10;
    }
  });

  return (
    <group>
      {/* Main Sphere Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} geometry={sphereGeom}>
          <MeshWobbleMaterial 
            color="#7A4B3A" 
            factor={0.1} 
            speed={1} 
            roughness={0} 
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      {/* Thin Orbital Ring 1 */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh rotation={[Math.PI / 3, 0, 0]} geometry={ring1Geom}>
          <meshStandardMaterial color="#ff4041" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
      </Float>

      {/* Thin Orbital Ring 2 */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]} geometry={ring2Geom}>
          <meshStandardMaterial color="#1a1a1a" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      </Float>

      {/* Floating Side Elements - Left */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={[-5, -2, 1]}>
        <mesh geometry={smallSphere1Geom}>
          <meshStandardMaterial color="#7A4B3A" transparent opacity={0.1} />
        </mesh>
      </Float>

      {/* Floating Side Elements - Right */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2} position={[6, 1, -1]}>
        <mesh geometry={torusGeom}>
          <meshStandardMaterial color="#000000" wireframe transparent opacity={0.08} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2} position={[5, -3, -2]}>
        <mesh geometry={smallSphere2Geom}>
          <meshStandardMaterial color="#7A4B3A" transparent opacity={0.1} />
        </mesh>
      </Float>
    </group>
  );
};

const Cursor3D = () => {
  const ref = useRef();
  
  useFrame((state) => {
    const { x, y } = state.mouse;
    const targetX = x * 10;
    const targetY = y * 5;
    
    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.1);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.1);
    }
  });

  return (
    <mesh ref={ref} geometry={cursorGeom}>
      <meshStandardMaterial color="#7A4B3A" emissive="#7A4B3A" emissiveIntensity={2} />
    </mesh>
  );
};

const ThreeScene = ({ onReady }) => {
  const containerRef = useRef();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleCreated = useCallback(() => {
    if (onReady) onReady();
  }, [onReady]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 cursor-pointer">
      {isVisible && (
        <Canvas 
          dpr={[1, 1.5]} 
          camera={{ position: [0, 0, 8], fov: 45 }} 
          gl={{ alpha: true }} 
          onCreated={handleCreated}
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C5A059" />
            
            <ArchitecturalForm />
            <Cursor3D />
            
            <Grid 
              infiniteGrid 
              fadeDistance={45} 
              fadeStrength={5} 
              cellSize={1} 
              sectionSize={5} 
              sectionColor="#7A4B3A" 
              sectionThickness={1.5}
              cellColor="#1a1a1a"
              cellThickness={0.5}
              position={[0, -4.01, 0]}
            />        
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              makeDefault 
              minPolarAngle={Math.PI / 3} 
              maxPolarAngle={Math.PI / 1.5}
            />
            <Environment files="/hdri/city.hdr" />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default React.memo(ThreeScene);
