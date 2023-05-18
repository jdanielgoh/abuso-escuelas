<template>
  <div>
    <canvas class="webgl"></canvas>
  </div>
</template>
    
  <script setup>
// Transformaciones
import { onMounted, ref, toRaw, onUnmounted } from "vue";
import * as THREE from "three";
import * as dat from "lil-gui";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import archivos from "@/assets/datos/lista_documentos_portada.json";
const parametros_gui = {
  color_fondo: "#1e251f",
};
const fog = ref(new THREE.Fog(parametros_gui.color_fondo, 0.1, 4));

const controls = ref();

const angulo = ref(-0.1 * Math.PI);

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
const gui = ref();

//Luz
const luzPuntual = ref(new THREE.PointLight("#ffffff", 0.88, 20));
onMounted(() => {
  sizes.value = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  gui.value = new dat.GUI({ width: 340 }).close();

  const canvas = document.querySelector("canvas.webgl");
  scene.value = new THREE.Scene();

  //const axesHelper = new THREE.AxesHelper(10);
  //scene.value.add(axesHelper);

  creamosCamara();
  creamosObjetos();
  agregamosLuces();
  creamosRender(canvas);

  controls.value = new OrbitControls(camera.value, canvas);
  controls.value.enableDamping = true;

  window.addEventListener("scroll", escroleando);
  window.addEventListener("mousemove", moviendoCursorLuces);
  window.addEventListener("resize", reescalando);

  clock.value = new THREE.Clock();
  tick();
});
function agregamosLuces() {
  const ambientLight = new THREE.AmbientLight(0xeeeeee, 0.2);
  scene.value.add(ambientLight);
  gui.value
    .add(ambientLight, "intensity")
    .name("intensidad luz ambiental")
    .min(0)
    .max(1)
    .step(0.001);
  gui.value.addColor(ambientLight, "color").name("color luz ambiental");

  gui.value
    .add(luzPuntual.value, "intensity")
    .name("intensidad luz puntual")
    .min(0)
    .max(2)
    .step(0.001);
  gui.value.addColor(luzPuntual.value, "color").name("color luz puntual");
  luzPuntual.value.position.set(
    camera.value.position.x,
    camera.value.position.y + 5,
    camera.value.position.z + 5
  );
  luzPuntual.value.castShadow = true;

  scene.value.add(luzPuntual.value);

  scene.value.fog = fog.value;

  gui.value
    .addColor(parametros_gui, "color_fondo")
    .name("color de fondo y niebla")
    .onChange((value) => {
      scene.value.fog.color = new THREE.Color(value);
      renderer.value.setClearColor(new THREE.Color(value));
    });
}
function moviendoCursorLuces(event) {
  cursor.value.x = event.clientX / sizes.value.width - 0.5;
  cursor.value.y = event.clientY / sizes.value.height - 0.5;
  const parallaxX = cursor.value.x * 0.5;
  const parallaxY = -cursor.value.y * 0.5;

  luzPuntual.value.position.set(parallaxX * 7, parallaxY * 5, 1.5);
}
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
  camera.value.position.x = 0.5;
  camera.value.position.y = 0;
  camera.value.position.z = 1.8;

  cameraGroup.value.add(camera.value);
  camera.value.lookAt(new THREE.Vector3(-0.2, 0, 0));
}
function creamosRender(_canvas) {
  renderer.value = new THREE.WebGLRenderer({
    canvas: _canvas,
    antialias: true,
  });
  renderer.value.setClearColor(parametros_gui.color_fondo);
  renderer.value.setSize(sizes.value.width, sizes.value.height);
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
function creamosObjetos() {
  const textureLoader = new THREE.TextureLoader();
  const geometria = new THREE.PlaneGeometry(1, 1);
  for (let i = 0; i < archivos.length; i++) {
    let material = new THREE.MeshStandardMaterial({
      map: textureLoader.load(archivos[i].archivo),
    });
    material.metalness = 0.0;
    material.roughness = 0.9;
    let mesh = new THREE.Mesh(geometria, material);
    mesh.position.x = (Math.random() - 0.5) * 2;
    mesh.position.y = (Math.random() - 0.5) * 5;
    mesh.position.z = (Math.random() - 0.2) * 1.2;

    mesh.rotation.x = angulo.value;
    mesh.scale.x = 1;
    mesh.scale.y = archivos[i].alto / archivos[i].ancho;
    archivos[i].mesh = mesh;
    scene.value.add(mesh);
  }
}

function escroleando() {
  let scrollY = window.scrollY;
  const newSection = Math.round(scrollY / sizes.value.height);
  console.log(newSection);
  if (newSection !== seccion_actual.value) {
    seccion_actual.value = newSection;
    if (newSection == 0) {
      for (var i = 0; i < archivos.length; i++) {
        gsap.to(archivos[i].mesh.position, {
          duration: 1.5,
          z: (Math.random() - 0.2) * 1.2,
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 5,
        });
        gsap.to(archivos[i].mesh.scale, {
          duration: 1.5,
          x: 1,
          y: archivos[i].alto / archivos[i].ancho,
        });
      }
    }
    else if (newSection == 1) {
      let escala = 0.4;
      let columnas = 4;
      for (var i = 0; i < archivos.length; i++) {
        gsap.to(archivos[i].mesh.position, {
          duration: 1.5,
          x: (i % columnas) * escala - columnas * escala * 0.5,
          y: -parseInt(i / columnas) * escala * 1.5,
          z: 0,
        });
        gsap.to(archivos[i].mesh.scale, {
          duration: 1.5,
          x: escala * 0.9,
          y: (escala * 0.9 * archivos[i].alto) / archivos[i].ancho,
        });
      }
    }
    else if( newSection >1){
      for (var i = 0; i < archivos.length; i++) {

      gsap.to(archivos[i].mesh.position, {
          duration: 1 + Math.random(),
          z: -4,
          delay: Math.random() * 1.5
        });
      }
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
  previousTime.value = elapsedTime;

  //Moviendo objetos
  for (var i = 0; i < archivos.length; i++) {
    if (seccion_actual.value == 0) {
      archivos[i].mesh.position.z +=
        0.0003 * archivos[i].velocidad * Math.sin(angulo.value);
      archivos[i].mesh.position.y +=
        0.0003 * archivos[i].velocidad * Math.cos(angulo.value);
      if (archivos[i].mesh.position.y > 2) {
        archivos[i].mesh.position.z = (Math.random() - 0.2) * 1.2;
        archivos[i].mesh.position.y = -3 - Math.random();
        archivos[i].mesh.position.x = (Math.random() - 0.5) * 2;
      }
    } else if (seccion_actual.value == 1) {
      archivos[i].mesh.position.z += 0.0003 * Math.sin(angulo.value);
      archivos[i].mesh.position.y += 0.0003 * Math.cos(angulo.value);
      if (archivos[i].mesh.position.y > 1) {
        archivos[i].mesh.position.y = -(parseInt(archivos.length / 3)) * .04 * 1.5 - .6;
        archivos[i].mesh.position.z = 0
      }
    }
  }

  /*const parallaxX = cursor.value.x * 0.5;
  const parallaxY = -cursor.value.y * 0.5;

  cameraGroup.value.position.x +=
    (parallaxX - cameraGroup.value.position.x) * 5 * deltaTime;
  cameraGroup.value.position.y +=
    (parallaxY - cameraGroup.value.position.y) * 5 * deltaTime;
  */
  controls.value.update();

  renderer.value.render(toRaw(scene.value), toRaw(camera.value));

  window.requestAnimationFrame(tick);
}

onUnmounted(() => {
  window.removeEventListener("scroll", escroleando);
  window.removeEventListener("mousemove", moviendoCursorLuces);
  window.removeEventListener("resize", reescalando);
});
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
    