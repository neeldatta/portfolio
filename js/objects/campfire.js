// Campfire creation and fire particle system
class Campfire {
    constructor(scene) {
        this.scene = scene;
        this.fireParticles = [];
        this.smokeParticles = [];
        this.isLit = false;
        this.position = new THREE.Vector3(-2, 0, 10.5); // Moved left by 2 units
    }

    create() {
        this.createFirePit();
        this.createFireParticles();
        this.createPerimeterTorches();
    }

    createFirePit() {
        const fireGroup = new THREE.Group();

        // Wooden sign
        const signGroup = new THREE.Group();
        
        // Sign post
        const postGeometry = new THREE.CylinderGeometry(0.08, 0.1, 2, 8); // Scaled down post
        const postMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8B4513,
            roughness: 0.8
        });
        const post = new THREE.Mesh(postGeometry, postMaterial);
        post.position.y = 1;
        post.castShadow = true;
        signGroup.add(post);

        // Create canvas for text
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        
        // Draw wooden background
        context.fillStyle = '#A0522D';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some wood grain effect
        context.strokeStyle = '#8B4513';
        context.lineWidth = 2;
        for(let i = 0; i < 20; i++) {
            context.beginPath();
            context.moveTo(0, i * 20);
            context.lineTo(canvas.width, i * 20 + Math.random() * 10);
            context.stroke();
        }
        
        // Draw the text
        context.fillStyle = '#4a2c2a';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = 'bold 80px Honoria';
        context.fillText(' ABOUT ME.', canvas.width/2, canvas.height/2);

        // Wooden board
        const boardGeometry = new THREE.BoxGeometry(1.5, 0.75, 0.1); // Scaled down board
        const boardMaterial = new THREE.MeshLambertMaterial({ 
            map: new THREE.CanvasTexture(canvas),
            roughness: 0.8
        });
        const board = new THREE.Mesh(boardGeometry, boardMaterial);
        board.position.set(0.75, 1.5, 0); // Adjusted position for smaller board
        board.castShadow = true;
        signGroup.add(board);

        // Position the sign group
        signGroup.position.set(-5.5, 0, 1.5);
        signGroup.rotation.y = Math.PI / 4.5;
        signGroup.userData = {
            isSign: true
        };
        this.scene.add(signGroup);

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
        const particleGeometry = new THREE.SphereGeometry(0.1, 6, 6);
        
        for (let i = 0; i < 20; i++) {
            const particleMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.1 - Math.random() * 0.1, 1, 0.6 + Math.random() * 0.4),
                transparent: true,
                opacity: 0.9
            });
            
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.set(
                (Math.random() - 0.5) * 0.5,
                0.4,
                (Math.random() - 0.5) * 0.5
            );
            
            particle.userData = {
                isFireParticle: true,
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    0.02 + Math.random() * 0.03,
                    (Math.random() - 0.5) * 0.02
                ),
                life: Math.random() * 2 + 1
            };
            
            this.fireParticles.push(particle);
            this.scene.add(particle);
        }
    }

    createPerimeterTorches() {
        const torchCount = 8;
        const radius = 15; // Distance from center

        for (let i = 0; i < torchCount; i++) {
            const angle = (i / torchCount) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            // Create torch group
            const torchGroup = new THREE.Group();

            // Torch post
            const postGeometry = new THREE.CylinderGeometry(0.08, 0.1, 2, 8);
            const postMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x8B4513,
                roughness: 0.8
            });
            const post = new THREE.Mesh(postGeometry, postMaterial);
            post.position.y = 1;
            post.castShadow = true;
            torchGroup.add(post);

            // Torch head (wooden part)
            const headGeometry = new THREE.CylinderGeometry(0.05, 0.08, 0.4, 8);
            const headMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x4a2c2a,
                roughness: 0.9
            });
            const head = new THREE.Mesh(headGeometry, headMaterial);
            head.position.y = 1.8;
            head.castShadow = true;
            torchGroup.add(head);

            // Torch flame particles
            const flameGeometry = new THREE.SphereGeometry(0.15, 6, 6);
            const flameMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.1 - Math.random() * 0.1, 1, 0.6 + Math.random() * 0.4),
                transparent: true,
                opacity: 0.9
            });
            const flame = new THREE.Mesh(flameGeometry, flameMaterial);
            flame.position.y = 2.1;
            flame.userData = {
                isTorchFlame: true,
                originalY: 2.1,
                time: Math.random() * 100
            };
            torchGroup.add(flame);

            // Torch light
            const torchLight = new THREE.PointLight(0xff6600, 1, 10);
            torchLight.position.set(0, 2.1, 0);
            torchGroup.add(torchLight);

            // Position the torch
            torchGroup.position.set(x, 0, z);
            torchGroup.rotation.y = -angle + Math.PI; // Make torches face inward
            this.scene.add(torchGroup);
        }
    }

    updateSceneObjects() {
        const time = Date.now() * 0.001;

        // Update fire particles
        this.scene.traverse((child) => {
            if (child.userData.isFireParticle) {
                child.position.add(child.userData.velocity);
                child.userData.life -= 0.01;
                child.material.opacity = Math.max(0, child.userData.life * 0.5);

                if (child.userData.life <= 0) {
                    child.position.set(
                        (Math.random() - 0.5) * 0.5,
                        0.5,
                        (Math.random() - 0.5) * 0.5
                    );
                    child.userData.life = Math.random() * 2 + 1;
                    child.material.color.setHSL(0.1 - Math.random() * 0.1, 1, 0.5 + Math.random() * 0.3);
                }
            }

            // Update torch flames
            if (child.userData.isTorchFlame) {
                child.userData.time += 0.05;
                child.position.y = child.userData.originalY + Math.sin(child.userData.time) * 0.05;
                child.material.opacity = 0.7 + Math.sin(child.userData.time * 2) * 0.3;
                
                // Update torch light intensity
                const torchLight = child.parent.children.find(c => c.type === 'PointLight');
                if (torchLight) {
                    torchLight.intensity = 0.8 + Math.sin(child.userData.time * 3) * 0.2;
                }
            }
        });
    }
}