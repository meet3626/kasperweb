import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

const LiquidBlob = ({ position, color, distort, speed, scale }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.8}
        roughness={0.2}
        distort={distort}
        speed={speed}
      />
    </mesh>
  );
};

export default function Admin3DBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#030610]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00e5ff" />
        <directionalLight position={[-5, -5, -5]} intensity={1} color="#a855f7" />
        
        <LiquidBlob position={[-2, 1, -2]} color="#080c16" distort={0.5} speed={1.2} scale={3} />
        <LiquidBlob position={[2, -1, -3]} color="#0a0f1c" distort={0.4} speed={1} scale={3.5} />
        <LiquidBlob position={[0, 0, -4]} color="#050811" distort={0.6} speed={0.8} scale={4} />
      </Canvas>
    </div>
  );
}
