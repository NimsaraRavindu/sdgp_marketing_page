import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLOBE_DATA } from '../constants';
import { motion } from 'framer-motion';

const World: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    let renderer: THREE.WebGLRenderer;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let controls: OrbitControls;
    let animationFrameId: number;
    const objectsToDispose: any[] = [];

    try {
        // Scene Setup
        scene = new THREE.Scene();
        
        // Camera Setup
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 12;

        // Renderer Setup
        renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(width, height);
        // Limit pixel ratio to prevent context loss on high density screens
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
        mountRef.current.appendChild(renderer.domElement);

        // Controls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.2;

        // Earth Group
        const earthGroup = new THREE.Group();
        scene.add(earthGroup);

        // Earth Geometry & Material
        const geometry = new THREE.SphereGeometry(4, 64, 64);
        const textureLoader = new THREE.TextureLoader();
        
        // Using a reliable high-res earth night map
        const texture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
        
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpScale: 0.1,
            specular: new THREE.Color(0x75E6DA), // Brand Green specularity
            shininess: 5,
        });
        const earth = new THREE.Mesh(geometry, material);
        earthGroup.add(earth);
        objectsToDispose.push(geometry, material, texture);

        // Atmosphere Glow
        const atmosGeometry = new THREE.SphereGeometry(4.1, 64, 64);
        const atmosMaterial = new THREE.MeshBasicMaterial({
            color: 0x75E6DA, // Brand Green/Lighter Blue Glow
            transparent: true,
            opacity: 0.15,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });
        const atmosphere = new THREE.Mesh(atmosGeometry, atmosMaterial);
        earthGroup.add(atmosphere);
        objectsToDispose.push(atmosGeometry, atmosMaterial);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1.5);
        pointLight.position.set(20, 20, 20);
        scene.add(pointLight);

        // Helper: Lat/Lon to Vector3
        const latLngToVector3 = (lat: number, lng: number, radius: number) => {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lng + 180) * (Math.PI / 180);
            const x = -(radius * Math.sin(phi) * Math.cos(theta));
            const z = (radius * Math.sin(phi) * Math.sin(theta));
            const y = (radius * Math.cos(phi));
            return new THREE.Vector3(x, y, z);
        };

        // Add Markers
        GLOBE_DATA.forEach((point) => {
            const position = latLngToVector3(point.lat, point.lng, 4.05);
            
            // Marker color based on type
            let color = 0xFFFFFF;
            if (point.type === 'volunteer') color = 0x75E6DA; // Lighter Blue
            if (point.type === 'sponsor') color = 0xF4F4F4; // Off White
            if (point.type === 'event') color = 0x75E6DA; // Lighter Blue

            const markerGeometry = new THREE.SphereGeometry(0.08, 16, 16);
            const markerMaterial = new THREE.MeshBasicMaterial({ color: color });
            const marker = new THREE.Mesh(markerGeometry, markerMaterial);
            marker.position.copy(position);
            earthGroup.add(marker);
            objectsToDispose.push(markerGeometry, markerMaterial);

            // Add glow to marker
            const glowGeo = new THREE.SphereGeometry(0.15, 16, 16);
            const glowMat = new THREE.MeshBasicMaterial({ 
                color: color, 
                transparent: true, 
                opacity: 0.4,
                blending: THREE.AdditiveBlending
            });
            const glow = new THREE.Mesh(glowGeo, glowMat);
            glow.position.copy(position);
            earthGroup.add(glow);
            objectsToDispose.push(glowGeo, glowMat);
        });

        // Add Connections (Arcs)
        for (let i = 0; i < GLOBE_DATA.length; i++) {
            for (let j = i + 1; j < GLOBE_DATA.length; j += 3) { 
                const p1 = GLOBE_DATA[i];
                const p2 = GLOBE_DATA[j];
                const v1 = latLngToVector3(p1.lat, p1.lng, 4.05);
                const v2 = latLngToVector3(p2.lat, p2.lng, 4.05);

                // Curve points
                const points = [];
                for (let k = 0; k <= 20; k++) {
                    const t = k / 20;
                    const p = new THREE.Vector3().lerpVectors(v1, v2, t);
                    const height = 4.05 + Math.sin(t * Math.PI) * 1.5;
                    p.normalize().multiplyScalar(height);
                    points.push(p);
                }

                const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
                const curveMat = new THREE.LineBasicMaterial({ 
                    color: 0x75E6DA, // Lighter Blue
                    transparent: true, 
                    opacity: 0.15 
                });
                const curve = new THREE.Line(curveGeo, curveMat);
                earthGroup.add(curve);
                objectsToDispose.push(curveGeo, curveMat);
            }
        }

        // Animation Loop
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (controls) controls.update();
            if (renderer && scene && camera) renderer.render(scene, camera);
        };
        animate();

    } catch (e) {
        console.error("Failed to initialize Three.js scene", e);
        setHasError(true);
    }

    // Handle Resize
    const handleResize = () => {
        if (!mountRef.current || !camera || !renderer) return;
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        
        if (renderer) {
            renderer.dispose();
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        }
        // Clean up geometries and materials to prevent memory leaks
        objectsToDispose.forEach(obj => {
            if (obj && typeof obj.dispose === 'function') {
                obj.dispose();
            }
        });
    };
  }, []);

  if (hasError) {
      return null; // Gracefully fail if WebGL crashes
  }

  return (
    <section className="py-20 bg-brand-navy overflow-hidden relative">
      {/* Text Overlay */}
      <div className="absolute top-20 left-0 right-0 z-10 pointer-events-none">
        <motion.div 
            className="container mx-auto px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-brand-baby drop-shadow-lg">
            Global Network
            </h2>
            <p className="text-brand-baby/70 max-w-2xl mx-auto text-lg drop-shadow-md">
            Connecting communities, sponsors, and volunteers across the world in real-time.
            </p>
            <div className="mt-6 flex justify-center space-x-8 text-sm font-medium">
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-brand-green mr-2"></span> Volunteers</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-brand-baby mr-2"></span> Sponsors</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-brand-green mr-2"></span> Events</div>
            </div>
        </motion.div>
      </div>

      {/* 3D Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-[600px] md:h-[700px] cursor-move"
        style={{ background: 'radial-gradient(circle at center, #04445F 0%, #022230 100%)' }}
      />
    </section>
  );
};

export default World;