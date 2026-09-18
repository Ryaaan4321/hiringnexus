"use client";

import React, { useEffect, useRef, useState } from "react";

// Matrix utility helpers for WebGL
function createPerspectiveMatrix(fovRad: number, aspect: number, near: number, far: number): Float32Array {
  const f = 1.0 / Math.tan(fovRad / 2);
  const nf = 1 / (near - far);
  const out = new Float32Array(16);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = 2 * far * near * nf;
  out[15] = 0;
  return out;
}

function createModelViewMatrix(camX: number, camY: number, camZ: number, rotX: number, rotY: number): Float32Array {
  // Rotate then translate by camera position
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);

  const out = new Float32Array(16);
  // R = Rx * Ry
  out[0] = cosY;
  out[1] = sinX * sinY;
  out[2] = -cosX * sinY;
  out[3] = 0;

  out[4] = 0;
  out[5] = cosX;
  out[6] = sinX;
  out[7] = 0;

  out[8] = sinY;
  out[9] = -sinX * cosY;
  out[10] = cosX * cosY;
  out[11] = 0;

  out[12] = -camX;
  out[13] = -camY;
  out[14] = -camZ;
  out[15] = 1;

  return out;
}

const VERTEX_SHADER = `
  precision highp float;
  attribute vec3 position;
  attribute float aAlpha;
  attribute vec3 aRandomness;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uAmplitude;
  uniform float uFrequency;
  uniform float uSpeed;
  uniform float uDepth;

  varying float vAlpha;
  varying float vDistance;
  varying float vNoise;
  varying vec3 vColor;

  uniform float uRcolor;
  uniform float uGcolor;
  uniform float uBcolor;
  uniform float uRnoise;
  uniform float uGnoise;
  uniform float uBnoise;
  uniform float uDissipation;

  // Simplex noise helpers
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float fbm(vec3 x) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100.0);
    for (int i = 0; i < 4; ++i) {
      v += a * snoise(x + uTime * uSpeed * 0.15);
      x = x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vNoise = fbm(position * uFrequency);

    // Color with noise variation
    float r = uRcolor / 255.0 + (clamp(vNoise, 0.0, 1.0) * 2.0 * (uRnoise - uRcolor) / 255.0);
    float g = uGcolor / 255.0 + (clamp(vNoise, 0.0, 1.0) * 2.0 * (uGnoise - uGcolor) / 255.0);
    float b = uBcolor / 255.0 + (clamp(vNoise, 0.0, 1.0) * 2.0 * (uBnoise - uBcolor) / 255.0);
    vColor = vec3(r, g, b);

    // Displace with noise
    vec3 displaced = position * (1.0 + uAmplitude * vNoise);
    displaced += uDepth * aRandomness * snoise(position + vec3(uTime * uSpeed));

    // Dissipation: push points outward along their normal and along a per-point random direction
    vec3 outward = normalize(position);
    float burst = uDissipation * (8.0 + length(aRandomness) * 60.0);
    displaced += outward * burst;
    displaced += aRandomness * uDissipation * 40.0;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    vDistance = -mvPosition.z;
    gl_PointSize = uSize * uPixelRatio * (80.0 / max(vDistance, 0.1));
    gl_PointSize = clamp(gl_PointSize, 0.5, 6.0);

    vAlpha = aAlpha * (80.0 / max(vDistance, 0.1)) * (1.0 - uDissipation);
    vAlpha = clamp(vAlpha, 0.0, 0.9);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    // Hard crisp dot matching TryGlen
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.4) discard;
    gl_FragColor = vec4(vColor, vAlpha);
  }
`;

export function GlenParticleGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const dissipationRef = useRef(0);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    // Enable blending for transparent particles
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Compile shaders
    const compileShader = (src: string, type: number) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compileShader(VERTEX_SHADER, gl.VERTEX_SHADER);
    const fs = compileShader(FRAGMENT_SHADER, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Generate 25,000 particles evenly on a sphere via Fibonacci distribution
    const count = 25000;
    const positions = new Float32Array(count * 3);
    const alphas = new Float32Array(count);
    const randomness = new Float32Array(count * 3);

    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / phi;
      const phiAngle = Math.acos(1 - (2 * (i + 0.5)) / count);

      const r = 2.2;
      positions[3 * i] = r * Math.sin(phiAngle) * Math.cos(theta);
      positions[3 * i + 1] = r * Math.sin(phiAngle) * Math.sin(theta);
      positions[3 * i + 2] = r * Math.cos(phiAngle);

      alphas[i] = 0.5 + 0.5 * Math.random();
      randomness[3 * i] = (Math.random() - 0.5) * 0.08;
      randomness[3 * i + 1] = (Math.random() - 0.5) * 0.08;
      randomness[3 * i + 2] = (Math.random() - 0.5) * 0.08;
    }

    // Buffers
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

    const alphaBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, alphas, gl.STATIC_DRAW);
    const alphaLoc = gl.getAttribLocation(program, "aAlpha");
    gl.enableVertexAttribArray(alphaLoc);
    gl.vertexAttribPointer(alphaLoc, 1, gl.FLOAT, false, 0, 0);

    const randBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, randBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, randomness, gl.STATIC_DRAW);
    const randLoc = gl.getAttribLocation(program, "aRandomness");
    gl.enableVertexAttribArray(randLoc);
    gl.vertexAttribPointer(randLoc, 3, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uModelViewLoc = gl.getUniformLocation(program, "modelViewMatrix");
    const uProjLoc = gl.getUniformLocation(program, "projectionMatrix");
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uSizeLoc = gl.getUniformLocation(program, "uSize");
    const uPixelLoc = gl.getUniformLocation(program, "uPixelRatio");
    const uAmpLoc = gl.getUniformLocation(program, "uAmplitude");
    const uFreqLoc = gl.getUniformLocation(program, "uFrequency");
    const uSpeedLoc = gl.getUniformLocation(program, "uSpeed");
    const uDepthLoc = gl.getUniformLocation(program, "uDepth");
    const uRcolorLoc = gl.getUniformLocation(program, "uRcolor");
    const uGcolorLoc = gl.getUniformLocation(program, "uGcolor");
    const uBcolorLoc = gl.getUniformLocation(program, "uBcolor");
    const uRnoiseLoc = gl.getUniformLocation(program, "uRnoise");
    const uGnoiseLoc = gl.getUniformLocation(program, "uGnoise");
    const uBnoiseLoc = gl.getUniformLocation(program, "uBnoise");
    const uDissipationLoc = gl.getUniformLocation(program, "uDissipation");

    // Static uniforms matching TryGlen
    gl.uniform1f(uSizeLoc, 1.0);
    gl.uniform1f(uAmpLoc, 0.12);
    gl.uniform1f(uFreqLoc, 1.2);
    gl.uniform1f(uSpeedLoc, 0.3);
    gl.uniform1f(uDepthLoc, 0.5);
    // Base color: [10, 14, 25] (#0a0e19)
    gl.uniform1f(uRcolorLoc, 10.0);
    gl.uniform1f(uGcolorLoc, 14.0);
    gl.uniform1f(uBcolorLoc, 25.0);
    // Noise color: [99, 99, 99] (#636363)
    gl.uniform1f(uRnoiseLoc, 99.0);
    gl.uniform1f(uGnoiseLoc, 99.0);
    gl.uniform1f(uBnoiseLoc, 99.0);

    let animationFrameId: number;
    let startTime = performance.now();

    // Check media query
    const mql = window.matchMedia("(max-width: 767px)");
    const updateMedia = () => {
      isMobileRef.current = mql.matches;
    };
    updateMedia();
    mql.addEventListener("change", updateMedia);

    // Scroll dissipation calculation
    const handleScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const vh = window.innerHeight || 1;
      const rect = sec.getBoundingClientRect();
      const rawDissipation = (0.4 * vh - rect.top) / (0.6 * vh);
      dissipationRef.current = Math.min(1, Math.max(0, rawDissipation));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Resize handler
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
      gl.uniform1f(uPixelLoc, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Render loop
    const render = (now: number) => {
      resizeCanvas();

      const elapsed = (now - startTime) * 0.001;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform1f(uDissipationLoc, dissipationRef.current);

      const aspect = canvas.width / (canvas.height || 1);
      const fovRad = (50 * Math.PI) / 180;
      const proj = createPerspectiveMatrix(fovRad, aspect, 0.1, 100);
      gl.uniformMatrix4fv(uProjLoc, false, proj);

      // Camera distance calculation matching TryGlen chunk
      const ratio = canvas.clientWidth / (canvas.clientHeight || 1);
      const baseDist = ratio < 0.8 ? 7.0 : ratio < 1.2 ? 6.2 : 5.5;
      const scale = isMobileRef.current ? 0.25 : 0.5;
      const camZ = baseDist / scale;

      const rotY = 0.06 * elapsed;
      const rotX = 0.1 * Math.sin(0.03 * elapsed);

      const mv = createModelViewMatrix(0, 0, camZ, rotX, rotY);
      gl.uniformMatrix4fv(uModelViewLoc, false, mv);

      gl.drawArrays(gl.POINTS, 0, count);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
      mql.removeEventListener("change", updateMedia);
      gl.deleteBuffer(posBuffer);
      gl.deleteBuffer(alphaBuffer);
      gl.deleteBuffer(randBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mt-10 md:mt-14"
      aria-label="A globe of particles, the shared learning every agent orbits"
    >
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="aspect-[455/256] w-full" />
      </div>

      {/* Bleed container with radial mask matching TryGlen */}
      <div className="home-globe-bleed pointer-events-none absolute inset-x-0 -inset-y-[150%] md:-inset-y-[30%]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>
    </section>
  );
}
