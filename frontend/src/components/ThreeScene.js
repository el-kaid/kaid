import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const rendererRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with futuristic gradient background
    const scene = new THREE.Scene();
    
    // Create gradient background
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 512;
    
    const gradient = context.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#0a0a23');  // Deep space blue
    gradient.addColorStop(0.3, '#1a1a3a'); // Dark purple
    gradient.addColorStop(0.7, '#2d1b69'); // Royal purple
    gradient.addColorStop(1, '#0f0f1e');   // Almost black
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 512, 512);
    
    const bgTexture = new THREE.CanvasTexture(canvas);
    scene.background = bgTexture;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);

    // Renderer with enhanced settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: "high-performance",
      alpha: false
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create futuristic holographic cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    
    // Main holographic material
    const hologramMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00ffff,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 0.5,
      ior: 1.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.8,
    });

    const cube = new THREE.Mesh(geometry, hologramMaterial);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // Add wireframe overlay for holographic effect
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6,
      linewidth: 2
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    cube.add(wireframe);

    // Floating platform
    const platformGeometry = new THREE.CylinderGeometry(4, 4, 0.2, 32);
    const platformMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a3a,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -3;
    platform.receiveShadow = true;
    scene.add(platform);

    // Particle system for ambiance
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Advanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404080, 0.3);
    scene.add(ambientLight);

    // Main key light
    const keyLight = new THREE.DirectionalLight(0x00ffff, 1.5);
    keyLight.position.set(5, 10, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    scene.add(keyLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xff00aa, 0.8);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Rim light
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
    rimLight.position.set(0, -5, -10);
    scene.add(rimLight);

    // Point lights for atmosphere
    const pointLight1 = new THREE.PointLight(0x00ffff, 1, 10);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00aa, 0.8, 8);
    pointLight2.position.set(-3, 2, -3);
    scene.add(pointLight2);

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let time = 0;
// Animate
const animate = () => {
  animationRef.current = requestAnimationFrame(animate);
  time += 0.01;

  // Increase spin speed and simplify rotation
  cube.rotation.y += 0.02;

  // Floating animation
  cube.position.y = Math.sin(time * 1.2) * 0.3;

  // Dynamic color shifting
  const hue = (time * 0.5) % 1;
  cube.material.color.setHSL(hue * 0.3 + 0.5, 0.8, 0.6);
  wireframe.material.color.setHSL(hue * 0.3 + 0.5, 1, 0.8);

  // Animate particles
  particles.rotation.y = time * 0.05;
  const positions = particles.geometry.attributes.position.array;
  for (let i = 1; i < positions.length; i += 3) {
    positions[i] = Math.sin(time + positions[i/3]) * 0.5;
  }
  particles.geometry.attributes.position.needsUpdate = true;

  // Animate lights
  pointLight1.intensity = 1 + Math.sin(time * 2) * 0.3;
  pointLight2.intensity = 0.8 + Math.cos(time * 1.5) * 0.2;

  // Camera gentle movement
  camera.position.x = Math.sin(time * 0.3) * 0.5;
  camera.position.y = 2 + Math.cos(time * 0.2) * 0.3;
  camera.lookAt(cube.position);

  renderer.render(scene, camera);
};


    // Start animation and mark as loaded
    animate();
    setIsLoaded(true);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // Safe DOM element removal
      if (rendererRef.current && rendererRef.current.domElement && mountRef.current) {
        try {
          mountRef.current.removeChild(rendererRef.current.domElement);
        } catch (e) {
          console.warn('Element already removed');
        }
      }

      // Dispose of Three.js objects
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      // Clean up geometries and materials
      geometry.dispose();
      hologramMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      platformGeometry.dispose();
      platformMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      bgTexture.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-cyan-400 font-mono text-sm tracking-wider">INITIALIZING HOLOGRAM</p>
          </div>
        </div>
      )}
      
      {/* Three.js mount point */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        style={{ touchAction: 'none' }}
      />
      
      {/* Futuristic overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400 opacity-60"></div>
        <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyan-400 opacity-60"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-400 opacity-60"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400 opacity-60"></div>
        
        {/* Scanning line effect */}
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-40"></div>
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>
      
      {/* Status indicator */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-xs font-mono text-cyan-400">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <span>HOLOGRAM ACTIVE</span>
      </div>
      
      {/* Info panel */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-3 text-xs font-mono text-cyan-400 border border-cyan-400 border-opacity-30">
        <div>NEURAL INTERFACE v2.1</div>
        <div className="opacity-60">QUANTUM RENDERING</div>
      </div>
    </div>
  );
};

export default ThreeScene;