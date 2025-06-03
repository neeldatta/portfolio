// Handle mouse interactions and object clicking
class InteractionController {
    constructor(camera, scene, navigationController) {
        this.camera = camera;
        this.scene = scene;
        this.navigationController = navigationController;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.instructionsTimer = null;
        this.hasClickedScroll = false;
        
        this.init();
    }

    init() {
        this.addClickHandlers();
        this.addHoverEffects();
        this.startInstructionsTimer();
    }

    startInstructionsTimer() {
        this.instructionsTimer = setTimeout(() => {
            if (!this.hasClickedScroll) {
                const instructions = document.getElementById('instructions');
                if (instructions) {
                    instructions.style.display = 'block';
                }
            }
        }, 30000); // 30 seconds
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
                    current.userData.isBottle) {
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
            this.updateInstructions('Click the scroll to view portfolio • Press space to return to overview');
            
        } else if (userData.isScroll) {
            console.log('📜 Clicked on scroll - opening portfolio...');
            this.hasClickedScroll = true;
            const instructions = document.getElementById('instructions');
            if (instructions) {
                instructions.style.display = 'none';
            }
            UI.showPortfolio();
            
        } else if (userData.isBottle) {
            console.log('🍾 Clicked on bottle - opening contact...');
            UI.showContact();
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

    updateInstructions(text) {
        const instructions = document.getElementById('instructions');
        if (instructions) {
            instructions.textContent = text;
        }
    }

    update() {
        // Any per-frame interaction updates can go here
    }
}