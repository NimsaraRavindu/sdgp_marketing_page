import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLOBE_DATA } from '../constants';

const earthTextureUrl = new URL('../assets/textures/earth_atmos_2048.jpg', import.meta.url).href;

const World: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    while (mount.firstChild) mount.removeChild(mount.firstChild);

    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.8;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      earthTextureUrl,
      undefined,
      undefined,
      () => {
        console.warn('Earth texture failed to load. Falling back to base globe color.');
      }
    );
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(2.6, 64, 64),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: earthTexture,
        emissive: 0x061021,
        emissiveIntensity: 0.14,
        shininess: 28,
        specular: new THREE.Color(0x75e6da),
      })
    );
    globeGroup.add(globe);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.78, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x75e6da,
        transparent: true,
        opacity: 0.14,
        side: THREE.BackSide,
      })
    );
    globeGroup.add(atmosphere);

    const latLngToVector3 = (lat: number, lng: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const createLabelSprite = (text: string, variant: 'city' | 'continent' = 'city') => {
      const canvas = document.createElement('canvas');
      canvas.width = variant === 'continent' ? 220 : 280;
      canvas.height = variant === 'continent' ? 72 : 90;
      const context = canvas.getContext('2d');
      if (!context) return null;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = variant === 'continent' ? 'rgba(7, 18, 38, 0.82)' : 'rgba(16, 22, 34, 0.85)';
      context.strokeStyle = variant === 'continent' ? 'rgba(102, 240, 255, 0.65)' : 'rgba(117, 230, 218, 0.55)';
      context.lineWidth = 2;
      context.beginPath();
      context.roundRect(8, 8, canvas.width - 16, canvas.height - 16, 14);
      context.fill();
      context.stroke();
      context.fillStyle = '#d9f1ee';
      context.font = variant === 'continent' ? '700 24px Inter, sans-serif' : 'bold 30px Inter, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(material);
      if (variant === 'continent') {
        sprite.scale.set(1.24, 0.4, 1);
      } else {
        sprite.scale.set(1.5, 0.48, 1);
      }
      return sprite;
    };

    const continents = [
      { name: 'North America', lat: 45, lng: -102 },
      { name: 'South America', lat: -16, lng: -60 },
      { name: 'Europe', lat: 50, lng: 12 },
      { name: 'Africa', lat: 7, lng: 20 },
      { name: 'Asia', lat: 30, lng: 92 },
      { name: 'Australia', lat: -25, lng: 135 },
    ];

    const markerGeometry = new THREE.SphereGeometry(0.07, 10, 10);
    const points = GLOBE_DATA.slice(0, 10);

    points.forEach((point, index) => {
      const position = latLngToVector3(point.lat, point.lng, 2.65);
      const markerColor = point.type === 'sponsor' ? 0xf4f4f4 : point.type === 'event' ? 0x75e6da : 0x66f0ff;

      const marker = new THREE.Mesh(markerGeometry, new THREE.MeshBasicMaterial({ color: markerColor }));
      marker.position.copy(position);
      globeGroup.add(marker);

      if (index < 6) {
        const label = createLabelSprite(point.name);
        if (label) {
          const labelPosition = position.clone().normalize().multiplyScalar(3.3);
          label.position.copy(labelPosition);
          globeGroup.add(label);
        }
      }
    });

    continents.forEach((continent) => {
      const label = createLabelSprite(continent.name, 'continent');
      if (!label) return;
      const labelPosition = latLngToVector3(continent.lat, continent.lng, 2.95);
      label.position.copy(labelPosition);
      globeGroup.add(label);
    });

    for (let sourceIndex = 0; sourceIndex < points.length; sourceIndex++) {
      for (let targetIndex = sourceIndex + 2; targetIndex < points.length; targetIndex += 3) {
        const source = latLngToVector3(points[sourceIndex].lat, points[sourceIndex].lng, 2.65);
        const target = latLngToVector3(points[targetIndex].lat, points[targetIndex].lng, 2.65);
        const arcPoints: THREE.Vector3[] = [];

        for (let step = 0; step <= 24; step++) {
          const amount = step / 24;
          const point = new THREE.Vector3().lerpVectors(source, target, amount);
          const height = 2.65 + Math.sin(amount * Math.PI) * 0.75;
          point.normalize().multiplyScalar(height);
          arcPoints.push(point);
        }

        const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
        const arcMaterial = new THREE.LineBasicMaterial({ color: 0x66f0ff, transparent: true, opacity: 0.55 });
        const arc = new THREE.Line(arcGeometry, arcMaterial);
        globeGroup.add(arc);
      }
    }

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    const keyLight = new THREE.PointLight(0xffffff, 1.2);
    keyLight.position.set(10, 7, 10);
    scene.add(ambient, keyLight);

    const starCount = 1200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const twinkleOffsets = new Float32Array(starCount);
    const twinkleSpeeds = new Float32Array(starCount);

    for (let index = 0; index < starCount; index++) {
      const offset = index * 3;
      starPositions[offset] = (Math.random() - 0.5) * 120;
      starPositions[offset + 1] = (Math.random() - 0.5) * 120;
      starPositions[offset + 2] = (Math.random() - 0.5) * 120;

      starSizes[index] = 0.9 + Math.random() * 1.6;
      twinkleOffsets[index] = Math.random() * Math.PI * 2;
      twinkleSpeeds[index] = 0.6 + Math.random() * 1.6;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('aSize', new THREE.BufferAttribute(starSizes, 1));
    starGeometry.setAttribute('aTwinkleOffset', new THREE.BufferAttribute(twinkleOffsets, 1));
    starGeometry.setAttribute('aTwinkleSpeed', new THREE.BufferAttribute(twinkleSpeeds, 1));

    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aTwinkleOffset;
        attribute float aTwinkleSpeed;
        varying float vAlpha;

        uniform float uTime;

        void main() {
          float twinkleWave = 0.5 + 0.5 * sin(uTime * aTwinkleSpeed + aTwinkleOffset);
          float twinkle = 0.68 + 0.32 * twinkleWave;
          vAlpha = twinkle;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (0.9 + twinkle * 0.16) * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vAlpha;

        void main() {
          vec2 point = (gl_PointCoord - vec2(0.5)) * 2.0;
          float dist = length(point);

          float core = smoothstep(0.32, 0.0, dist);
          float halo = smoothstep(1.0, 0.0, dist);

          float armX = smoothstep(0.24, 0.0, abs(point.y)) * smoothstep(1.0, 0.0, abs(point.x));
          float armY = smoothstep(0.24, 0.0, abs(point.x)) * smoothstep(1.0, 0.0, abs(point.y));
          float fourPoint = max(armX, armY);

          vec3 color = vec3(0.86, 0.97, 1.0);
          float alpha = (0.18 * halo + 0.55 * fourPoint + 0.62 * core) * vAlpha;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    const resize = () => {
      if (!mount) return;
      const nextWidth = mount.clientWidth;
      const nextHeight = mount.clientHeight;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };
    window.addEventListener('resize', resize);

    let frame = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      globeGroup.rotation.y += 0.0018;
      starField.rotation.y += 0.0002;
      starMaterial.uniforms.uTime.value = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      controls.dispose();
      earthTexture.dispose();
      scene.traverse((object: any) => {
        object.geometry?.dispose?.();
        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach((material: any) => material.dispose?.());
          else object.material.dispose?.();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="lp-world lp-section">
      <div className="lp-container centered">
        <h2>Global Impact Visualization</h2>
        <p>Tracking social change across continents in real-time. Linkara connects local efforts to global goals.</p>
        <div className="lp-world-globe-wrap">
          <div ref={mountRef} className="lp-world-globe" />
        </div>
      </div>
    </section>
  );
};

export default World;
