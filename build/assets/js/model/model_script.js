import { GLTFLoader } from "./GLTFLoader.js";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    50,
    1,
    0.01,
    1000
);
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(700, 700);
document.getElementById("wine-bottle-model").appendChild(renderer.domElement);

var loader = new GLTFLoader();

var obj;

loader.load("assets/js/model/scene.gltf", function (gltf) {
    obj = gltf.scene;
    scene.add(gltf.scene);
});

var light = new THREE.HemisphereLight(0xffffff, 0x000000, 25);
scene.add(light);
camera.position.set(0, 0, 10);

function animate() {
    requestAnimationFrame(animate);
    obj.rotation.y += 0.001;
    renderer.render(scene, camera);
}

animate();