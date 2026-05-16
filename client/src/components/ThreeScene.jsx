import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, invalidate } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, Environment, Grid, PerspectiveCamera } from '@react-three/drei';
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

  // Memoize geometries to prevent re-creation
  const sphereArgs = useMemo(() => [1.8, 32, 32], []);
  const ring1Args = useMemo(() => [2.6, 2.62, 64], []);
  const ring2Args = useMemo(() => [3, 3.02, 64], []);
  const smallSphere1Args = useMemo(() => [0.5, 16, 16], []);
  const torusArgs = useMemo(() => [1, 0.05, 8, 40], []);
  const smallSphere2Args = useMemo(() => [0.4, 16, 16], []);

  return (
    <group>
      {/* Main Sphere Core */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh ref={meshRef}>
          <sphereGeometry args={sphereArgs} />
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
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={ring1Args} />
          <meshStandardMaterial color="#ff4041" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
      </Float>

      {/* Thin Orbital Ring 2 */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
          <ringGeometry args={ring2Args} />
          <meshStandardMaterial color="#1a1a1a" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      </Float>

      {/* Floating Side Elements - Left */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} position={[-5, -2, 1]}>
        <mesh>
          <sphereGeometry args={smallSphere1Args} />
          <meshStandardMaterial color="#7A4B3A" transparent opacity={0.1} />
        </mesh>
      </Float>

      {/* Floating Side Elements - Right */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8} position={[6, 1, -1]}>
        <mesh>
          <torusGeometry args={torusArgs} />
          <meshStandardMaterial color="#000000" wireframe transparent opacity={0.08} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2} position={[5, -3, -2]}>
        <mesh>
          <sphereGeometry args={smallSphere2Args} />
          <meshStandardMaterial color="#7A4B3A" transparent opacity={0.1} />
        </mesh>
      </Float>
    </group>
  );
};

const ThreeScene = () => {
  return (
    <div className="absolute inset-0 z-0 cursor-pointer">
      <Canvas 
        dpr={[1, 1.5]} 
        gl={{ 
          alpha: true, 
          antialias: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C5A059" />
        
        <ArchitecturalForm />
        
        <Grid 
          infiniteGrid 
          fadeDistance={30} 
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
      </Canvas>
    </div>
  );
};

export default React.memo(ThreeScene);
