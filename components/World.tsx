import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLOBE_DATA } from '../constants';

const World: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // Prevent double initialization in React StrictMode/dev
        if (mount.dataset.worldInitialized === 'true') return;
        mount.dataset.worldInitialized = 'true';

        // Clear any previous children (defensive)
        while (mount.firstChild) mount.removeChild(mount.firstChild);

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const width = mount.clientWidth || 800;
        const height = mount.clientHeight || 600;
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 12);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0); // transparent background
        mount.appendChild(renderer.domElement);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;

        // Group
        const earthGroup = new THREE.Group();
        scene.add(earthGroup);

        // Earth geometry + material (with texture load and fallback)
        const earthGeo = new THREE.SphereGeometry(4, 64, 64);
        const textureLoader = new THREE.TextureLoader();
        const textureUrl = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg';
        let earthMesh: THREE.Mesh | null = null;

        // Fallback material (in case texture fails)
        const fallbackMat = new THREE.MeshPhongMaterial({ color: 0x111111, shininess: 4 });

        // Try load texture
        textureLoader.load(
            textureUrl,
            (tex) => {
                try {
                    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
                } catch (e) {
                    // ignore if capability unavailable
                }
                const earthMat = new THREE.MeshPhongMaterial({ map: tex, specular: new THREE.Color(0x75E6DA), shininess: 5 });
                earthMesh = new THREE.Mesh(earthGeo, earthMat);
                earthGroup.add(earthMesh);
            },
            undefined,
            (err) => {
                console.warn('Earth texture failed to load, using fallback material', err);
                earthMesh = new THREE.Mesh(earthGeo, fallbackMat as any);
                earthGroup.add(earthMesh);
            }
        );

        // Atmosphere
        const atmosGeo = new THREE.SphereGeometry(4.08, 64, 64);
        const atmosMat = new THREE.MeshBasicMaterial({ color: 0x75E6DA, transparent: true, opacity: 0.12, side: THREE.BackSide, blending: THREE.AdditiveBlending });
        const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
        earthGroup.add(atmosphere);

        // Lights
        const ambient = new THREE.AmbientLight(0xffffff, 0.25);
        scene.add(ambient);
        const sun = new THREE.PointLight(0xffffff, 1.2);
        sun.position.set(20, 10, 20);
        scene.add(sun);

        // Helper: lat/lng -> Vector3
        const latLngToVector3 = (lat: number, lng: number, radius: number) => {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lng + 180) * (Math.PI / 180);
            const x = -(radius * Math.sin(phi) * Math.cos(theta));
            const z = (radius * Math.sin(phi) * Math.sin(theta));
            const y = radius * Math.cos(phi);
            return new THREE.Vector3(x, y, z);
        };

        // Markers
        const markerGeo = new THREE.SphereGeometry(0.08, 12, 12);
        GLOBE_DATA.forEach((p) => {
            const pos = latLngToVector3(p.lat, p.lng, 4.05);
            let color = 0x75E6DA; // default
            if (p.type === 'sponsor') color = 0xF4F4F4;
            const mat = new THREE.MeshBasicMaterial({ color });
            const m = new THREE.Mesh(markerGeo, mat);
            m.position.copy(pos);
            earthGroup.add(m);

            const glow = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending }));
            glow.position.copy(pos);
            earthGroup.add(glow);
        });

        // Optional: add simple connection arcs (kept light)
        for (let i = 0; i < GLOBE_DATA.length; i++) {
            for (let j = i + 1; j < GLOBE_DATA.length; j += 4) {
                const p1 = GLOBE_DATA[i];
                const p2 = GLOBE_DATA[j];
                const v1 = latLngToVector3(p1.lat, p1.lng, 4.05);
                const v2 = latLngToVector3(p2.lat, p2.lng, 4.05);
                const points: THREE.Vector3[] = [];
                for (let k = 0; k <= 20; k++) {
                    const t = k / 20;
                    const p = new THREE.Vector3().lerpVectors(v1, v2, t);
                    const h = 4.05 + Math.sin(t * Math.PI) * 1.0;
                    p.normalize().multiplyScalar(h);
                    points.push(p);
                }
                const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
                const curveMat = new THREE.LineBasicMaterial({ color: 0x75E6DA, transparent: true, opacity: 0.12 });
                const line = new THREE.Line(curveGeo, curveMat);
                earthGroup.add(line);
            }
        }

        // Resize handling
        const handleResize = () => {
            if (!mount) return;
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        // Animation loop
        let last = performance.now();
        renderer.setAnimationLoop(() => {
            const now = performance.now();
            const delta = (now - last) / 1000;
            last = now;

            // slight manual slow rotation to ensure visible motion even if autoRotate suppressed
            earthGroup.rotation.y += delta * 0.04;

            controls.update();
            renderer.render(scene, camera);
        });

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            try { renderer.setAnimationLoop(null as any); } catch (e) {}
            try { controls.dispose(); } catch (e) {}
            // dispose textures/materials/geometries
            scene.traverse((obj: any) => {
                if (obj.isMesh) {
                    if (obj.geometry) obj.geometry.dispose();
                    if (obj.material) {
                        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose && m.dispose());
                        else obj.material.dispose && obj.material.dispose();
                    }
                }
            });
            if (renderer && renderer.domElement && mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            delete mount.dataset.worldInitialized;
        };
    }, []);

    return (
        <section className="py-20 bg-brand-navy overflow-hidden relative">
            <div className="absolute top-20 left-0 right-0 z-10 pointer-events-none">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-brand-baby drop-shadow-lg">Global Network</h2>
                    <p className="text-brand-baby/70 max-w-2xl mx-auto text-lg drop-shadow-md">Connecting communities, sponsors, and volunteers across the world in real-time.</p>

                    {/* Legend: show what each dot means */}
                    <div className="mt-6 flex justify-center items-center space-x-8 text-sm font-medium pointer-events-auto">
                        <div className="flex items-center text-brand-baby">
                            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ background: '#75E6DA' }} />
                            <span>Volunteers</span>
                        </div>
                        <div className="flex items-center text-brand-baby">
                            <span className="inline-block w-3 h-3 rounded-full mr-2 border" style={{ background: '#F4F4F4', borderColor: 'rgba(0,0,0,0.12)' }} />
                            <span>Sponsors</span>
                        </div>
                        <div className="flex items-center text-brand-baby">
                            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ background: '#75E6DA' }} />
                            <span>Events</span>
                        </div>
                    </div>
                </div>
            </div>

            <div ref={mountRef} className="w-full h-[600px] md:h-[700px] cursor-move" style={{ background: 'radial-gradient(circle at center, #04445F 0%, #022230 100%)' }} />
        </section>
    );
};

export default World;