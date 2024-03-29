import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Scene from './Scene';
import './flower.css';

const CanvasComponent = () => {
  // Set the initial camera distance
  const [cameraZPosition, setCameraZPosition] = useState(100);

  useEffect(() => {
    // Function to calculate camera position
    const calculateCameraPosition = () => {
      const width = window.innerWidth;
      // Example formula: decrease camera position as screen width gets smaller
      // Adjust the constants 1200 and 100 to fit the scale of your scene
      const cameraPosition = Math.max(75, (1200 / width) * 45);
      setCameraZPosition(cameraPosition);
    };

    // Calculate camera position on mount and when resizing the window
    calculateCameraPosition();
    window.addEventListener('resize', calculateCameraPosition);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', calculateCameraPosition);
    };
  }, []);

  return (
    <div id="webgl-container" className="webgl-container">
      <Canvas camera={{ position: [0, 0, cameraZPosition], fov: 45 }}>
        <Scene />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default CanvasComponent;
