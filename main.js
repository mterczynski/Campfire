const fov = 45;
const clearColor = 0x000000;
const particleSize = [3,3,3];
const planeSize = [1000,1000];
const fireHeight = 25;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);
const renderer = new THREE.WebGLRenderer();
const stats = new Stats();
const particleMaterial = new THREE.MeshBasicMaterial
({
    color: "rgb(255,102,0)",
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

function generate()
{
    let quantity = document.getElementById("quantity").valueAsNumber;
    let particles = scene.children.filter((el)=>{return el.name == "particle"});
    let maxSpread = document.getElementById("width").value;
    particles.map((el)=>{scene.remove(el)});
    for(let i=0; i<quantity; i++)
    {
        let geo = new THREE.BoxGeometry(...particleSize);
        let mesh = new THREE.Mesh(geo,particleMaterial.clone());
        let x = Math.floor(Math.random()*maxSpread - maxSpread/2);
        let y = Math.floor(Math.random()*fireHeight);
        let z = Math.floor(Math.random()*maxSpread - maxSpread/2);
        mesh.name = "particle";
        mesh.userData.radius = Math.hypot(x,z);
        mesh.position.set(x,y,z);
        scene.add(mesh);
    }
    updateBlending();
}
function updateBlending()
{
    const particles = scene.children.filter((el)=>{return el.name == "particle"});
    let blendingMode = 1;
    if(document.getElementById("blend").checked)
    {
        blendingMode = 2;
    }
    particles.map((el)=>
    {
        el.material.blending = blendingMode;   
    });
}
function updateParticles(speedBuffer)
{
    let particles = scene.children.filter((el)=>{return el.name == "particle"});
    for(let i=0; i<particles.length; i++)
    {
        let particle = particles[i];
        
        particle.position.y += Math.random() * 0.5 * speedBuffer;
        particle.material.opacity -= 0.005 * speedBuffer;
        particle.material.opacity -= particle.userData.radius * 0.001 * speedBuffer;
        if(particle.position.y >= fireHeight)
        {
            particle.position.y = 0;
            particle.material.opacity = 1;
        }
    }
}
generate();
//-------------- Set Camera Position: -----------------------------
camera.position.set(0,10,200);
camera.lookAt({x:0,y:0,z:0});
//-------------- Floor: -------------------------------------------
Floor:
{
    let geo = new THREE.PlaneGeometry(...planeSize);
    let mat = new THREE.MeshPhongMaterial({color:"rgb(250,250,250)"});
    let mesh = new THREE.Mesh(geo,mat);
    mesh.rotateX(-Math.PI/2);
    scene.add(mesh);
}
//-------------- Light: ------------------------------------------- 
Light:
{
    let light = new THREE.PointLight("rgb(255,102,0)");
    light.position.set(0,10,0);
    scene.add(light);
}
//-------------- Inputs listeners: --------------------------------
document.getElementById("quantity").addEventListener("input",function()
{
    generate();
});
document.getElementById("width").addEventListener("input",function()
{
    generate();
});
//document.getElementById("speed").addEventListener("input",function(){inputs.speed = this.value});
//document.getElementById("material").addEventListener("input",function(){inputs.hasMaterial = this.checked});
document.getElementById("blend").addEventListener("input",function()
{
    updateBlending();
});
//document.getElementById("opacity").addEventListener("input",function(){inputs.hasOpacity = this.checked});

//-------------- Renderer: ----------------------------------------
renderer.setClearColor(clearColor);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvasContainer").appendChild(renderer.domElement);

//-------------- Stats: -------------------------------------------
stats.showPanel(0);
document.body.appendChild(stats.dom );


//var fire2 = new Fire().getObject3d();
//console.log(fire2);
//fire2.position.set(0,50,0);
//scene.add(fire2)


function render()
{
    updateParticles(document.getElementById("speed").valueAsNumber);
    stats.begin();
    stats.end(); 
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    fire2.userData.updateParticles();
}

render();
        