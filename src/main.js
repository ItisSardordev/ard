import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  20
);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Добавляем кнопку запуска AR
document.body.appendChild(
  ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] })
);

if (button) {
  document.body.appendChild(button);
} else {
  console.error("Кнопка AR не была создана!");
}

console.log("Скрипт загружен, запускаем анимацию");
animate();

button.addEventListener("click", async () => {
  try {
    await navigator.xr.requestSession("immersive-ar");
    console.log("AR сессия успешно запущена!");
  } catch (error) {
    console.error("Ошибка запуска AR:", error);
  }
});

if (renderer.domElement) {
  console.log("Рендерер добавлен в DOM");
} else {
  console.error("Ошибка: renderer.domElement отсутствует");
}

// Добавляем 3D-объект
const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
const cube = new THREE.Mesh(geometry, material);
scene.add(camera);
camera.position.set(0, 1.6, 3);
const light = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light);
light.position.set(1, 1, 1).normalize();
scene.add(cube);
cube.position.set(0.3, 0.5, -1);

function animate() {
  renderer.setAnimationLoop(() => {
    cube.rotation.y += 0.01;
    renderer.render(scene, camera, light);
  });
}
animate();
