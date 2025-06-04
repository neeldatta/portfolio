// Sword creation and management
class Sword {
    constructor(scene) {
        this.scene = scene;
        this.sword = null;
    }

    create() {
        const swordGroup = new THREE.Group();

        // Blade
        const bladeGeometry = new THREE.BoxGeometry(0.1, 1.2, 0.02);
        const bladeMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xFFFFFF, // Brighter silver color
            metalness: 1.0,
            roughness: 0.1, // Reduced roughness for more shine
            envMapIntensity: 1.5, // Increased environment map intensity
            emissive: 0x444444, // Added slight glow
            emissiveIntensity: 0.2
        });
        const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
        blade.position.y = 0.6;
        blade.castShadow = true;
        blade.receiveShadow = true;
        swordGroup.add(blade);

        // Forged glow effect at tip of blade
        const glowGeometry = new THREE.BoxGeometry(0.11, 0.3, 0.03);
        const glowMaterial = new THREE.MeshStandardMaterial({
            color: 0xFF4500, // Orange-red color
            metalness: 0.5,
            roughness: 0.3,
            emissive: 0xFF4500,
            emissiveIntensity: 0.8,
            transparent: true,
            opacity: 0.7
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.set(0, 1.2, 0); // Position at tip of blade
        glow.castShadow = true;
        swordGroup.add(glow);

        // Add point light for the glow effect
        const glowLight = new THREE.PointLight(0xFF4500, 1, 2);
        glowLight.position.set(0, 1.2, 0);
        swordGroup.add(glowLight);

        // Blade tip
        const tipGeometry = new THREE.ConeGeometry(0.05, 0.2, 4);
        const tipMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xFFFFFF, // Matching brighter silver
            metalness: 1.0,
            roughness: 0.1,
            envMapIntensity: 1.5,
            emissive: 0x444444,
            emissiveIntensity: 0.2
        });
        const tip = new THREE.Mesh(tipGeometry, tipMaterial);
        tip.position.set(0, 1.3, 0);
        tip.rotation.x = Math.PI / 2;
        tip.castShadow = true;
        swordGroup.add(tip);

        // Cross guard
        const guardGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.05);
        const guardMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, // Dark brown for the guard
            metalness: 0.8,
            roughness: 0.3
        });
        const guard = new THREE.Mesh(guardGeometry, guardMaterial);
        guard.position.set(0, 0.1, 0);
        guard.castShadow = true;
        swordGroup.add(guard);

        // Handle
        const handleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.2);
        const handleMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, // Dark brown for the handle
            metalness: 0.5,
            roughness: 0.8
        });
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.position.set(0, -0.1, 0);
        handle.castShadow = true;
        swordGroup.add(handle);

        // Pommel (end cap)
        const pommelGeometry = new THREE.SphereGeometry(0.03, 16, 16);
        const pommelMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xC0C0C0, // Silver color
            metalness: 1.0,
            roughness: 0.2
        });
        const pommel = new THREE.Mesh(pommelGeometry, pommelMaterial);
        pommel.position.set(0, -0.2, 0);
        pommel.castShadow = true;
        swordGroup.add(pommel);

        // Position the sword leaning against the anvil
        swordGroup.position.set(-1.2, 1.45, -3.0);
        swordGroup.rotation.set(Math.PI, 0, 0); // Completely vertical with tip pointing down

        this.sword = swordGroup;
        this.scene.add(swordGroup);
    }
}

// Make Sword available globally
window.Sword = Sword; 