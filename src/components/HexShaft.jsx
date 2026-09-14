import { useEffect, useRef } from "react"
import * as THREE from "three"

const SHAFT_SPAN = 20

const DEFAULTS = {
    plate: "#3400FF",
    seam: "#00DCFF",
    columns: 24,
    relief: 20,
    shine: 20,
    glow: 20,
    speed: 5,
    direction: "reverse",
    sizePercent: 100,
}

function clamp(v, lo, hi, fallback) {
    const n = typeof v === "number" && isFinite(v) ? v : fallback
    return Math.max(lo, Math.min(hi, n))
}

function settingsFor(cfg) {
    const columns = Math.round(clamp(cfg.columns, 6, 24, DEFAULTS.columns))

    const arc = (Math.PI * 2) / columns
    const tileR = arc / Math.sqrt(3)
    const rowDz = tileR * 1.5
    const rows = Math.max(4, Math.ceil(SHAFT_SPAN / rowDz))
    return {
        columns,
        rows,
        tileR,
        rowDz,

        plateR: tileR * 0.9,
        plateDepth: tileR * 0.55,
        span: rows * rowDz,
        relief: clamp(cfg.relief, 0, 20, DEFAULTS.relief) * tileR * 0.09,

        shine: 4 + clamp(cfg.shine, 1, 20, DEFAULTS.shine) * 6,
        glow: clamp(cfg.glow, 0, 20, DEFAULTS.glow) * 0.09,
        speed: clamp(cfg.speed, 0, 20, DEFAULTS.speed) * 0.35,
        heading: cfg.direction === "reverse" ? -1 : 1,
        zoom: 100 / clamp(cfg.sizePercent, 40, 200, DEFAULTS.sizePercent),
    }
}

const HEX_VERTEX = `
attribute float aRow;
attribute float aCol;

uniform float uTime;
uniform float uDz;
uniform float uSpan;
uniform float uRelief;

varying vec3 vNormal;
varying vec3 vPos;
varying float vDepth;
varying float vPop;

void main() {
    vec3 c = (instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
    vec2 radial = normalize(c.xy);

    float wave = sin(aRow * 0.55 + aCol * 0.8 - uTime * 1.6) * 0.5 + 0.5;
    vPop = wave;

    vec3 p = (instanceMatrix * vec4(position, 1.0)).xyz;
    p.xy += radial * (wave - 0.5) * uRelief;

    float z = mod(aRow * uDz + uTime, uSpan);
    p.z -= z;

    vDepth = z / uSpan;

    vNormal = normalize(mat3(instanceMatrix) * normal);
    vPos = p;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`

const HEX_FRAGMENT = `
precision highp float;

uniform vec3 uPlate;
uniform vec3 uSeam;
uniform float uShine;
uniform float uGlow;

varying vec3 vNormal;
varying vec3 vPos;
varying float vDepth;
varying float vPop;

const vec3 KEY = vec3(0.40, 0.66, 0.64);

void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(-vPos);
    float lam = max(dot(n, KEY), 0.0);
    float spec = pow(max(dot(reflect(-KEY, n), v), 0.0), uShine);

    float fres = pow(1.0 - max(dot(n, v), 0.0), 4.0);

    float crest = vPop * vPop;

    vec3 col = uPlate * (0.10 + lam * 0.95)
        + vec3(spec) * 0.55
        + uSeam * (fres * 0.45 + crest * uGlow);

    float fog = 1.0 - smoothstep(0.30, 0.95, vDepth);
    float mouth = smoothstep(0.0, 0.07, vDepth);
    float a = fog * mouth;

    gl_FragColor = vec4(col * a, a);
}
`

class HexShaftScene {
    constructor(container, cfg) {
        this.container = container
        this.cfg = cfg
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(70, 1, 0.05, SHAFT_SPAN + 6)
        this.geometry = null
        this.material = null
        this.mesh = null
        this.uniforms = {}
        this.width = 1
        this.height = 1
        this.time = 0
        this.lastT = 0
        this.frameId = 0
        this.disposed = false

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setClearColor(0x000000, 0)
        this.renderer.outputColorSpace = THREE.SRGBColorSpace
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        const canvas = this.renderer.domElement
        canvas.style.position = "absolute"
        canvas.style.inset = "0"
        canvas.style.width = "100%"
        canvas.style.height = "100%"
        container.appendChild(canvas)

        const S = settingsFor(cfg)
        this.uniforms = {
            uTime: { value: 0 },
            uDz: { value: S.rowDz },
            uSpan: { value: S.span },
            uRelief: { value: S.relief },
            uPlate: { value: new THREE.Color(cfg.plate) },
            uSeam: { value: new THREE.Color(cfg.seam) },
            uShine: { value: S.shine },
            uGlow: { value: S.glow },
        }
        this.material = new THREE.ShaderMaterial({
            vertexShader: HEX_VERTEX,
            fragmentShader: HEX_FRAGMENT,
            uniforms: this.uniforms,
            transparent: true,
            premultipliedAlpha: true,
        })
        this.rebuild()
        this.camera.position.set(0, 0, 0)
        this.camera.lookAt(0, 0, -1)
    }

    rebuild() {
        const S = settingsFor(this.cfg)
        if (this.mesh) {
            this.scene.remove(this.mesh)
            this.mesh.dispose()
            this.mesh = null
        }
        this.geometry?.dispose()

        const geo = new THREE.CylinderGeometry(
            S.plateR,
            S.plateR,
            S.plateDepth,
            6
        )
        geo.rotateZ(-Math.PI / 2)
        this.geometry = geo

        const count = S.columns * S.rows
        const mesh = new THREE.InstancedMesh(geo, this.material, count)
        const rowAttr = new Float32Array(count)
        const colAttr = new Float32Array(count)
        const m = new THREE.Matrix4()
        let i = 0
        for (let r = 0; r < S.rows; r++) {
            const stagger = (r % 2) * 0.5
            for (let c = 0; c < S.columns; c++) {
                const theta = ((c + stagger) / S.columns) * Math.PI * 2
                m.makeRotationZ(theta)
                m.setPosition(Math.cos(theta), Math.sin(theta), 0)
                mesh.setMatrixAt(i, m)
                rowAttr[i] = r
                colAttr[i] = c
                i++
            }
        }
        mesh.instanceMatrix.needsUpdate = true
        geo.setAttribute("aRow", new THREE.InstancedBufferAttribute(rowAttr, 1))
        geo.setAttribute("aCol", new THREE.InstancedBufferAttribute(colAttr, 1))

        mesh.frustumCulled = false
        this.scene.add(mesh)
        this.mesh = mesh

        this.uniforms.uDz.value = S.rowDz
        this.uniforms.uSpan.value = S.span
        this.uniforms.uRelief.value = S.relief
    }

    start() {
        this.lastT = performance.now()
        const loop = () => {
            this.frameId = requestAnimationFrame(loop)
            this.step()
        }
        this.frameId = requestAnimationFrame(loop)
    }

    setSize(width, height) {
        if (this.disposed) return
        this.width = Math.max(1, width)
        this.height = Math.max(1, height)
        this.renderer.setSize(this.width, this.height, false)
        this.updateCamera()
    }

    updateCamera() {
        const aspect = this.width / this.height
        const S = settingsFor(this.cfg)

        const span = 2.0 * S.zoom
        const visibleHeight = aspect < 1 ? span / aspect : span
        this.camera.aspect = aspect
        this.camera.fov = 2 * Math.atan(visibleHeight / 2 / 0.9) * (180 / Math.PI)
        this.camera.updateProjectionMatrix()
    }

    updateConfig(cfg) {
        if (this.disposed) return
        const prev = this.cfg
        this.cfg = cfg
        const S = settingsFor(cfg)
        this.uniforms.uRelief.value = S.relief
        this.uniforms.uShine.value = S.shine
        this.uniforms.uGlow.value = S.glow
        this.uniforms.uPlate.value.set(cfg.plate)
        this.uniforms.uSeam.value.set(cfg.seam)

        if (cfg.columns !== prev.columns) this.rebuild()
        if (cfg.sizePercent !== prev.sizePercent) this.updateCamera()
    }

    step() {
        if (this.disposed) return
        const now = performance.now()
        let dt = (now - this.lastT) / 1000
        this.lastT = now
        if (!isFinite(dt) || dt < 0) dt = 0
        if (dt > 0.05) dt = 0.05

        const S = settingsFor(this.cfg)
        this.time += dt * S.speed * S.heading
        this.uniforms.uTime.value = this.time
        this.renderer.render(this.scene, this.camera)
    }

    dispose() {
        this.disposed = true
        cancelAnimationFrame(this.frameId)
        if (this.mesh) {
            this.scene.remove(this.mesh)
            this.mesh.dispose()
        }
        this.geometry?.dispose()
        this.material.dispose()
        this.renderer.dispose()
        const canvas = this.renderer.domElement
        if (canvas.parentNode === this.container) this.container.removeChild(canvas)
    }
}

const __originkitPresetProps = {
  plate: "#3400FF",
  seam: "#00DCFF",
  columns: 24,
  relief: 20,
  shine: 20,
  glow: 20,
  speed: 5,
  direction: "reverse",
  sizePercent: 100
};

export default function HexShaft(props) {
  const {
    plate = DEFAULTS.plate,
    seam = DEFAULTS.seam,
    columns = DEFAULTS.columns,
    relief = DEFAULTS.relief,
    shine = DEFAULTS.shine,
    glow = DEFAULTS.glow,
    speed = DEFAULTS.speed,
    direction = DEFAULTS.direction,
    sizePercent = DEFAULTS.sizePercent,
    style,
  } = props

  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const cfgRef = useRef(null)
  cfgRef.current = {
    plate,
    seam,
    columns,
    relief,
    shine,
    glow,
    speed,
    direction,
    sizePercent,
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let scene
    try {
      scene = new HexShaftScene(container, cfgRef.current)
    } catch {
      return
    }
    sceneRef.current = scene
    scene.setSize(container.clientWidth, container.clientHeight)
    scene.start()

    const ro = new ResizeObserver(() => {
      scene.setSize(container.clientWidth, container.clientHeight)
    })
    ro.observe(container)
    return () => {
      ro.disconnect()
      scene.dispose()
      sceneRef.current = null
    }
  }, [])

  useEffect(() => {
    sceneRef.current?.updateConfig(cfgRef.current)
  }, [plate, seam, columns, relief, shine, glow, speed, direction, sizePercent])

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="The inside of a honeycombed duct rushing past"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: 120,
        minHeight: 120,
        overflow: "hidden",
        ...style,
      }}
    />
  )
}
