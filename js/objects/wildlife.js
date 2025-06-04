class Wildlife {
    constructor(scene) {
        this.scene = scene;
        this.campfireRadius = 3; // Minimum distance from campfire (0,0,0)
        this.welcomeRadius = 4; // Minimum distance from welcome text
    }

    // Helper function to check if position is too close to campfire or welcome text
    isTooCloseToCampfire(x, z) {
        const distanceToCampfire = Math.sqrt(x * x + z * z);
        const distanceToWelcome = Math.sqrt((x - 0) * (x - 0) + (z - 3) * (z - 3)); // Welcome text is at (0, 0, 3)
        return distanceToCampfire < this.campfireRadius || distanceToWelcome < this.welcomeRadius;
    }

    create() {
        this.createMushrooms();
        this.createRabbits();
        this.createSmallPlants();
    }

    createMushrooms() {
        // Create different types of mushrooms
        const mushroomTypes = [
            { capColor: 0xff0000, stemColor: 0xffffff }, // Red with white stem
            { capColor: 0x8B4513, stemColor: 0xf5f5dc }, // Brown with beige stem
            { capColor: 0xffff00, stemColor: 0xffffff }  // Yellow with white stem
        ];

        // Create 8 mushrooms (reduced from 15)
        for (let i = 0; i < 8; i++) {
            const type = mushroomTypes[Math.floor(Math.random() * mushroomTypes.length)];
            const mushroomGroup = new THREE.Group();

            // Mushroom cap
            const capGeometry = new THREE.SphereGeometry(0.15, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2);
            const capMaterial = new THREE.MeshLambertMaterial({ color: type.capColor });
            const cap = new THREE.Mesh(capGeometry, capMaterial);
            cap.position.y = 0.1;
            mushroomGroup.add(cap);

            // Mushroom stem
            const stemGeometry = new THREE.CylinderGeometry(0.03, 0.05, 0.2, 8);
            const stemMaterial = new THREE.MeshLambertMaterial({ color: type.stemColor });
            const stem = new THREE.Mesh(stemGeometry, stemMaterial);
            stem.position.y = -0.1;
            mushroomGroup.add(stem);

            // Random position within a radius of 20 units from center
            let x, z;
            do {
                const radius = Math.random() * 20;
                const angle = Math.random() * Math.PI * 2;
                x = radius * Math.cos(angle);
                z = radius * Math.sin(angle);
            } while (this.isTooCloseToCampfire(x, z));

            mushroomGroup.position.set(x, 0, z);

            // Random rotation
            mushroomGroup.rotation.y = Math.random() * Math.PI * 2;

            this.scene.add(mushroomGroup);
        }
    }

    createRabbits() {
        // Create 5 rabbits
        for (let i = 0; i < 5; i++) {
            const rabbitGroup = new THREE.Group();

            // Rabbit body
            const bodyGeometry = new THREE.SphereGeometry(0.2, 8, 8);
            const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 }); // Gray
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            rabbitGroup.add(body);

            // Rabbit head
            const headGeometry = new THREE.SphereGeometry(0.15, 8, 8);
            const headMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
            const head = new THREE.Mesh(headGeometry, headMaterial);
            head.position.set(0.2, 0.1, 0);
            rabbitGroup.add(head);

            // Rabbit ears
            const earGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8);
            const earMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
            
            const leftEar = new THREE.Mesh(earGeometry, earMaterial);
            leftEar.position.set(0.2, 0.25, 0.05);
            leftEar.rotation.x = Math.PI / 6;
            rabbitGroup.add(leftEar);

            const rightEar = new THREE.Mesh(earGeometry, earMaterial);
            rightEar.position.set(0.2, 0.25, -0.05);
            rightEar.rotation.x = -Math.PI / 6;
            rabbitGroup.add(rightEar);

            // Random position within a radius of 25 units from center
            let x, z;
            do {
                const radius = Math.random() * 25;
                const angle = Math.random() * Math.PI * 2;
                x = radius * Math.cos(angle);
                z = radius * Math.sin(angle);
            } while (this.isTooCloseToCampfire(x, z));

            rabbitGroup.position.set(x, 0.2, z);

            // Random rotation
            rabbitGroup.rotation.y = Math.random() * Math.PI * 2;

            this.scene.add(rabbitGroup);
        }
    }

    createSmallPlants() {
        const plantTypes = [
            { color: 0x228B22, height: 0.3 }, // Forest green
            { color: 0x32CD32, height: 0.4 }, // Lime green
            { color: 0x006400, height: 0.25 } // Dark green
        ];

        // Create 300 small plants (increased from 200)
        for (let i = 0; i < 300; i++) {
            const type = plantTypes[Math.floor(Math.random() * plantTypes.length)];
            const plantGroup = new THREE.Group();

            // Create 4-6 blades of grass/leaves (increased from 3-5)
            const bladeCount = 4 + Math.floor(Math.random() * 3);
            for (let j = 0; j < bladeCount; j++) {
                const bladeGeometry = new THREE.CylinderGeometry(0.01, 0.02, type.height, 4);
                const bladeMaterial = new THREE.MeshLambertMaterial({ color: type.color });
                const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
                
                // Random position within a small radius
                const bladeRadius = Math.random() * 0.1;
                const bladeAngle = Math.random() * Math.PI * 2;
                blade.position.set(
                    bladeRadius * Math.cos(bladeAngle),
                    type.height / 2,
                    bladeRadius * Math.sin(bladeAngle)
                );
                
                // Random slight rotation
                blade.rotation.x = (Math.random() - 0.5) * 0.2;
                blade.rotation.z = (Math.random() - 0.5) * 0.2;
                
                plantGroup.add(blade);
            }

            // Random position within a radius of 30 units from center
            let x, z;
            do {
                const radius = Math.random() * 30;
                const angle = Math.random() * Math.PI * 2;
                x = radius * Math.cos(angle);
                z = radius * Math.sin(angle);
            } while (this.isTooCloseToCampfire(x, z));

            plantGroup.position.set(x, 0, z);

            this.scene.add(plantGroup);
        }
    }
} 