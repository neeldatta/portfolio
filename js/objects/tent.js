class Tent {
    constructor(scene) {
        this.scene = scene;
    }

    create() {
        const tentGroup = new THREE.Group();

        // Tent canvas
        const canvasGeometry = new THREE.ConeGeometry(1.5, 2.5, 4);
        const canvasMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xd2b48c,  // Brownish-tan color
            transparent: false
        });
        const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
        canvas.position.y = 1.25;
        canvas.rotation.y = Math.PI / 4;
        canvas.scale.set(1, 1, 1.5);
        tentGroup.add(canvas);

        // Tent entrance (simple rectangular cutout)
        const entranceGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.1);
        const entranceMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x000000,  // Black for the cutout
            transparent: true,
            opacity: 0
        });
        const entrance = new THREE.Mesh(entranceGeometry, entranceMaterial);
        entrance.position.set(0.8, 0.6, 0);
        entrance.rotation.y = Math.PI / 4;
        tentGroup.add(entrance);

        // Position tent to the left and back of the campfire
        tentGroup.position.set(-5, 0, -3);
        tentGroup.rotation.y = -Math.PI / 2 + Math.PI / 12; // -90 degrees + 15 degrees

        this.scene.add(tentGroup);
    }
} 