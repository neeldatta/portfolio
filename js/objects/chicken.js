// Chicken creation and management
class Chicken {
    constructor(scene) {
        this.scene = scene;
        this.chicken = null;
        this.chicks = [];
    }

    createChick(x, z, scale = 0.5) {
        const chickGroup = new THREE.Group();

        // Body
        const bodyGeometry = new THREE.SphereGeometry(0.3 * scale, 16, 16);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xFFFFE0, // Lighter yellow for chicks
            roughness: 0.8
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.3 * scale;
        body.scale.set(1, 1.2, 1);
        body.castShadow = true;
        body.receiveShadow = true;
        chickGroup.add(body);

        // Head
        const headGeometry = new THREE.SphereGeometry(0.15 * scale, 16, 16);
        const headMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xFFFFE0,
            roughness: 0.8
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0.2 * scale, 0.5 * scale, 0);
        head.castShadow = true;
        chickGroup.add(head);

        // Beak
        const beakGeometry = new THREE.ConeGeometry(0.05 * scale, 0.1 * scale, 4);
        const beakMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xFFA500,
            roughness: 0.8
        });
        const beak = new THREE.Mesh(beakGeometry, beakMaterial);
        beak.position.set(0.35 * scale, 0.5 * scale, 0);
        beak.rotation.z = -Math.PI / 2;
        chickGroup.add(beak);

        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.02 * scale, 0.02 * scale, 0.3 * scale);
        const legMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xFFD700,
            roughness: 0.8
        });

        // Left leg
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(0.1 * scale, 0.15 * scale, 0.1 * scale);
        leftLeg.castShadow = true;
        chickGroup.add(leftLeg);

        // Right leg
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(0.1 * scale, 0.15 * scale, -0.1 * scale);
        rightLeg.castShadow = true;
        chickGroup.add(rightLeg);

        // Position the chick
        chickGroup.position.set(x, 0, z);
        chickGroup.rotation.y = -Math.PI / 2; // Face towards the anvil

        // Add animation properties
        chickGroup.userData = {
            isChick: true,
            time: Math.random() * 10, // Random start time for varied movement
            bobSpeed: 0.08, // Slightly faster bobbing for chicks
            originalY: chickGroup.position.y
        };

        return chickGroup;
    }

    create() {
        const chickenGroup = new THREE.Group();

        // Body
        const bodyGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xFFFFFF,
            roughness: 0.8
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.3;
        body.scale.set(1, 1.2, 1);
        body.castShadow = true;
        body.receiveShadow = true;
        chickenGroup.add(body);

        // Head
        const headGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const headMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xFFD700,
            roughness: 0.8
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0.2, 0.5, 0);
        head.castShadow = true;
        chickenGroup.add(head);

        // Beak
        const beakGeometry = new THREE.ConeGeometry(0.05, 0.1, 4);
        const beakMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xFFA500,
            roughness: 0.8
        });
        const beak = new THREE.Mesh(beakGeometry, beakMaterial);
        beak.position.set(0.35, 0.5, 0);
        beak.rotation.z = -Math.PI / 2;
        chickenGroup.add(beak);

        // Comb
        const combGeometry = new THREE.BoxGeometry(0.1, 0.15, 0.05);
        const combMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xFF0000,
            roughness: 0.8
        });
        const comb = new THREE.Mesh(combGeometry, combMaterial);
        comb.position.set(0.2, 0.65, 0);
        chickenGroup.add(comb);

        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3);
        const legMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xFFD700,
            roughness: 0.8
        });

        // Left leg
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(0.1, 0.15, 0.1);
        leftLeg.castShadow = true;
        chickenGroup.add(leftLeg);

        // Right leg
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(0.1, 0.15, -0.1);
        rightLeg.castShadow = true;
        chickenGroup.add(rightLeg);

        // Wings
        const wingGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.05);
        const wingMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xFFFFFF,
            roughness: 0.8
        });

        // Left wing
        const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
        leftWing.position.set(0, 0.3, 0.3);
        leftWing.rotation.x = Math.PI / 4;
        leftWing.castShadow = true;
        chickenGroup.add(leftWing);

        // Right wing
        const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
        rightWing.position.set(0, 0.3, -0.3);
        rightWing.rotation.x = -Math.PI / 4;
        rightWing.castShadow = true;
        chickenGroup.add(rightWing);

        // Position the chicken next to the anvil
        chickenGroup.position.set(1.5, 0, -4);
        chickenGroup.rotation.y = -Math.PI / 2;

        // Add animation properties
        chickenGroup.userData = {
            isChicken: true,
            time: 0,
            bobSpeed: 0.05,
            originalY: chickenGroup.position.y
        };

        this.chicken = chickenGroup;
        this.scene.add(chickenGroup);

        // Create chicks
        const chick1 = this.createChick(2.2, -4, 0.4); // First chick
        const chick2 = this.createChick(2.5, -3.8, 0.35); // Second chick
        const chick3 = this.createChick(2.3, -4.2, 0.45); // Third chick

        this.chicks = [chick1, chick2, chick3];
        this.chicks.forEach(chick => this.scene.add(chick));
    }

    update() {
        if (this.chicken) {
            // Update main chicken
            this.chicken.userData.time += this.chicken.userData.bobSpeed;
            this.chicken.position.y = this.chicken.userData.originalY + 
                Math.sin(this.chicken.userData.time) * 0.05;

            // Occasional head movement
            if (Math.sin(this.chicken.userData.time * 2) > 0.8) {
                const head = this.chicken.children[1];
                head.rotation.y = Math.sin(this.chicken.userData.time * 3) * 0.2;
            }
        }

        // Update chicks
        this.chicks.forEach(chick => {
            chick.userData.time += chick.userData.bobSpeed;
            chick.position.y = chick.userData.originalY + 
                Math.sin(chick.userData.time) * 0.03; // Smaller bobbing for chicks

            // Occasional head movement for chicks
            if (Math.sin(chick.userData.time * 2) > 0.8) {
                const head = chick.children[1];
                head.rotation.y = Math.sin(chick.userData.time * 3) * 0.3;
            }
        });
    }
}

// Make Chicken available globally
window.Chicken = Chicken; 