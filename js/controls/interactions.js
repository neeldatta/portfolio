// Handle mouse interactions and object clicking
class InteractionController {
    constructor(camera, scene, navigationController) {
        this.camera = camera;
        this.scene = scene;
        this.navigationController = navigationController;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hasClickedScroll = false;
        
        this.init();
    }

    init() {
        this.addClickHandlers();
        this.addHoverEffects();
    }

    addClickHandlers() {
        document.addEventListener('click', (event) => {
            this.handleClick(event);
        });
    }

    addHoverEffects() {
        document.addEventListener('mousemove', (event) => {
            this.handleHover(event);
        });
    }

    handleClick(event) {
        // Check if loading screen is still visible
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen && loadingScreen.style.display !== 'none') {
            return; // Ignore clicks if loading screen is still visible
        }

        this.updateMousePosition(event);
        
        // Cast ray from camera through mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Find intersected objects
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        
        if (intersects.length > 0) {
            const clickedObject = this.findClickableParent(intersects[0].object);
            
            if (clickedObject) {
                this.handleObjectClick(clickedObject);
            }
        }
    }

    handleHover(event) {
        // Check if loading screen is still visible
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen && loadingScreen.style.display !== 'none') {
            return; // Ignore hover effects if loading screen is still visible
        }

        this.updateMousePosition(event);
        
        // Cast ray for hover effects
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        
        // Reset cursor
        document.body.style.cursor = 'crosshair';
        
        if (intersects.length > 0) {
            const hoveredObject = this.findClickableParent(intersects[0].object);
            
            if (hoveredObject) {
                document.body.style.cursor = 'pointer';
                this.addHoverGlow(hoveredObject);
            }
        }
        
        // Remove glow from non-hovered objects
        this.removeHoverGlow();
    }

    updateMousePosition(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    findClickableParent(object) {
        let current = object;
        
        while (current) {
            if (current.userData) {
                if (current.userData.isDesk || 
                    current.userData.isScroll || 
                    current.userData.isBottle ||
                    current.userData.isSign ||
                    current.userData.isMug ||
                    current.userData.isCampfire) {
                    return current;
                }
            }
            current = current.parent;
        }
        
        return null;
    }

    handleObjectClick(object) {
        const userData = object.userData;
        
        if (userData.isDesk) {
            console.log('🪑 Clicked on desk - zooming in...');
            this.navigationController.zoomToDesk();
            
        } else if (userData.isScroll) {
            console.log('📜 Clicked on scroll - opening portfolio...');
            this.hasClickedScroll = true;
            UI.showPortfolio();
            
        } else if (userData.isBottle) {
            console.log('🍾 Clicked on bottle - opening contact...');
            UI.showContact();
        } else if (userData.isSign) {
            console.log('📝 Clicked on sign - opening about me...');
            this.navigationController.zoomToAbout();
            UI.showAbout();
        } else if (userData.isMug) {
            console.log('☕ Clicked on mug - opening mug panel...');
            UI.showMug();
        } else if (userData.isCampfire) {
            console.log('🔥 Clicked on campfire - zooming in...');
            // First zoom to campfire
            this.navigationController.zoomToCampfire();
            
            // Comment out the slider functionality
            /*
            // Then show controls after a short delay to allow zoom to complete
            setTimeout(() => {
                // Find the campfire instance
                const campfire = this.scene.children.find(
                    child => child.userData && child.userData.isCampfire
                );
                if (campfire) {
                    UI.showCampfireControls(campfire);
                }
            }, 1000); // Wait for 1 second to allow zoom animation to complete
            */
        }
    }

    addHoverGlow(object) {
        // Simple glow effect by slightly scaling the object
        if (object.userData.isHovering) return;
        
        object.userData.isHovering = true;
        object.userData.originalScale = object.scale.clone();
        
        // Gentle scale animation
        const targetScale = object.userData.originalScale.clone().multiplyScalar(1.05);
        this.animateScale(object, targetScale);
    }

    removeHoverGlow() {
        this.scene.traverse((child) => {
            if (child.userData.isHovering) {
                child.userData.isHovering = false;
                if (child.userData.originalScale) {
                    this.animateScale(child, child.userData.originalScale);
                }
            }
        });
    }

    animateScale(object, targetScale) {
        const startScale = object.scale.clone();
        const duration = 200; // ms
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            object.scale.lerpVectors(startScale, targetScale, progress);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    update() {
        // Any per-frame interaction updates can go here
    }
}