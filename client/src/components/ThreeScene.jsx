import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, OrbitControls, Environment, Grid, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

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
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.8, 64, 64]} />
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
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[2.6, 2.62, 128]} />
          <meshStandardMaterial color="#ff4041" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
      </Float>

      {/* Thin Orbital Ring 2 */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
          <ringGeometry args={[3, 3.02, 128]} />
          <meshStandardMaterial color="#1a1a1a" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      </Float>

      {/* Floating Side Elements - Left */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={[-5, -2, 1]}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#7A4B3A" transparent opacity={0.1} />
        </mesh>
      </Float>

      {/* Floating Side Elements - Right */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2} position={[6, 1, -1]}>
        <mesh>
          <torusGeometry args={[1, 0.05, 16, 80]} />
          <meshStandardMaterial color="#000000" wireframe transparent opacity={0.08} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2} position={[5, -3, -2]}>
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
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
    // Map mouse [-1, 1] to 3D units
    const targetX = x * 10;
    const targetY = y * 5;
    
    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.1);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.1);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color="#7A4B3A" emissive="#7A4B3A" emissiveIntensity={2} />
    </mesh>
  );
};

const ThreeScene = () => {
  return (
    <div className="absolute inset-0 z-0 cursor-pointer">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
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
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          makeDefault 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default React.memo(ThreeScene);
