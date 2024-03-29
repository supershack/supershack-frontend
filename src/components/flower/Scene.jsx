// src/Scene.jsx
import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import shaders from './shaders';
import orbitronBlackTexture from '../../assets/wow1.svg'; // <-- Import texture

// Create a shader material using the shaderMaterial utility
const KineticShaderMaterial = shaderMaterial(
  // Uniforms
  { uTime: 0, uTexture: null },
  // Vertex shader
  shaders.vertexShader,
  // Fragment shader
  shaders.fragmentShader
);

// Extend will make the shader material available as a JSX component
extend({ KineticShaderMaterial });

const Scene = () => {
  const kineticRef = useRef();
  const texture = useLoader(THREE.TextureLoader, orbitronBlackTexture);

  useEffect(() => {
    // Set texture parameters for wrapping and filtering
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
  
    // Update the texture once it's loaded
    kineticRef.current.uniforms.uTexture.value = texture;
  }, [texture]);
  

  // The useFrame hook will run every frame
  useFrame((state) => {
    if (kineticRef.current) {
      const { clock } = state;
      kineticRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <>
      <mesh>
        <torusKnotGeometry args={[9, 3, 768, 3, 4, 3]} />
        <kineticShaderMaterial ref={kineticRef} uTexture={texture} />
      </mesh>
    </>
  );
};

export default Scene;