// Anvil creation and management
class Anvil {
    constructor(scene) {
        this.scene = scene;
        this.anvil = null;
    }

    create() {
        const anvilGroup = new THREE.Group();

        // Main body of the anvil
        const bodyGeometry = new THREE.BoxGeometry(1.5, 0.8, 1.2);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x222222,
            metalness: 0.9,
            roughness: 0.3
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.4;
        body.castShadow = true;
        body.receiveShadow = true;
        anvilGroup.add(body);

        // Horn of the anvil
        const hornGeometry = new THREE.ConeGeometry(0.4, 1.2, 4);
        const hornMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x222222,
            metalness: 0.9,
            roughness: 0.3
        });
        const horn = new THREE.Mesh(hornGeometry, hornMaterial);
        horn.position.set(0.8, 1.0, 0);
        horn.rotation.z = -Math.PI / 2;
        horn.castShadow = true;
        anvilGroup.add(horn);

        // Base of the anvil
        const baseGeometry = new THREE.BoxGeometry(1.8, 0.4, 1.5);
        const baseMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x1a1a1a,
            metalness: 0.9,
            roughness: 0.3
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = 0.2;
        base.castShadow = true;
        base.receiveShadow = true;
        anvilGroup.add(base);

        // Position the anvil further behind the campfire and to the left
        anvilGroup.position.set(-1.5, 0, -4);
        anvilGroup.rotation.y = Math.PI; // Face towards the campfire

        // Add some wear and tear texture
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('textures/metal_scratch.jpg', (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 2);
            bodyMaterial.map = texture;
            hornMaterial.map = texture;
            baseMaterial.map = texture;
            bodyMaterial.needsUpdate = true;
            hornMaterial.needsUpdate = true;
            baseMaterial.needsUpdate = true;
        });

        this.anvil = anvilGroup;
        this.scene.add(anvilGroup);
    }
}

// Make Anvil available globally
window.Anvil = Anvil; 