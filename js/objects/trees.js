class Trees {
    constructor(scene) {
        this.scene = scene;
        this.campfireRadius = 3; // Minimum distance from campfire
        this.viewCorridorWidth = 4; // Width of clear area behind camera
        this.viewCorridorDepth = 12; // Depth of clear area behind camera
    }

    isTooCloseToCampfire(x, z) {
        const distance = Math.sqrt(x * x + z * z);
        return distance < this.campfireRadius;
    }

    isInViewCorridor(x, z) {
        return Math.abs(x) < this.viewCorridorWidth/2 && z > -this.viewCorridorDepth && z < 0;
    }

    create() {
        this.createMainTrees();
        this.createBackgroundTrees();
    }

    createMainTrees() {
        // Create 14 main trees (reduced from 20 by 30%)
        for (let i = 0; i < 14; i++) {
            // Generate random position in a circle
            const angle = Math.random() * Math.PI * 2;
            const radius = 12 + Math.random() * 8; // Between 12 and 20 units from center (increased from 8-15)
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            // Skip if too close to campfire or in view corridor
            if (this.isTooCloseToCampfire(x, z) || this.isInViewCorridor(x, z)) {
                continue;
            }

            // Randomly choose between coniferous and deciduous (70/30 ratio)
            const isConiferous = Math.random() < 0.7;
            this.createTree(x, z, isConiferous, 1.0 + Math.random() * 0.5); // Scale between 1.0 and 1.5
        }
    }

    createBackgroundTrees() {
        // Create 21 background trees (reduced from 30 by 30%)
        for (let i = 0; i < 21; i++) {
            // Generate random position in a larger circle
            const angle = Math.random() * Math.PI * 2;
            const radius = 20 + Math.random() * 15; // Between 20 and 35 units from center (increased from 15-25)
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            // Skip if too close to campfire or in view corridor
            if (this.isTooCloseToCampfire(x, z) || this.isInViewCorridor(x, z)) {
                continue;
            }

            // Randomly choose between coniferous and deciduous (70/30 ratio)
            const isConiferous = Math.random() < 0.7;
            this.createTree(x, z, isConiferous, 0.8 + Math.random() * 0.4); // Scale between 0.8 and 1.2
        }
    }

    createTree(x, z, isConiferous, scale) {
        // Create trunk
        const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 8);
        const trunkMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4d2926,
            roughness: 0.9,
            metalness: 0.1
        });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(x, 1, z);
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        this.scene.add(trunk);

        if (isConiferous) {
            // Create coniferous (spiky) tree with multiple layers
            const foliageColors = [0x1a5a1a, 0x2d4a2d, 0x3d6a3d]; // Different shades of green
            const foliageLayers = 3;

            for (let i = 0; i < foliageLayers; i++) {
                const foliageGeometry = new THREE.ConeGeometry(
                    1.5 * scale * (1 - i * 0.2),
                    2 * scale * (1 - i * 0.1),
                    8
                );
                const foliageMaterial = new THREE.MeshStandardMaterial({
                    color: foliageColors[i % foliageColors.length],
                    roughness: 0.8,
                    metalness: 0.1
                });
                const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
                foliage.position.set(x, 2 * scale + i * 0.8 * scale, z);
                foliage.castShadow = true;
                foliage.receiveShadow = true;
                this.scene.add(foliage);
            }
        } else {
            // Create deciduous (round) tree
            const foliageGeometry = new THREE.SphereGeometry(1.2 * scale, 8, 8);
            const foliageMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x2d4a2d,
                roughness: 0.8,
                metalness: 0.1
            });
            const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
            foliage.position.set(x, 2.5 * scale, z);
            foliage.castShadow = true;
            foliage.receiveShadow = true;
            this.scene.add(foliage);

            // Add a second, slightly smaller sphere for more natural look
            const innerFoliageGeometry = new THREE.SphereGeometry(0.9 * scale, 8, 8);
            const innerFoliageMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x3d6a3d,
                roughness: 0.8,
                metalness: 0.1
            });
            const innerFoliage = new THREE.Mesh(innerFoliageGeometry, innerFoliageMaterial);
            innerFoliage.position.set(x, 2.5 * scale, z);
            innerFoliage.castShadow = true;
            innerFoliage.receiveShadow = true;
            this.scene.add(innerFoliage);
        }

        // Add random rotation
        const rotation = Math.random() * Math.PI * 2;
        trunk.rotation.y = rotation;
    }
} 