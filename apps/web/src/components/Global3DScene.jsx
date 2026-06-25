import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Stars, Sparkles, MeshDistortMaterial, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// ─── PARTICLE GLOBE (Hero) ───
const ParticleGlobe = () => {
  const pointsRef = useRef();
  const [positions, colors] = useMemo(() => {
    const count = 4000;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const color1 = new THREE.Color('#00e5ff');
    const color2 = new THREE.Color('#b026ff');
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 2.5;
      pos[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      const mixedColor = color1.clone().lerp(color2, (pos[i * 3 + 1] / r + 1) / 2);
      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }
    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.035} vertexColors transparent opacity={0.9} sizeAttenuation={true} blending={THREE.AdditiveBlending} />
      </points>
      <mesh>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshBasicMaterial color="#0a0a14" transparent opacity={0.8} />
      </mesh>
    </Float>
  );
};

// ─── DATA RINGS (Services) ───
const DataRings = ({ position }) => {
  const ring1 = useRef();
  const ring2 = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current && ring2.current) {
      ring1.current.rotation.x = t * 0.2;
      ring1.current.rotation.y = t * 0.3;
      ring2.current.rotation.x = t * -0.15;
      ring2.current.rotation.z = t * 0.25;
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh ref={ring1}>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.6} />
        </mesh>
        <mesh ref={ring2}>
          <torusGeometry args={[4, 0.01, 16, 100]} />
          <meshBasicMaterial color="#b026ff" transparent opacity={0.4} />
        </mesh>
        <Sparkles count={200} scale={10} size={2} speed={0.4} color="#00e5ff" />
      </Float>
    </group>
  );
};

// ─── LIQUID SPHERE (Features / Security) ───
const LiquidSphere = ({ position }) => {
  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh scale={2}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial color="#b026ff" envMapIntensity={1} clearcoat={1} clearcoatRoughness={0} metalness={0.8} roughness={0.2} distort={0.4} speed={2} />
        </mesh>
      </Float>
    </group>
  );
};

// ─── MAIN SCENE ───
const Global3DScene = () => {
  const sceneGroup = useRef();
  const tl = useRef();
  const scrollTarget = useRef(0);
  const currentScroll = useRef(0);

  useLayoutEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    
    // We choreograph the entire group backwards to simulate camera moving forward
    tl.current
      // Move from Hero to Services
      .to(sceneGroup.current.position, { z: 15, x: 5, y: -2, duration: 1 }, 0)
      .to(sceneGroup.current.rotation, { y: Math.PI / 6, duration: 1 }, 0)
      
      // Move to Features
      .to(sceneGroup.current.position, { z: 35, x: -5, y: 3, duration: 1 }, 1)
      .to(sceneGroup.current.rotation, { y: -Math.PI / 8, duration: 1 }, 1)
      
      // Move to Roadmap / deep
      .to(sceneGroup.current.position, { z: 60, x: 0, y: 0, duration: 1 }, 2)
      .to(sceneGroup.current.rotation, { y: Math.PI / 4, duration: 1 }, 2)
      
      // Move to end CTA
      .to(sceneGroup.current.position, { z: 80, x: 0, y: -5, duration: 1 }, 3)
      .to(sceneGroup.current.rotation, { y: 0, duration: 1 }, 3);

  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollTarget.current = maxScroll > 0 ? Math.max(0, Math.min(scrollY / maxScroll, 1)) : 0;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (tl.current) {
      // Smoothly lerp the current scroll position towards the target scroll position
      currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, scrollTarget.current, 4 * delta);
      // Seek the timeline to the exact smoothed position
      tl.current.seek(currentScroll.current * tl.current.duration());
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00e5ff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#b026ff" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <group ref={sceneGroup}>
        {/* Z = 0: Hero Globe */}
        <group position={[3, 0, -2]}>
          <ParticleGlobe />
        </group>
        
        {/* Z = -15: Services Area */}
        <DataRings position={[-6, 2, -20]} />
        
        {/* Z = -35: Features Area */}
        <LiquidSphere position={[6, -2, -40]} />
        
        {/* Z = -60: Roadmap Area */}
        <group position={[-4, 4, -65]}>
           <Float speed={1} rotationIntensity={1} floatIntensity={2}>
              <mesh>
                <octahedronGeometry args={[3, 0]} />
                <meshStandardMaterial color="#00e5ff" wireframe />
              </mesh>
           </Float>
        </group>

        {/* Z = -80: Footer/CTA Area */}
        <group position={[0, 8, -90]}>
           <Sparkles count={500} scale={20} size={3} speed={0.5} color="#b026ff" />
        </group>
      </group>
      
      {/* Global shadow floor */}
      <ContactShadows position={[0, -6, 0]} opacity={0.3} scale={100} blur={2.5} far={20} color="#00e5ff" />
    </>
  );
};

export default Global3DScene;
