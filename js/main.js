// Main application entry point
class CampfirePortfolio {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.sceneManager = null;
        this.navigationController = null;
        this.interactionController = null;
        this.isLoaded = false;
    }

    async init() {
        try {
            // Initialize Three.js scene
            this.sceneManager = new SceneManager();
            await this.sceneManager.init();
            
            this.scene = this.sceneManager.scene;
            this.camera = this.sceneManager.camera;
            this.renderer = this.sceneManager.renderer;

            // Create environment
            const environment = new Environment(this.scene);
            environment.create();

            // Create campfire
            const campfire = new Campfire(this.scene);
            campfire.create();

            // Create desk
            const desk = new Desk(this.scene);
            desk.create();

            // Initialize controls
            this.navigationController = new NavigationController(this.camera, this.renderer);
            this.interactionController = new InteractionController(
                this.camera, 
                this.scene,
                this.navigationController
            );

            // Start animation loop
            this.animate();

            // Hide loading screen
            this.hideLoading();
            
            this.isLoaded = true;
            console.log('🔥 Campfire Portfolio loaded successfully!');
            
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.isLoaded) {
            // Update controls
            this.navigationController?.update();
            this.interactionController?.update();

            // Update scene objects
            this.updateSceneObjects();
        }

        // Render the scene
        this.renderer.render(this.scene, this.camera);
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

            // Update floating objects (scroll, bottle)
            if (child.userData.isFloating) {
                child.userData.time += 0.01;
                child.position.y = child.userData.originalY + Math.sin(child.userData.time) * 0.02;
                child.rotation.y += 0.003;
            }

            // Animate bird
            if (child.userData.isBird) {
                child.userData.time += child.userData.bobSpeed;
                child.position.y = child.userData.originalY + Math.sin(child.userData.time) * 0.3;
                
                // Occasional wing flap
                if (Math.sin(child.userData.time * 3) > 0.8) {
                    child.children.forEach((part, index) => {
                        if (index > 2) { // Wings are children 3 and 4
                            part.rotation.z = Math.sin(time * 10) * 0.3;
                        }
                    });
                }
            }

            // Animate squirrel
            if (child.userData.isSquirrel) {
                child.userData.time += child.userData.lookSpeed;
                // Squirrel occasionally looks around
                child.rotation.y = child.userData.originalRotation + Math.sin(child.userData.time) * 0.5;
                
                // Tail movement
                const tail = child.children.find(c => c.position.z < 0); // The tail
                if (tail) {
                    tail.rotation.x = -0.3 + Math.sin(time * 2) * 0.2;
                }
            }

            // Animate fireflies
            if (child.userData.isFirefly) {
                child.userData.time += child.userData.speed;
                
                // Circular motion
                child.position.x = child.userData.centerX + Math.cos(child.userData.time) * child.userData.radius;
                child.position.z = child.userData.centerZ + Math.sin(child.userData.time) * child.userData.radius;
                
                // Vertical bobbing
                child.position.y = child.userData.originalY + Math.sin(child.userData.time * 2) * 0.2;
                
                // Flickering effect
                child.material.opacity = 0.4 + Math.sin(child.userData.time * 5) * 0.4;
            }

            // Animate rabbit
            if (child.userData.isRabbit) {
                child.userData.time += child.userData.hopSpeed;
                
                // Occasional hopping
                if (Math.sin(child.userData.time) > 0.8) {
                    child.position.y = child.userData.originalY + Math.sin(child.userData.time * 2) * 0.1;
                } else {
                    child.position.y = child.userData.originalY;
                }
                
                // Looking around
                child.rotation.y = Math.sin(child.userData.time * child.userData.lookSpeed) * 0.3;
                
                // Ear twitching
                const ears = child.children.filter(c => c.geometry.type === 'CylinderGeometry');
                ears.forEach((ear, index) => {
                    ear.rotation.x = Math.sin(child.userData.time * 3 + index) * 0.1;
                });
            }
        });

        // Update fire light flickering
        const fireLight = this.scene.children.find(
            child => child.type === 'PointLight' && child.color.getHex() === 0xff6600
        );
        if (fireLight) {
            fireLight.intensity = 1.8 + Math.sin(time * 10) * 0.2 + Math.random() * 0.1;
        }
    }

    hideLoading() {
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('instructions').style.display = 'block';
        }, 2000);
    }

    // Handle window resize
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Global app instance
let app;

// Initialize when page loads
window.addEventListener('load', () => {
    app = new CampfirePortfolio();
    app.init();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (app) {
        app.onWindowResize();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        UI.closeModal();
    }
});