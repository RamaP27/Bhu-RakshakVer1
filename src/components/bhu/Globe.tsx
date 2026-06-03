import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";

const EARTH_TEXTURE =
  "https://unpkg.com/three-globe@2.31.1/example/img/earth-dark.jpg";

type Marker = {
  name: string;
  lat: number;
  lon: number;
  stat: string;
};

const MARKERS: Marker[] = [
  { name: "Punjab, India", lat: 30.9, lon: 75.85, stat: "40% water saved" },
  { name: "Andhra Pradesh, India", lat: 15.9, lon: 79.74, stat: "32% yield uplift" },
  { name: "Midwest Corn Belt, USA", lat: 41.5, lon: -93.6, stat: "1.2B liters conserved" },
  { name: "Cerrado, Brazil", lat: -15.6, lon: -47.9, stat: "28% irrigation cut" },
  { name: "Sub-Saharan Africa", lat: -1.3, lon: 36.8, stat: "3x crop resilience" },
  { name: "North China Plain", lat: 36.0, lon: 116.5, stat: "Real-time monitoring" },
];

function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function Earth({ children }: { children?: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null!);
  const texture = useLoader(THREE.TextureLoader, EARTH_TEXTURE);
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.002;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} metalness={0.1} roughness={0.85} />
      </mesh>
      {/* atmospheric glow */}
      <mesh scale={1.12}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
          uniforms={{ glowColor: { value: new THREE.Color("#00f5d4") } }}
          vertexShader={`
            varying vec3 vNormal;
            void main(){
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            uniform vec3 glowColor;
            void main(){
              float intensity = pow(0.65 - dot(vNormal, vec3(0.0,0.0,1.0)), 2.0);
              gl_FragColor = vec4(glowColor, 1.0) * intensity;
            }
          `}
        />
      </mesh>
      {children}
    </group>
  );
}

function MarkerPin({ marker, onHover }: { marker: Marker; onHover: (m: Marker | null, p?: THREE.Vector3) => void }) {
  const pos = useMemo(() => latLonToVec3(marker.lat, marker.lon, 1.01), [marker]);
  const ringRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = (clock.getElapsedTime() % 2) / 2;
      ringRef.current.scale.setScalar(1 + t * 3);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 1 - t;
    }
  });
  const up = pos.clone().normalize();
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), up);
  return (
    <group position={pos} quaternion={quat}
      onPointerOver={(e) => { e.stopPropagation(); onHover(marker, pos); }}
      onPointerOut={() => onHover(null)}
    >
      <mesh>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshBasicMaterial color="#00f5d4" />
      </mesh>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.025, 0.035, 32]} />
        <meshBasicMaterial color="#00f5d4" transparent opacity={1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Arc({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const geometry = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5);
    const dist = from.distanceTo(to);
    mid.normalize().multiplyScalar(1 + dist * 0.4);
    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
  }, [from, to]);
  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color="#00f5d4" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
    </line>
  );
}

function Drone({ radius, speed, tilt, phase }: { radius: number; speed: number; tilt: number; phase: number }) {
  const ref = useRef<THREE.Group>(null!);
  const trailRef = useRef<THREE.Points>(null!);
  const trailPositions = useMemo(() => new Float32Array(60 * 3), []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + phase;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const y = Math.sin(t * 0.5) * 0.2 + tilt;
    if (ref.current) {
      ref.current.position.set(x, y, z);
      ref.current.rotation.y = -t + Math.PI / 2;
      ref.current.rotation.z = Math.sin(t) * 0.2;
    }
    // shift trail
    for (let i = trailPositions.length - 3; i >= 3; i -= 3) {
      trailPositions[i] = trailPositions[i - 3];
      trailPositions[i + 1] = trailPositions[i - 2];
      trailPositions[i + 2] = trailPositions[i - 1];
    }
    trailPositions[0] = x; trailPositions[1] = y; trailPositions[2] = z;
    if (trailRef.current) {
      trailRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  return (
    <>
      <group ref={ref}>
        <mesh>
          <boxGeometry args={[0.08, 0.015, 0.08]} />
          <meshStandardMaterial color="#e8f5e9" emissive="#00f5d4" emissiveIntensity={0.6} />
        </mesh>
        {[[-0.06,0,-0.06],[0.06,0,-0.06],[-0.06,0,0.06],[0.06,0,0.06]].map((p,i)=>(
          <mesh key={i} position={p as [number,number,number]}>
            <cylinderGeometry args={[0.025,0.025,0.005,8]} />
            <meshBasicMaterial color="#00f5d4" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[trailPositions, 3]} count={60} />
        </bufferGeometry>
        <pointsMaterial color="#00f5d4" size={0.025} transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </>
  );
}

function DataParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 200;
  const { positions, colors, speeds, origins } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const origins = new Float32Array(count * 3);
    const cGreen = new THREE.Color("#00f5d4");
    const cAmber = new THREE.Color("#c97d2e");
    for (let i = 0; i < count; i++) {
      const m = MARKERS[i % MARKERS.length];
      const o = latLonToVec3(m.lat, m.lon, 1.02);
      origins[i*3] = o.x; origins[i*3+1] = o.y; origins[i*3+2] = o.z;
      positions[i*3] = o.x; positions[i*3+1] = o.y; positions[i*3+2] = o.z;
      const c = Math.random() > 0.5 ? cGreen : cAmber;
      colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b;
      speeds[i] = 0.003 + Math.random()*0.008;
    }
    return { positions, colors, speeds, origins };
  }, []);
  const cloud = new THREE.Vector3(0, 2.2, 0);
  useFrame(() => {
    const pos = ref.current?.geometry.attributes.position.array as Float32Array;
    if (!pos) return;
    for (let i = 0; i < count; i++) {
      const ix = i*3;
      const dx = cloud.x - pos[ix], dy = cloud.y - pos[ix+1], dz = cloud.z - pos[ix+2];
      const d = Math.sqrt(dx*dx+dy*dy+dz*dz);
      if (d < 0.1) {
        pos[ix]=origins[ix]; pos[ix+1]=origins[ix+1]; pos[ix+2]=origins[ix+2];
      } else {
        pos[ix]+=dx/d*speeds[i]; pos[ix+1]+=dy/d*speeds[i]; pos[ix+2]+=dz/d*speeds[i];
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function Scene({ allowDrag }: { allowDrag: boolean }) {
  const [hovered, setHovered] = useState<{ m: Marker; p: THREE.Vector3 } | null>(null);

  const arcs = useMemo(() => {
    const pts = MARKERS.map(m => latLonToVec3(m.lat, m.lon, 1.01));
    const out: Array<[THREE.Vector3, THREE.Vector3]> = [];
    for (let i = 0; i < pts.length; i++) {
      out.push([pts[i], pts[(i+1) % pts.length]]);
    }
    return out;
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} color="#e8f5e9" />
      <directionalLight position={[-5, -2, -3]} intensity={0.3} color="#00f5d4" />
      <Stars radius={50} depth={50} count={1500} factor={3} fade speed={0.5} />

      <Earth>
        {MARKERS.map((m) => (
          <MarkerPin key={m.name} marker={m} onHover={(mk, p) => setHovered(mk && p ? { m: mk, p } : null)} />
        ))}
        {arcs.map(([a,b], i) => <Arc key={i} from={a} to={b} />)}
      </Earth>

      <DataParticles />

      {/* cloud hub */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#00f5d4" transparent opacity={0.4} />
      </mesh>

      <Drone radius={1.5} speed={0.4} tilt={0.3} phase={0} />
      <Drone radius={1.7} speed={-0.3} tilt={-0.2} phase={2} />
      <Drone radius={1.9} speed={0.25} tilt={0.6} phase={4} />

      {hovered && (
        <Html position={hovered.p} center distanceFactor={3} style={{ pointerEvents: "none" }}>
          <div className="rounded-lg border border-[color:var(--cyan)]/60 bg-[color:var(--midnight)]/90 px-3 py-2 font-mono-tech text-[10px] text-cyan-glow shadow-[0_0_20px_rgba(0,245,212,0.4)] whitespace-nowrap">
            <div className="text-[9px] tracking-[0.2em] opacity-70">BHU-RAKSHAK ACTIVE ZONE</div>
            <div className="mt-1 text-xs text-[color:var(--soft-white)]">{hovered.m.name}</div>
            <div className="mt-1 text-[color:var(--amber)]">{hovered.m.stat}</div>
          </div>
        </Html>
      )}

      <OrbitControls enabled={allowDrag} enablePan={false} enableZoom={false} rotateSpeed={0.5} />
    </>
  );
}

export function Globe({ allowDrag = true }: { allowDrag?: boolean }) {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    setTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene allowDrag={allowDrag && !touch} />
      </Suspense>
    </Canvas>
  );
}