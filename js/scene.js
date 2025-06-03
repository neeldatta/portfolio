// Scene management and Three.js setup
class SceneManager {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
    }

    async init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0a0a0a, 20, 100);

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 8, 4);

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x0a0a0a);
        this.renderer.shadowMap.enabled = false;
        
        // Add renderer to DOM
        document.getElementById('container').appendChild(this.renderer.domElement);

        // Setup lighting
        this.setupLighting();
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);

        // Fire light
        const fireLight = new THREE.PointLight(0xff6600, 3, 25);
        fireLight.position.set(0, 2, 0);
        fireLight.castShadow = false;
        this.scene.add(fireLight);

        // Moon light
        const moonLight = new THREE.DirectionalLight(0x6699ff, 0.5);
        moonLight.position.set(10, 20, 5);
        moonLight.castShadow = false;
        this.scene.add(moonLight);
    }
}