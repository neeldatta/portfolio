// Camera navigation and movement controls
class NavigationController {
    constructor(camera, renderer) {
        this.camera = camera;
        this.renderer = renderer;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetPosition = { x: 0, y: 2, z: 8 };
        this.currentView = 'overview'; // 'overview' or 'desk'
        this.isTransitioning = false;
        
        this.init();
    }

    init() {
        this.addMouseControls();
        this.addKeyboardControls();
    }

    addMouseControls() {
        document.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });
    }

    addKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            switch(event.code) {
                case 'KeyW':
                case 'ArrowUp':
                    this.moveForward();
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    this.moveBackward();
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    this.moveLeft();
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    this.moveRight();
                    break;
                case 'Space':
                    event.preventDefault();
                    this.resetToOverview();
                    break;
            }
        });
    }

    moveForward() {
        if (this.isTransitioning) return;
        this.targetPosition.z = Math.max(this.targetPosition.z - 0.5, 2);
    }

    moveBackward() {
        if (this.isTransitioning) return;
        this.targetPosition.z = Math.min(this.targetPosition.z + 0.5, 12);
    }

    moveLeft() {
        if (this.isTransitioning) return;
        this.targetPosition.x = Math.max(this.targetPosition.x - 0.5, -8);
    }

    moveRight() {
        if (this.isTransitioning) return;
        this.targetPosition.x = Math.min(this.targetPosition.x + 0.5, 8);
    }

    zoomToDesk() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentView = 'desk';
        
        // Target position focused on the desk
        const deskTarget = { x: 4, y: 2.5, z: 2.5 };
        
        this.animateCameraTo(deskTarget, () => {
            this.isTransitioning = false;
        });
    }

    resetToOverview() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentView = 'overview';
        
        const overviewTarget = { x: 0, y: 2, z: 8 };
        
        this.animateCameraTo(overviewTarget, () => {
            this.isTransitioning = false;
        });
    }

    animateCameraTo(target, onComplete) {
        const startPos = {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z
        };
        
        const duration = 1500; // ms
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Smooth easing function
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            this.camera.position.x = startPos.x + (target.x - startPos.x) * easeProgress;
            this.camera.position.y = startPos.y + (target.y - startPos.y) * easeProgress;
            this.camera.position.z = startPos.z + (target.z - startPos.z) * easeProgress;
            
            this.targetPosition = { ...target };
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else if (onComplete) {
                onComplete();
            }
        };
        
        animate();
    }

    update() {
        if (!this.isTransitioning) {
            // Smooth camera movement towards target
            this.camera.position.x += (this.targetPosition.x - this.camera.position.x) * 0.05;
            this.camera.position.y += (this.targetPosition.y - this.camera.position.y) * 0.05;
            this.camera.position.z += (this.targetPosition.z - this.camera.position.z) * 0.05;
            
            // Mouse look effect
            const mouseInfluence = this.currentView === 'desk' ? 1 : 3;
            this.camera.position.x += (this.mouseX * mouseInfluence - this.camera.position.x + this.targetPosition.x) * 0.02;
            this.camera.position.y += (-this.mouseY * 1 + this.targetPosition.y - this.camera.position.y) * 0.02;
        }
        
        // Always look at appropriate target
        const lookTarget = this.currentView === 'desk' 
            ? new THREE.Vector3(4, 1, 0)  // Look at desk
            : new THREE.Vector3(0, 1, 0); // Look at campfire
            
        this.camera.lookAt(lookTarget);
    }
}   