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

import testFragmentShader from "@/assets/shaders/texturas_varias/fragment.glsl";
import testVertexShader from "@/assets/shaders/texturas_varias/vertex.glsl";
const archivos = [
  {archivo: "/texturas/documentos/acta-comision-2.png", ancho:798,alto:692},
  {archivo: "/texturas/documentos/acta-comision-52.png", ancho:474,alto:667},
  {archivo: "/texturas/documentos/acta-comision-57.png", ancho:781,alto:666},
]

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
// Para tick
const seccion_actual = ref(0)
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
  /**
   * Base
   */
  // Canvas
  const canvas = document.querySelector("canvas.webgl");

  // Scene
  scene.value = new THREE.Scene();

  /**
   * Objects
   */
  // Texture
  const textureLoader = new THREE.TextureLoader()
  const textura = textureLoader.load('/texturas/documentos/acta-comision-2.png')
  //gradientTexture.magFilter = THREE.NearestFilter

  // Meshes


  const geometria = new THREE.PlaneBufferGeometry(10, 10, 5,5);

  //const geometria = new THREE.TorusGeometry(0.3, 0.2, 32, 64)

  for (let i = 0; i < archivos.length; i++) {
    let mesh;
    const material = new THREE.RawShaderMaterial({
      lights: true,
      transparent: true,
      side: THREE.DoubleSide,
    textura,
      uniforms: {
        ...THREE.UniformsLib.lights,
        ...{
          ...uniforms,
          uXpattern: { value: Math.random() },
          uYpattern: { value: Math.random() },
          uTexture: {
        value: textureLoader.load(archivos[i].archivo)
      }
        },
      },
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
    });
      // Mesh
      mesh = new THREE.Mesh(geometria, material);


      mesh.position.x = (Math.random() - .5) * 10
      mesh.position.y = gaussianRandom(0, 0.5) * 5;
      mesh.position.z = gaussianRandom(0, 0.5) * 10;

      mesh.rotation.x = -.3 * Math.PI;


      mesh.scale.x = 1;
      mesh.scale.y = archivos[i].alto/archivos[i].ancho;
      

    scene.value.add(mesh);
  }

  /**
   * Lights
   */
  const directionalLight = new THREE.DirectionalLight(
    params.directionalLight,
    0.57
  );
  directionalLight.position.set(4, 4, 4);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 4096;
  directionalLight.shadow.mapSize.height = 4096;
  directionalLight.shadow.camera.near = 2;
  directionalLight.shadow.camera.far = 15;

  const ambientLight = new THREE.AmbientLight(params.ambientLight, 0.37);

  scene.value.add(directionalLight, ambientLight);

  /**
   * Scroll
   */
  window.addEventListener("scroll", escroleando);
  /**
   * Cursor
   */

  window.addEventListener("mousemove", moviendoCursor);

  window.addEventListener("resize", reescalando);

  /**
   * Camera
   */
  // Group
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
  console.log(camera.value);

  /**
   * Renderer
   */
  renderer.value = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    //alpha: true
  });
  renderer.value.setClearColor("#f2f8ff");
  renderer.value.toneMappingExposure = 1;
  renderer.value.gammaOutput = true;
  renderer.value.gammaInput = true;
  renderer.value.gammaFactor = 2.2;
  //renderer.setClearAlpha(0)
  renderer.value.setSize(sizes.value.width, sizes.value.height);
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.value.physicallyCorrectLights = true;

  
  /**
   * Animate
   */
  clock.value = new THREE.Clock();

  tick();
});
/**
 * Escroleada
 */
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

      if (newSection == 1) {
        gsap.to(camera.value.position, {
          duration: 1.5,
          z: -1,
          x: -1,
          y: 30,

          onUpdate: () => {
            camera.value.lookAt(0, 0, 0);
          },
        });
      }
      if (newSection == 2) {
        gsap.to(camera.value.position, {
          duration: 1.5,
          z: -15,
          x: 15,
          y: -8,
          onUpdate: () => {
            camera.value.lookAt(5, 0, -5);
          },
        });
      }
      /*gsap.to(sectionMeshes[seccion_actual.value].rotation, {
            duration: 1.5,
            ease: 'power2.inOut',
            x: '+=6',
            y: '+=3',
            z: '+=1.5',
          })*/
    }
  }
/**
 * Paralax
 */
function moviendoCursor(event) {
  cursor.value.x = event.clientX / sizes.value.width - 0.5;
  cursor.value.y = event.clientY / sizes.value.height - 0.5;
}
/**
 * Reescalado
 */
function reescalando() {
  // Update sizes
  sizes.value.width = window.innerWidth;
  sizes.value.height = window.innerHeight;

  // Update camera
  camera.value.aspect = sizes.value.width / sizes.value.height;
  camera.value.updateProjectionMatrix();

  // Update renderer
  renderer.value.setSize(sizes.value.width, sizes.value.height);
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
/**
 * Animado
 */
function tick() {
  const elapsedTime = clock.value.getElapsedTime();
  const deltaTime = elapsedTime - previousTime.value;
  previousTime.value = elapsedTime;
  uniforms.u_time.value = elapsedTime;

  // Animate camera
  //camera.position.y = 8

  const parallaxX = cursor.value.x * 0.5;
  const parallaxY = -cursor.value.y * 0.5;

  cameraGroup.value.position.x +=
    (parallaxX - cameraGroup.value.position.x) * 5 * deltaTime;
  cameraGroup.value.position.y +=
    (parallaxY - cameraGroup.value.position.y) * 5 * deltaTime;

  // Render
  renderer.value.render(toRaw(scene.value), toRaw(camera.value));

  // Call tick again on the next frame
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
    