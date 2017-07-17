const fov = 45;
const clearColor = 0x000000;
const planeSize = [1000,1000];
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);
const renderer = new THREE.WebGLRenderer();
const stats = new Stats();
//-------------- Set Camera Position: -----------------------------
camera.position.set(0,10,200);
camera.lookAt({x:0,y:0,z:0});
//-------------- Floor: -------------------------------------------
(function addFloor(){
    const geo = new THREE.PlaneGeometry(...planeSize);
    const mat = new THREE.MeshPhongMaterial({color:"rgb(250,250,250)"});
    const mesh = new THREE.Mesh(geo,mat);
    mesh.rotateX(-Math.PI/2);
    scene.add(mesh);
})();
//-------------- Resizable canvas: --------------------------------
resizableCanvas(camera,renderer);
new THREE.OrbitControls( camera );
//-------------- Renderer: ----------------------------------------
renderer.setClearColor(clearColor);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvasContainer").appendChild(renderer.domElement);
//-------------- Stats: -------------------------------------------
stats.showPanel(0);
document.body.appendChild(stats.dom );
//-------------- Campfire: ----------------------------------------
const fire = new Campfire({fireHeight:25,width:23,particleSpeed:1.2}); // all arguments are optional
scene.add(fire);

function render()
{
    stats.begin();
    stats.end(); 
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    fire.updateParticles();
}
render();
        