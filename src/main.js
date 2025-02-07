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
document.body.appendChild(ARButton.createButton(renderer));

const button = ARButton.createButton(renderer);
if (button) {
  document.body.appendChild(button);
} else {
  console.error("Кнопка AR не была создана!");
}

console.log("Скрипт загружен, запускаем анимацию");
animate();

if (renderer.domElement) {
  console.log("Рендерер добавлен в DOM");
} else {
  console.error("Ошибка: renderer.domElement отсутствует");
}

// Добавляем 3D-объект
const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animate() {
  renderer.setAnimationLoop(() => {
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  });
}
animate();
