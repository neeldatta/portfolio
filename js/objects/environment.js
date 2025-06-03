// Environment creation - ground, trees, stars
class Environment {
    constructor(scene) {
        this.scene = scene;
    }

    create() {
        this.createGround();
        this.createCampfire();
        this.createDesk();
        this.createTent();
        this.createWildlife();
    }

    createGround() {
        // Create ground plane
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1a1a1a,
            roughness: 0.8,
            metalness: 0.2
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }

    createCampfire() {
        const campfire = new Campfire(this.scene);
        campfire.create();
    }

    createDesk() {
        const desk = new Desk(this.scene);
        desk.create();
    }

    createTent() {
        const tent = new Tent(this.scene);
        tent.create();
    }

    createWildlife() {
        const wildlife = new Wildlife(this.scene);
        wildlife.create();
    }
}