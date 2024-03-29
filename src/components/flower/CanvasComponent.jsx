// src/CanvasComponent.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Scene from './Scene';
import './flower.css';

const CanvasComponent = () => {
  return (
    <div id="webgl-container" className="webgl-container">
      <Canvas camera={{ position: [0, 0, 60], fov: 45 }}>
        {/* Your scene component will go here */}
        <Scene />
        {/* Adding orbit controls */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default CanvasComponent;