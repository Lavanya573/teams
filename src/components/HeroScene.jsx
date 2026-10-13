import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'

function OrbitRing({ radius, tube, axis, speed, offset, color = '#ffffff', segments = { radial: 32, tubular: 120 } }) {
  const ref = useRef()
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation[axis] += dt * speed
  })

  return (
    <mesh ref={ref} rotation={[offset[0], offset[1], offset[2]]} castShadow>
      <torusGeometry args={[radius, tube, segments.radial, segments.tubular]} />
      <meshStandardMaterial color={color} metalness={0.96} roughness={0.18} envMapIntensity={1.4} />
    </mesh>
  )
}

function OrbitNode({ radius, color, speed, offset }) {
  const ref = useRef()
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * speed
    ref.current.rotation.z += dt * speed * 0.7
  })

  return (
    <group ref={ref} rotation={offset}>
      <mesh position={[radius, 0, 0]} castShadow>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.22}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

function Sculpture({ reduced, compact }) {
  const pointerGroup = useRef()
  const intro = useRef(0)
  const segs = compact ? { radial: 28, tubular: 96 } : { radial: 48, tubular: 160 }

  useFrame((state, dt) => {
    const g = pointerGroup.current
    if (!g) return
    intro.current = Math.min(1, intro.current + dt * (reduced ? 4 : 0.85))
    const t = 1 - (1 - intro.current) ** 3
    g.scale.setScalar(0.84 + 0.16 * t)

    const px = reduced ? 0 : state.pointer.x
    const py = reduced ? 0 : state.pointer.y
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, px * 0.5, 3, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -py * 0.35, 3, dt)
  })

  const speed = reduced ? 0 : 1

  return (
    <group ref={pointerGroup}>
      <Float speed={reduced ? 0 : 1.15} rotationIntensity={reduced ? 0 : 0.2} floatIntensity={reduced ? 0 : 0.38}>
        <group rotation={[0.45, -0.7, 0.12]}>
          <OrbitRing radius={1.75} tube={0.09} axis="z" speed={0.12 * speed} offset={[0, 0, 0]} color="#45483f" segments={segs} />
          <OrbitRing radius={1.42} tube={0.12} axis="y" speed={-0.18 * speed} offset={[Math.PI / 2.6, 0, 0.2]} color="#aeb5a5" segments={segs} />
          <OrbitRing radius={1.02} tube={0.1} axis="x" speed={0.23 * speed} offset={[0.25, Math.PI / 2.9, 0]} color="#d7ff64" segments={segs} />

          <group rotation={[0.25, 0.2, -0.2]}>
            <mesh position={[0, 0, 0]} castShadow>
              <octahedronGeometry args={[0.64, 1]} />
              <meshPhysicalMaterial
                color="#ffffff"
                transmission={1}
                thickness={1.1}
                roughness={0.04}
                ior={1.5}
                iridescence={1}
                iridescenceIOR={1.32}
                iridescenceThicknessRange={[90, 440]}
                envMapIntensity={1.5}
                attenuationColor="#d7ff64"
                attenuationDistance={2.8}
              />
            </mesh>
          </group>

          <group>
            <mesh position={[0, -1.2, 0]} castShadow>
              <boxGeometry args={[0.12, 2.1, 0.12]} />
              <meshStandardMaterial color="#45483f" metalness={0.82} roughness={0.24} />
            </mesh>
            <mesh position={[-1.06, 0.2, 0]} castShadow>
              <boxGeometry args={[0.12, 1.3, 0.12]} />
              <meshStandardMaterial color="#aeb5a5" metalness={0.82} roughness={0.24} />
            </mesh>
            <mesh position={[1.06, 0.2, 0]} castShadow>
              <boxGeometry args={[0.12, 1.3, 0.12]} />
              <meshStandardMaterial color="#aeb5a5" metalness={0.82} roughness={0.24} />
            </mesh>
          </group>

          <OrbitNode radius={1.75} color="#45483f" speed={0.9 * speed} offset={[0, 0, 0]} />
          <OrbitNode radius={1.42} color="#d7ff64" speed={1.2 * speed} offset={[Math.PI / 2, 0.8, 0.5]} />
          <OrbitNode radius={1.02} color="#d8d3c8" speed={1.5 * speed} offset={[0.9, -1.1, 0.2]} />
        </group>
      </Float>
    </group>
  )
}

export default function HeroScene({ active = true, reduced = false, compact = false }) {
  return (
    <Canvas
      className="hero-canvas"
      dpr={compact ? [1, 1.25] : [1, 1.75]}
      frameloop={!active ? 'never' : reduced ? 'demand' : 'always'}
      camera={{ position: [0, 0, 6.4], fov: 32 }}
      gl={{ antialias: !compact, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
      }}
    >
      <Sculpture reduced={reduced} compact={compact} />
      <ContactShadows
        position={[0, -2.15, 0]}
        opacity={0.32}
        scale={9}
        blur={compact ? 2.2 : 2.8}
        far={3.2}
        resolution={compact ? 256 : 512}
        frames={reduced ? 1 : Infinity}
        color="#45483f"
      />
      <Environment resolution={compact ? 128 : 256} frames={1}>
        <group rotation={[0, 0.6, 0]}>
          <Lightformer form="rect" intensity={5} color="#ffffff" position={[0, 6, -2]} rotation-x={Math.PI / 2} scale={[10, 6, 1]} />
          <Lightformer form="rect" intensity={3.2} color="#ffffff" position={[-6, 1, 1]} rotation-y={Math.PI / 2} scale={[8, 1.4, 1]} />
          <Lightformer form="rect" intensity={3.2} color="#ffffff" position={[6, 0, 2]} rotation-y={-Math.PI / 2} scale={[8, 1.1, 1]} />
          <Lightformer form="ring" intensity={2.2} color="#d7ff64" position={[0, 1, -8]} scale={9} />
          <Lightformer form="rect" intensity={1.1} color="#ffffff" position={[0, -6, 0]} rotation-x={-Math.PI / 2} scale={[14, 14, 1]} />
        </group>
      </Environment>
    </Canvas>
  )
}
