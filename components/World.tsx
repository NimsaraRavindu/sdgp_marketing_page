import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLOBE_DATA } from '../constants';

const World: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        if (mount.dataset.worldInitialized === 'true') return;
        mount.dataset.worldInitialized = 'true';

        while (mount.firstChild) mount.removeChild(mount.firstChild);

        const scene = new THREE.Scene();
        const width = mount.clientWidth || 800;
        const height = mount.clientHeight || 600;
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 12);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);
        // ensure canvas accepts pointer events and shows a grab cursor
        renderer.domElement.style.touchAction = 'none';
        renderer.domElement.style.cursor = 'grab';
        const onPointerDown = () => { renderer.domElement.style.cursor = 'grabbing'; };
        const onPointerUp = () => { renderer.domElement.style.cursor = 'grab'; };
        renderer.domElement.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointerup', onPointerUp);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.enableZoom = false;
        controls.enableRotate = true;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;
        controls.rotateSpeed = 0.8;

        const earthGroup = new THREE.Group();
        scene.add(earthGroup);

        const earthGeo = new THREE.SphereGeometry(4, 64, 64);
        const textureLoader = new THREE.TextureLoader();
        const textureUrl = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg';
        let earthMesh: THREE.Mesh | null = null;

        const fallbackMat = new THREE.MeshPhongMaterial({ color: 0x111111, shininess: 4 });

        textureLoader.load(
            textureUrl,
            (tex) => {
                try { tex.anisotropy = renderer.capabilities.getMaxAnisotropy(); } catch (e) {}
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

        const atmosGeo = new THREE.SphereGeometry(4.08, 64, 64);
        const atmosMat = new THREE.MeshBasicMaterial({ color: 0x75E6DA, transparent: true, opacity: 0.12, side: THREE.BackSide, blending: THREE.AdditiveBlending });
        const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
        earthGroup.add(atmosphere);

        const ambient = new THREE.AmbientLight(0xffffff, 0.25);
        scene.add(ambient);
        const sun = new THREE.PointLight(0xffffff, 1.2);
        sun.position.set(20, 10, 20);
        scene.add(sun);

        const latLngToVector3 = (lat: number, lng: number, radius: number) => {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lng + 180) * (Math.PI / 180);
            const x = -(radius * Math.sin(phi) * Math.cos(theta));
            const z = (radius * Math.sin(phi) * Math.sin(theta));
            const y = radius * Math.cos(phi);
            return new THREE.Vector3(x, y, z);
        };
        
        // Realistic starfield: grouped Points using a soft circular canvas texture
        const starCanvas = document.createElement('canvas');
        starCanvas.width = 64;
        starCanvas.height = 64;
        const sc = starCanvas.getContext('2d');
        if (sc) {
            const grd = sc.createRadialGradient(32, 32, 1, 32, 32, 32);
            grd.addColorStop(0, 'rgba(255,255,255,1)');
            grd.addColorStop(0.2, 'rgba(255,255,255,0.95)');
            grd.addColorStop(0.45, 'rgba(200,220,255,0.55)');
            grd.addColorStop(1, 'rgba(0,0,0,0)');
            sc.clearRect(0, 0, 64, 64);
            sc.fillStyle = grd;
            sc.fillRect(0, 0, 64, 64);
        }
        const starTexture = new THREE.CanvasTexture(starCanvas);
        starTexture.needsUpdate = true;

        const totalStars = 900;
        const positionsArr: number[] = [];
        for (let i = 0; i < totalStars; i++) {
            const r = 20 + Math.random() * 60;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            positionsArr.push(x, y, z);
        }

        // Split into groups so we can vary size/opacity per-group for a natural look
        const groups = [
            { count: Math.floor(totalStars * 0.7), size: 0.6, opacity: 0.22 },
            { count: Math.floor(totalStars * 0.25), size: 1.2, opacity: 0.45 },
            { count: totalStars - Math.floor(totalStars * 0.7) - Math.floor(totalStars * 0.25), size: 2.4, opacity: 0.9 },
        ];

        let posIndex = 0;
        const starGroups: Array<any> = [];
        for (let gi = 0; gi < groups.length; gi++) {
            const group = groups[gi];
            const geom = new THREE.BufferGeometry();
            const arr = new Float32Array(group.count * 3);
            const cols = new Float32Array(group.count * 3);
            for (let i = 0; i < group.count; i++) {
                const src = (posIndex % totalStars) * 3;
                arr[i * 3] = positionsArr[src];
                arr[i * 3 + 1] = positionsArr[src + 1];
                arr[i * 3 + 2] = positionsArr[src + 2];

                // subtle color variation (slightly warm/cool mix)
                const v = 0.85 + Math.random() * 0.3;
                cols[i * 3] = v;
                cols[i * 3 + 1] = v;
                cols[i * 3 + 2] = v;

                posIndex++;
            }
            geom.setAttribute('position', new THREE.BufferAttribute(arr, 3));
            geom.setAttribute('color', new THREE.BufferAttribute(cols, 3));

            const mat = new THREE.PointsMaterial({
                size: group.size,
                map: starTexture,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true,
                sizeAttenuation: true,
                opacity: group.opacity,
            });

            const points = new THREE.Points(geom, mat);
            scene.add(points);
            starGroups.push({ points, speed: 0.2 + Math.random() * 0.8, phase: Math.random() * Math.PI * 2, baseOpacity: group.opacity, amp: 0.12 + Math.random() * 0.15, baseSize: group.size });
        }

        const markerGeo = new THREE.SphereGeometry(0.08, 12, 12);
        GLOBE_DATA.forEach((p) => {
            const pos = latLngToVector3(p.lat, p.lng, 4.05);
            let color = 0x75E6DA;
            if (p.type === 'sponsor') color = 0xF4F4F4;
            const mat = new THREE.MeshBasicMaterial({ color });
            const m = new THREE.Mesh(markerGeo, mat);
            m.position.copy(pos);
            earthGroup.add(m);

            const glow = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending }));
            glow.position.copy(pos);
            earthGroup.add(glow);
        });

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
                const arcColor = 0x66f0ff;
                const curveMat = new THREE.LineBasicMaterial({ color: arcColor, transparent: true, opacity: 0.6 });
                const line = new THREE.Line(curveGeo, curveMat);
                earthGroup.add(line);

                // subtle tube halo to make arcs read thicker and more prominent
                try {
                    const curve = new THREE.CatmullRomCurve3(points);
                    const tubeGeo = new THREE.TubeGeometry(curve, Math.max(12, points.length * 2), 0.015, 6, false);
                    const tubeMat = new THREE.MeshBasicMaterial({ color: arcColor, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false });
                    const tube = new THREE.Mesh(tubeGeo, tubeMat);
                    earthGroup.add(tube);
                } catch (e) {
                    // fall back silently if TubeGeometry fails on some platforms
                }
            }
        }

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

        let last = performance.now();
        renderer.setAnimationLoop(() => {
            const now = performance.now();
            const t = now / 1000;
            const delta = (now - last) / 1000;
            last = now;

            earthGroup.rotation.y += delta * 0.04;

            // animate subtle twinkle across star groups
            try {
                for (let i = 0; i < starGroups.length; i++) {
                    const sg = starGroups[i];
                    const o = sg.baseOpacity + Math.sin(t * sg.speed + sg.phase) * sg.amp;
                    const mat = sg.points.material as THREE.PointsMaterial;
                    mat.opacity = Math.max(0, Math.min(1, o));
                    // slight pulsation in size (use baseSize to avoid drift)
                    mat.size = Math.max(0.1, sg.baseSize * (1 + 0.12 * Math.sin(t * sg.speed * 1.5 + sg.phase)));
                }
            } catch (e) {}

            controls.update();
            renderer.render(scene, camera);
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            try { renderer.domElement.removeEventListener('pointerdown', onPointerDown); } catch (e) {}
            try { window.removeEventListener('pointerup', onPointerUp); } catch (e) {}
            try { renderer.setAnimationLoop(null as any); } catch (e) {}
            try { controls.dispose(); } catch (e) {}
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
        <section className="py-20 bg-brand-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-brand-navy">Global Network</h2>
                    <p className="text-brand-navy/80 max-w-2xl mx-auto text-lg">Connecting communities, sponsors, and volunteers across the world in real-time.</p>

                    <div className="mt-6 mb-8 flex justify-center items-center space-x-10 text-sm font-medium">
                        <div className="flex items-center text-brand-navy">
                            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ background: '#75E6DA' }} />
                            <span>Volunteers</span>
                        </div>
                        <div className="flex items-center text-brand-navy">
                            <span className="inline-block w-3 h-3 rounded-full mr-2 border" style={{ background: '#F4F4F4', borderColor: 'rgba(0,0,0,0.12)' }} />
                            <span>Sponsors</span>
                        </div>
                        <div className="flex items-center text-brand-navy">
                            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ background: '#75E6DA' }} />
                            <span>Events</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="w-full h-[500px] md:h-[600px] cursor-move rounded-2xl border shadow-2xl overflow-hidden relative" style={{ background: 'radial-gradient(ellipse at center, #071226 0%, #02040a 45%, #000000 100%)', borderColor: 'rgba(102, 192, 255, 0.06)' }}>
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(102,192,255,0.04), transparent 10%), radial-gradient(circle at 70% 70%, rgba(102,160,255,0.02), transparent 18%)' }} />

                        <div className="absolute top-4 left-4 flex items-center space-x-3 z-10">
                            <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
                            <span className="text-sm font-medium text-white">Interactive Globe</span>
                        </div>

                        <div ref={mountRef} className="w-full h-full rounded-xl relative" style={{ zIndex: 1 }} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default World;