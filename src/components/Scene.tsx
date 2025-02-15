"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sphere } from "@react-three/drei";
import { inSphere } from "maath/random";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function Stars(props: any) {
  const ref = useRef<any>();
  // Create a Float32Array with 5000 elements (1000 points * 3 coordinates)
  const sphere = new Float32Array(5000);
  // Fill the array with random points
  inSphere(sphere, { radius: 1.5 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function AnimatedSphere() {
  const ref = useRef<any>();

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = Math.sin(t) * 0.1;
      ref.current.rotation.x = Math.sin(t) * 0.2;
      ref.current.rotation.y = Math.sin(t) * 0.2;
    }
  });

  return (
    <Sphere ref={ref} args={[0.2, 64, 64]}>
      <meshPhongMaterial color="#5686F5" />
    </Sphere>
  );
}

export function Scene() {
  return (
    <div className="absolute inset-0 -z-10 mt-20">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <color attach="background" args={["#000817"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <AnimatedSphere />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
