import { GLTFLoader } from "./GLTFLoader.js";
import { OrbitControls } from './orbitcontrols.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    45,
    1,
    0.01,
    1000
);
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(800, 800);
renderer.domElement.id = 'wine-bottle-canvas';
document.getElementById("wine-bottle-model").appendChild(renderer.domElement);

var loader = new GLTFLoader();

var obj;

loader.load("assets/js/model/scene.gltf", function (gltf) {
    obj = gltf.scene;
    scene.add(gltf.scene);
});

var light = new THREE.HemisphereLight(0xffffff, 0x000000, 25);
scene.add(light);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 10);
controls.enableZoom = false;
controls.update();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    obj.rotation.y += 0.001;
    renderer.render(scene, camera);
}

setTimeout(() => {
    animate();
    if(window.innerWidth < 1024 && controls.enabled){
        controls.enabled = false;
    }
}, 1000);

var originalResize = false;

setTimeout(() => {
    window.addEventListener("resize", () => {
        if(window.innerWidth < 1024){
            controls.enabled = false;
            if (window.innerWidth < 800) {
                renderer.setSize(window.innerWidth, window.innerWidth);
                originalResize = false;
                console.log('3D MODEL RESIZED');
            }else {
                if (!originalResize) {
                    renderer.setSize(800, 800);
                    originalResize = true;
                    console.log('ORIGINAL 3D MODEL');
                }
            }
        }else{
            controls.enabled = true;
        }
    });
}, 1500);