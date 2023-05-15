<template>
  <div>
    <canvas class="webgl"></canvas>
  </div>
</template>
    
  <script setup>
// Transformaciones
import { onMounted, ref, toRaw } from "vue";
import * as THREE from "three";
import * as dat from "lil-gui";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import testFragmentShader from "@/assets/shaders/textura_rugosa/fragment.glsl";
import testVertexShader from "@/assets/shaders/textura_rugosa/vertex.glsl";

import archivos from "@/assets/datos/lista_documentos_portada.json"


const controls = ref();
/**
 * Debug
 */
const params = {
  color: "#ffffff",
  directionalLight: "#00fbff",
  ambientLight: "#ff0597",
};
//Uniforms
const uniforms = {
  uColor: { value: new THREE.Color(params.color) },
  uGlossiness: { value: 20 },
  u_resolution: { value: new THREE.Vector2(300, 300) },
  u_time: { value: 0 },
};

const angulo = ref(-0.3 * Math.PI);

// Para tick
const seccion_actual = ref(0);
const sizes = ref();
const scene = ref();
const renderer = ref();
const camera = ref();
const cameraGroup = ref();
const clock = ref();
const previousTime = ref(0);

const cursor = ref({ x: 0, y: 0 });

onMounted(() => {
  sizes.value = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const gui = new dat.GUI({ width: 340 })

  const canvas = document.querySelector("canvas.webgl");
  scene.value = new THREE.Scene();

  const axesHelper = new THREE.AxesHelper(10);
  scene.value.add(axesHelper);

  creamosCamara();
  creamosObjetos();
  creamosRender(canvas);

  controls.value = new OrbitControls(camera.value, canvas);
  controls.value.enableDamping = true;

  window.addEventListener("scroll", escroleando);
  window.addEventListener("mousemove", moviendoCursor);
  window.addEventListener("resize", reescalando);

  clock.value = new THREE.Clock();
  tick();
});

function creamosCamara() {
  cameraGroup.value = new THREE.Group();
  scene.value.add(cameraGroup.value);

  // Base camera
  camera.value = new THREE.PerspectiveCamera(
    35,
    sizes.value.width / sizes.value.height,
    0.1,
    100
  );
  camera.value.position.x = 0;
  camera.value.position.y = 8;
  camera.value.position.z = 20;

  cameraGroup.value.add(camera.value);
  camera.value.lookAt(new THREE.Vector3(0, 0, 0));
}
function creamosRender(_canvas) {
  renderer.value = new THREE.WebGLRenderer({
    canvas: _canvas,
    antialias: true,
  });
  renderer.value.setClearColor("#000");
  renderer.value.setSize(sizes.value.width, sizes.value.height);
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.value.physicallyCorrectLights = true;
}
function creamosObjetos() {
  const textureLoader = new THREE.TextureLoader();
  const geometria = new THREE.PlaneGeometry(10, 10, 12, 12);
  for (let i = 0; i < archivos.length; i++) {
    let material = new THREE.ShaderMaterial({
      lights: true,
      side: THREE.DoubleSide,
      uniforms: {
        ...THREE.UniformsLib.lights,
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) } ,

        uTexture: {
          value: textureLoader.load(archivos[i].archivo),
        },
      },
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
    });
    let mesh = new THREE.Mesh(geometria, material);
    mesh.position.x = (Math.random() - 0.5) * 15 - 0.5 * archivos[i].alto / archivos[i].ancho;
    mesh.position.y = gaussianRandom(0, 0.5) * 5;
    mesh.position.z = (Math.random() - 0.5) * 50;
    mesh.rotation.x = angulo.value;
    mesh.scale.x = 1;
    mesh.scale.y = archivos[i].alto / archivos[i].ancho;
    archivos[i].mesh = mesh;
    scene.value.add(mesh);
  }
}

function escroleando() {
  let scrollY = window.scrollY;
  const newSection = Math.round(scrollY / sizes.height);
  if (newSection !== seccion_actual.value) {
    seccion_actual.value = newSection;
    if (newSection == 0) {
      gsap.to(camera.value.position, {
        duration: 1.5,
        z: 20,
        x: 0,
        y: 8,
        onUpdate: () => {
          camera.value.lookAt(0, 0, 0);
        },
      });
    }
  }
}

function moviendoCursor(event) {
  cursor.value.x = event.clientX / sizes.value.width - 0.5;
  cursor.value.y = event.clientY / sizes.value.height - 0.5;
}

function reescalando() {
  sizes.value.width = window.innerWidth;
  sizes.value.height = window.innerHeight;

  camera.value.aspect = sizes.value.width / sizes.value.height;
  camera.value.updateProjectionMatrix();

  renderer.value.setSize(sizes.value.width, sizes.value.height);
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function tick() {
  const elapsedTime = clock.value.getElapsedTime();
  const deltaTime = elapsedTime - previousTime.value;
  previousTime.value = elapsedTime;
  uniforms.u_time.value = elapsedTime;

  //Moviendo objetos
  for (var i = 0; i < archivos.length; i++) {
    archivos[i].mesh.position.z +=
      0.01 * archivos[i].velocidad * Math.sin(angulo.value);
    archivos[i].mesh.position.y +=
      0.01 * archivos[i].velocidad * Math.cos(angulo.value);

    if (archivos[i].mesh.position.z < -5) {
      archivos[i].mesh.position.z = Math.random() * 5 + 15;
      archivos[i].mesh.position.y =
        gaussianRandom(0, 0.5) * 5 - 10 * Math.cos(angulo.value);
      archivos[i].mesh.position.x = (Math.random() - 0.5) * 15;
    }
  }

  const parallaxX = cursor.value.x * 0.5;
  const parallaxY = -cursor.value.y * 0.5;

  cameraGroup.value.position.x +=
    (parallaxX - cameraGroup.value.position.x) * 5 * deltaTime;
  cameraGroup.value.position.y +=
    (parallaxY - cameraGroup.value.position.y) * 5 * deltaTime;
  controls.value.update();

  renderer.value.render(toRaw(scene.value), toRaw(camera.value));

  window.requestAnimationFrame(tick);
}

function gaussianRandom(mean = 0, stdev = 1) {
  let u = 1 - Math.random(); //Converting [0,1) to (0,1)
  let v = Math.random();
  let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean;
}
</script>
    
    
    
<style scoped>
.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
  z-index: -1;
}
</style>
    