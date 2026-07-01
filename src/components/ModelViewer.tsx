"use client";

import { Suspense, useState, useMemo, useEffect, Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Center,
  Environment,
  ContactShadows,
  useProgress,
} from "@react-three/drei";
import { Box } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

// Determinate load indicator (reads the shared loading manager useGLTF feeds).
function LoadingIndicator({ accent }: { accent: string }) {
  const { active, progress } = useProgress();
  if (!active) return null;
  const pct = Math.round(progress);
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 p-3"
      role="progressbar"
      aria-label="Loading 3D model"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-live="polite"
    >
      <div className="flex items-center justify-between font-mono text-[10px] text-[#5A5C64]">
        <span>loading model</span>
        <span>{pct}%</span>
      </div>
      <div className="mt-1 h-px w-full bg-[#14161C]/10">
        <div
          className="h-px transition-[width] duration-150"
          style={{ width: `${progress}%`, backgroundColor: accent }}
        />
      </div>
    </div>
  );
}

type ModelViewerProps = {
  src: string;
  /** Accessible description of the part (used as the canvas label). */
  label?: string;
  /** Accent hex used to tint the wireframe loader + fallback. */
  accent?: string;
  /** Solid colour applied to the loaded model's surfaces. */
  modelColor?: string;
  /** Background of the missing-model fallback panel. */
  fallbackBg?: string;
  fallbackText?: string;
};

// useGLTF throws when the GLB is missing or fails to parse. A DOM-level error
// boundary lets us swap the whole Canvas for a styled placeholder.
class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function WireframeFallback({ accent }: { accent: string }) {
  return (
    <mesh rotation={[0.4, 0.8, 0]}>
      <boxGeometry args={[1.6, 1.6, 1.6]} />
      <meshBasicMaterial color={accent} wireframe />
    </mesh>
  );
}

// Normalize any GLB to a consistent on-screen size regardless of the units it
// was exported in (Fusion exports in mm/cm, so raw models frame wildly), then
// let <Center> recentre it. Also override the (often washed-out) Fusion
// appearances with one matte "machined-part" material so models read clearly
// against the light card. Clone the cached scene so we never mutate it.
function Model({ src, color }: { src: string; color: string }) {
  // Draco decoder is self-hosted at /public/draco (no runtime CDN dependency).
  const { scene } = useGLTF(src, "/draco/");
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color, metalness: 0.25, roughness: 0.5 }),
    [color],
  );
  const normalized = useMemo(() => {
    const root = scene.clone(true);

    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    root.scale.setScalar(2.6 / maxDim);

    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.material = material;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return root;
  }, [scene, material]);

  // Geometry is shared with the cached GLTF scene, so only dispose the override
  // material we created here — never the geometry.
  useEffect(() => () => material.dispose(), [material]);

  return (
    <Center>
      <primitive object={normalized} />
    </Center>
  );
}

export default function ModelViewer({
  src,
  label = "3D model",
  accent = "#C97B2A",
  modelColor = "#3B3E47",
  fallbackBg = "#0F1018",
  fallbackText = "#72748A",
}: ModelViewerProps) {
  const [dragging, setDragging] = useState(false);
  const reduce = useReducedMotion();

  const fallback = (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg px-4 text-center"
      style={{ backgroundColor: fallbackBg }}
    >
      <Box size={32} strokeWidth={1.25} style={{ color: accent }} />
      <span
        className="font-mono text-xs tracking-wide"
        style={{ color: fallbackText }}
      >
        Couldn&apos;t load 3D preview — refresh to retry
      </span>
    </div>
  );

  return (
    <div
      role="img"
      tabIndex={0}
      aria-label={`Interactive 3D model: ${label}. Drag to rotate, scroll to zoom.`}
      className="relative h-full w-full cursor-grab overflow-hidden rounded-lg active:cursor-grabbing"
      onPointerDown={() => setDragging(true)}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
    >
      <ModelErrorBoundary fallback={fallback}>
        <Canvas camera={{ position: [0, 2, 5], fov: 45 }} dpr={[1, 2]}>
          <Suspense fallback={<WireframeFallback accent={accent} />}>
            <Model src={src} color={modelColor} />
            <Environment preset="studio" />
            <ContactShadows
              position={[0, -1.2, 0]}
              opacity={0.4}
              scale={8}
              blur={2.4}
              far={4}
            />
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableZoom
            autoRotate={!dragging && !reduce}
            autoRotateSpeed={1.5}
            minDistance={2}
            maxDistance={9}
          />
        </Canvas>
        <LoadingIndicator accent={accent} />
      </ModelErrorBoundary>
    </div>
  );
}
