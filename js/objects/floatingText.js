class FloatingText {
    constructor(scene) {
        this.scene = scene;
        this.textGroup = new THREE.Group();
        this.initialY = 4; // Height above the fire
        this.animationSpeed = 0.3;
        this.animationOffset = 0;
    }

    create() {
        // Create text geometry
        const loader = new THREE.FontLoader();
        
        // Load the font
        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            // Create "Welcome!" text
            const welcomeGeometry = new THREE.TextGeometry('Welcome!', {
                font: font,
                size: 1.5, // Slightly larger for single word
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.03,
                bevelOffset: 0,
                bevelSegments: 5
            });

            // Center the geometry
            welcomeGeometry.computeBoundingBox();
            const welcomeWidth = welcomeGeometry.boundingBox.max.x - welcomeGeometry.boundingBox.min.x;
            
            // Create materials with a glowing effect
            const material = new THREE.MeshPhongMaterial({
                color: 0xffd700, // Golden color
                emissive: 0x664400, // Warm glow
                specular: 0xffffff,
                shininess: 100
            });

            // Create mesh
            const welcomeMesh = new THREE.Mesh(welcomeGeometry, material);

            // Position the text centered
            welcomeMesh.position.set(-welcomeWidth/2, this.initialY, -2);

            // Add to group
            this.textGroup.add(welcomeMesh);

            // Add to scene
            this.scene.add(this.textGroup);
        });
    }

    update(time) {
        // Very gentle floating animation
        this.textGroup.position.y = this.initialY + Math.sin(time * this.animationSpeed + this.animationOffset) * 0.15;
        
        // Minimal rotation
        this.textGroup.rotation.y = Math.sin(time * 0.1) * 0.03;
    }
} 