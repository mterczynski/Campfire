class Campfire
{
    constructor(parametrsObject = {numberOfParticles:300, particleSpeed:1.2, width:23, fireHeight:25 })
    {
        this.object3d = new THREE.Object3D();
        this.width = parametrsObject.width || 23;
        this.numberOfParticles = parametrsObject.numberOfParticles || 300;
        this.particleSpeed = parametrsObject.particleSpeed || 1.2;
        this.fireHeight = parametrsObject.fireHeight || 25;
    }
    getNewObject3d()
    {
        const particleSize = [3,3,3];
        const fireHeight = this.fireHeight;
        const that = this; // reference to main object
        const particleMaterial = new THREE.MeshBasicMaterial
        ({
            color: "rgb(255,102,0)",
            transparent: true,
            opacity: 0.5,
            depthWrite: false,
            blending: THREE.AdditiveBlending 
        });
        const generate = function()
        {
            const quantity = that.numberOfParticles;
            const particles = scene.children.filter((el)=>{return el.name == "particle"});
            const maxSpread = that.width;
            particles.map((el)=>{that.object3d.remove(el)});
            for(let i=0; i<quantity; i++)
            {
                const geo = new THREE.BoxGeometry(...particleSize);
                const mesh = new THREE.Mesh(geo,particleMaterial.clone());
                const x = Math.floor(Math.random()*maxSpread - maxSpread/2);
                const y = Math.floor(Math.random()*fireHeight);
                const z = Math.floor(Math.random()*maxSpread - maxSpread/2);
                mesh.name = "particle";
                mesh.userData.radius = Math.hypot(x,z);
                mesh.position.set(x,y,z);
                that.object3d.add(mesh);
            }
        }  
        const light = new THREE.PointLight("rgb(255,102,0)");
        
        light.position.set(0,10,0);
        this.object3d.add(light);
        generate();
        return this.object3d;
    }
    updateParticles()
    {
        let particles = this.object3d.children.filter((el)=>{return el.name == "particle"});
        for(let i=0; i<particles.length; i++)
        {
            let particle = particles[i];

            particle.position.y += Math.random() * 0.5 * this.particleSpeed;
            particle.material.opacity -= 0.005 * this.particleSpeed;
            particle.material.opacity -= particle.userData.radius * 0.001 * this.particleSpeed;
            if(particle.position.y >= this.fireHeight)
            {
                particle.position.y = 0;
                particle.material.opacity = 1;
            }
        }
    }
}