import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import "animate.css";

import axios from "axios";

let lat, long;
const getCoords = () => {
  setInterval(async () => {
    try {
      const data = await axios({
        method: "get",
        url: "https://api.wheretheiss.at/v1/satellites/25544",
      });
    } catch (e) {
      location.reload();
    }

    lat = parseFloat(data.data.latitude);
    long = parseFloat(data.data.longitude);
  }, 1000);
};

let scene = new THREE.Scene();
const canvas = document.querySelector(".webgl");
const manager = new THREE.LoadingManager();

window.addEventListener("resize", () => {
  canvas.style.height = "100vh";
});

const fov = 70;
const aspect = 2.08;
const near = 0.1;
const far = 1000;
let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
let renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

camera.position.z = 2;
scene.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.addEventListener("change", () => {
  try {
    renderer();
  } catch (e) {}
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

var earthMesh, issMesh;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambientLight);

const earthLight = new THREE.PointLight(0xff0000, 3, 100);
earthLight.position.set(0, 0, -100);
scene.add(earthLight);

var lights = [];
for (let i = 0; i <= 5; i++) {
  lights[i] = new THREE.PointLight(0xffffff, 0.75, 0);
}

lights[0].position.set(0, 0, 400);
lights[1].position.set(0, 0, -400);
lights[2].position.set(400, 0, 0);
lights[3].position.set(-400, 0, 0);
lights[4].position.set(0, 400, 0);
lights[5].position.set(0, -400, 0);

lights.forEach((light) => {
  scene.add(light);
});

const loader = new GLTFLoader(manager);

loader.load("low_poly_earth.glb", function (gltf) {
  earthMesh = gltf.scene.children[0];
  scene.add(gltf.scene);
  controls.target.copy(earthMesh.position);
});

loader.load("iss_stationary.glb", function (gltf) {
  issMesh = gltf.scene.children[0];
  gltf.scene.scale.set(0.06, 0.06, 0.06);
  earthMesh.add(gltf.scene);
});

manager.onLoad = () => {
  const loading = document.querySelector(".loading");
  loading.classList.add("animate__fadeOut");
  setTimeout(() => {
    loading.style.display = "none";
  }, 2000);
  getCoords();
  setTimeout(animate(), 200);
};

const animate = () => {
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.0015;

  const deviation = lat <= 0 ? 81 : 100;
  const phi = THREE.MathUtils.degToRad(lat - deviation);
  const theta = THREE.MathUtils.degToRad(long + 22);
  issMesh.position.setFromSphericalCoords(700, phi, theta);

  render();
};

const render = () => {
  renderer.render(scene, camera);
};
