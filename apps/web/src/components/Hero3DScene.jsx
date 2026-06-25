import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

const ParticleGlobe = () => {
  const pointsRef = useRef();

  // Create a sphere of particles
  const [positions, colors] = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    
    const color1 = new THREE.Color('#00e5ff'); // Cyan
    const color2 = new THREE.Color('#b026ff'); // Purple
    
    for (let i = 0; i < count; i++) {
      // Generate points uniformly on a sphere using Fibonacci lattice
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      const r = 2.2; // radius
      pos[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      // Mix colors based on height (y-axis)
      const mixedColor = color1.clone().lerp(color2, (pos[i * 3 + 1] / r + 1) / 2);
      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }
    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Inner dark core to hide particles on the other side slightly */}
      <mesh>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial color="#0a0a10" transparent opacity={0.6} />
      </mesh>
    </Float>
  );
};

const OrbitalRings = () => {
  const ring1 = useRef();
  const ring2 = useRef();
  
  useFrame((state) => {
    if (ring1.current && ring2.current) {
      ring1.current.rotation.x = state.clock.elapsedTime * 0.2;
      ring1.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      ring2.current.rotation.x = state.clock.elapsedTime * -0.15;
      ring2.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[2.8, 0.005, 16, 100]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[3.2, 0.005, 16, 100]} />
        <meshBasicMaterial color="#b026ff" transparent opacity={0.4} />
      </mesh>
    </>
  );
};

const MouseTrail = () => {
  const { viewport } = useThree();
  const ref = useRef();
  const [target] = React.useState(() => new THREE.Vector3());

  useFrame((state) => {
    // Map mouse coordinates to 3D space
    target.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      0
    );
    if (ref.current) {
      ref.current.position.lerp(target, 0.15); // Smooth following
    }
  });

  return (
    <Trail
      width={0.5}
      color={new THREE.Color('#00e5ff')}
      length={20}
      decay={1}
      local={false}
      stride={0}
      interval={1}
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} />
      </mesh>
    </Trail>
  );
};

const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ParticleGlobe />
          <OrbitalRings />
          <MouseTrail />
          <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={15} blur={2.5} far={5} color="#000000" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
