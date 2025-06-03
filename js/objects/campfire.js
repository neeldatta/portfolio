// Campfire creation and fire particle system
class Campfire {
    constructor(scene) {
        this.scene = scene;
        this.fireParticles = [];
    }

    create() {
        this.createFirePit();
        this.createFireParticles();
    }

    createFirePit() {
        const fireGroup = new THREE.Group();

        // Fire pit (stones)
        for (let i = 0; i < 8; i++) {
            const stoneGeometry = new THREE.BoxGeometry(0.6, 0.25, 0.4);
            const stoneMaterial = new THREE.MeshLambertMaterial({ color: 0x555555 });
            const stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
            
            const angle = (i / 8) * Math.PI * 2;
            stone.position.set(
                Math.cos(angle) * 1.5,
                0.125,
                Math.sin(angle) * 1.5
            );
            stone.rotation.y = angle;
            stone.castShadow = true;
            fireGroup.add(stone);
        }

        // Logs
        for (let i = 0; i < 4; i++) {
            const logGeometry = new THREE.CylinderGeometry(0.1, 0.15, 1.5, 8);
            const logMaterial = new THREE.MeshLambertMaterial({ color: 0x4a2c2a });
            const log = new THREE.Mesh(logGeometry, logMaterial);
            
            const angle = (i / 4) * Math.PI * 2;
            log.position.set(
                Math.cos(angle) * 0.6,
                0.25,
                Math.sin(angle) * 0.6
            );
            log.rotation.z = Math.PI / 2;
            log.rotation.y = angle;
            log.castShadow = true;
            fireGroup.add(log);
        }

        this.scene.add(fireGroup);
    }

    createFireParticles() {
        const particleGeometry = new THREE.SphereGeometry(0.07, 6, 6);
        
        for (let i = 0; i < 20; i++) {
            const particleMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.1 - Math.random() * 0.1, 1, 0.5 + Math.random() * 0.3),
                transparent: true,
                opacity: 0.8
            });
            
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.set(
                (Math.random() - 0.5) * 0.4,
                0.4,
                (Math.random() - 0.5) * 0.4
            );
            
            particle.userData = {
                isFireParticle: true,
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.015,
                    0.015 + Math.random() * 0.02,
                    (Math.random() - 0.5) * 0.015
                ),
                life: Math.random() * 2 + 1
            };
            
            this.fireParticles.push(particle);
            this.scene.add(particle);
        }
    }
}