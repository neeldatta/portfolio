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
        this.music = null;
        this.isMusicPlaying = false;
    }

    async init() {
        try {
            // Initialize Three.js scene
            this.sceneManager = new SceneManager();
            await this.sceneManager.init();
            
            this.scene = this.sceneManager.scene;
            this.camera = this.sceneManager.camera;
            this.renderer = this.sceneManager.renderer;

            // Initialize music
            this.initMusic();

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

            // Expose interaction controller to window
            window.interactionController = this.interactionController;

            // Start animation loop
            this.animate();

            // Show ready state after loading
            this.showReadyState();
            
            this.isLoaded = true;
            console.log('🔥 Campfire Portfolio loaded successfully!');
            
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }

    initMusic() {
        this.music = document.getElementById('background-music');
        const musicButton = document.getElementById('music-button');
        const musicIcon = musicButton.querySelector('.music-icon');

        // Set initial state
        musicButton.classList.add('playing');
        this.isMusicPlaying = true;

        musicButton.addEventListener('click', () => {
            if (this.isMusicPlaying) {
                this.music.pause();
                musicButton.classList.remove('playing');
                musicIcon.textContent = '♫̶'; // Crossed out music note
            } else {
                this.music.play();
                musicButton.classList.add('playing');
                musicIcon.textContent = '♫'; // Regular music note
            }
            this.isMusicPlaying = !this.isMusicPlaying;
        });
    }

    showReadyState() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            const loadingText = loadingScreen.querySelector('.loading-text');
            const enterText = loadingScreen.querySelector('.enter-text');
            
            // Fade out loading text
            loadingText.style.opacity = '0';
            
            // Show enter text
            setTimeout(() => {
                loadingText.style.display = 'none';
                enterText.style.display = 'block';
                loadingScreen.classList.add('ready');
                
                // Add click handler for entering
                loadingScreen.addEventListener('click', () => {
                    this.enterScene();
                }, { once: true });
            }, 500);
        }, 2000);
    }

    enterScene() {
        const loadingScreen = document.getElementById('loading-screen');
        const container = document.getElementById('container');
        const instructions = document.getElementById('instructions');
        
        // Start music
        this.music.play().then(() => {
            console.log('🎵 Music started');
        }).catch(error => {
            console.log('🎵 Could not start music:', error);
            this.isMusicPlaying = false;
            document.getElementById('music-button').classList.remove('playing');
        });
        
        // Fade out loading screen
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 1s ease-out';
        
        // Show container and instructions
        container.style.display = 'block';
        if (instructions) {
            instructions.style.display = 'block';
        }
        
        // Remove loading screen after fade
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
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
            fireLight.intensity = 2.2 + Math.sin(time * 12) * 0.3 + Math.random() * 0.2;
        }
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