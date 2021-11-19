class Campfire extends THREE.Object3D{
    constructor(parameters = {numberOfParticles:300, particleSpeed:1.2, width:23, fireHeight:25 }){
        super();
        this.userData.width = parameters.width || 23;
        this.userData.numberOfParticles = parameters.numberOfParticles || 300;
        this.userData.particleSpeed = parameters.particleSpeed || 1.2;
        this.userData.fireHeight = parameters.fireHeight || 25;

        const particleSize = [3,3,3];
        const fireHeight = this.userData.fireHeight;
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
            const quantity = that.userData.numberOfParticles;
            const particles = that.children.filter((el)=>{return el.name == "particle"});
            const maxSpread = that.userData.width;
            particles.map((el)=>{that.remove(el)});
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
                that.add(mesh);
            }
        }  
        const light = new THREE.PointLight("rgb(255,102,0)");

        light.position.set(0,10,0);
        this.add(light);
        generate();
    }
    updateParticles(timeDelta)
    {
        let updatedDelta = timeDelta * 0.12;
        let particles = this.children.filter((el)=>{return el.name == "particle"});
        for(let i=0; i<particles.length; i++)
        {
            let particle = particles[i];

            particle.position.y += Math.random() * 0.5 * this.userData.particleSpeed * updatedDelta;
            particle.material.opacity -= 0.005 * this.userData.particleSpeed * updatedDelta;
            particle.material.opacity -= particle.userData.radius * 0.001 * this.userData.particleSpeed * updatedDelta;
            if(particle.position.y >= this.userData.fireHeight)
            {
                particle.position.y = 0;
                particle.material.opacity = 1;
            }
        }
    }
}
