class Fire
{
    constructor()
    {
        this.object3d = new THREE.Object3D();
    }
    getObject3d()
    {
        const particleSize = [3,3,3];
        const fireHeight = 25;
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
            const quantity = 300
            const particles = scene.children.filter((el)=>{return el.name == "particle"});
            const maxSpread = 23;
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
        this.object3d.userData.updateParticles = function()
        {
            const speedBuffer = 1.2;
            const particles = that.object3d.children.filter((el)=>{return el.name == "particle"});
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
        return this.object3d;
    }
    updateParticles()
    {
        
    }
}