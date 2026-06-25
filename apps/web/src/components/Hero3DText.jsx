import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveText = ({ text1, text2, text3 }) => {
  const groupRef = useRef();
  const { viewport } = useThree();
  const targetRotation = useRef(new THREE.Vector2());

  useFrame((state) => {
    // Parallax effect based on mouse
    targetRotation.current.x = (state.mouse.y * viewport.height) / 15;
    targetRotation.current.y = (state.mouse.x * viewport.width) / 15;
    
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.current.x, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.current.y, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Line 1 */}
        <Text
          position={[-viewport.width / 4, 1.2, 0]}
          fontSize={0.8}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          fontWeight={800}
          letterSpacing={-0.02}
        >
          {text1}
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
        </Text>

        {/* Line 2 */}
        <Text
          position={[-viewport.width / 4, 0, 0]}
          fontSize={0.8}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          fontWeight={800}
          letterSpacing={-0.02}
        >
          {text2}
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
        </Text>

        {/* Line 3 (Highlighted word) */}
        <Text
          position={[-viewport.width / 4 + 3.8, 0, 0.2]}
          fontSize={0.85}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
          color="#00e5ff"
          anchorX="left"
          anchorY="middle"
          fontWeight={300}
          fontStyle="italic"
          letterSpacing={-0.02}
        >
          {text3}
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.5} metalness={0.8} roughness={0.1} />
        </Text>
      </Float>
    </group>
  );
};

export default function Hero3DText({ text1, text2, text3 }) {
  return (
    <div className="w-full h-[250px] md:h-[300px] lg:h-[350px] cursor-default pointer-events-auto relative z-20">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <React.Suspense fallback={null}>
          <InteractiveText text1={text1} text2={text2} text3={text3} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
