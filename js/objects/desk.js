// Desk creation with interactive objects
class Desk {
    constructor(scene) {
        this.scene = scene;
        this.desk = null;
        this.scroll = null;
        this.bottle = null;
    }

    create() {
        this.createDesk();
        this.createInteractiveObjects();
    }

    createDesk() {
        const deskGroup = new THREE.Group();

        // Desk top
        const deskTopGeometry = new THREE.BoxGeometry(3, 0.1, 1.8);
        const woodMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const deskTop = new THREE.Mesh(deskTopGeometry, woodMaterial);
        deskTop.position.y = 1;
        deskTop.castShadow = true;
        deskTop.receiveShadow = true;
        deskGroup.add(deskTop);

        // Desk legs
        const legGeometry = new THREE.BoxGeometry(0.12, 1, 0.12);
        const legMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
        
        const legPositions = [
            [-1.4, 0.5, -0.8],
            [1.4, 0.5, -0.8],
            [-1.4, 0.5, 0.8],
            [1.4, 0.5, 0.8]
        ];

        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(pos[0], pos[1], pos[2]);
            leg.castShadow = true;
            deskGroup.add(leg);
        });

        // Position desk on the RIGHT side of campfire
        deskGroup.position.set(4, 0, 0);
        deskGroup.userData.isDesk = true;
        
        this.desk = deskGroup;
        this.scene.add(deskGroup);
    }

    createInteractiveObjects() {
        // Create scroll on desk
        this.createScrollOnDesk();
        this.createBottleOnDesk();
        this.createDeskAccessories();
    }

    createScrollOnDesk() {
        const scrollGroup = new THREE.Group();

        // Scroll base
        const scrollGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 12);
        const scrollMaterial = new THREE.MeshLambertMaterial({ color: 0xf5e6d3 });
        const scrollMesh = new THREE.Mesh(scrollGeometry, scrollMaterial);
        scrollMesh.rotation.z = Math.PI / 2;
        scrollMesh.position.y = 0.15;
        scrollMesh.castShadow = true;
        scrollGroup.add(scrollMesh);

        // Scroll caps
        const capGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.15, 8);
        const capMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
        
        const cap1 = new THREE.Mesh(capGeometry, capMaterial);
        cap1.position.set(-0.65, 0.15, 0);
        scrollGroup.add(cap1);
        
        const cap2 = new THREE.Mesh(capGeometry, capMaterial);
        cap2.position.set(0.65, 0.15, 0);
        scrollGroup.add(cap2);

        // Position scroll on desk
        scrollGroup.position.set(0.5, 1, 0.3);
        scrollGroup.userData = {
            isScroll: true,
            isFloating: true,
            originalY: 1.15,
            time: 0
        };

        this.scroll = scrollGroup;
        this.desk.add(scrollGroup);
    }

    createBottleOnDesk() {
        const bottleGroup = new THREE.Group();

        // Bottle body
        const bottleGeometry = new THREE.CylinderGeometry(0.08, 0.12, 0.6, 8);
        const bottleMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2a4a2a,
            transparent: true,
            opacity: 0.8
        });
        const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
        bottle.position.y = 0.35;
        bottle.castShadow = true;
        bottleGroup.add(bottle);

        // Cork
        const corkGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.1, 8);
        const corkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const cork = new THREE.Mesh(corkGeometry, corkMaterial);
        cork.position.y = 0.7;
        bottleGroup.add(cork);

        // Message inside (barely visible)
        const messageGeometry = new THREE.PlaneGeometry(0.1, 0.15);
        const messageMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xf5e6d3,
            transparent: true,
            opacity: 0.6
        });
        const message = new THREE.Mesh(messageGeometry, messageMaterial);
        message.position.set(0, 0.3, 0);
        message.rotation.y = 0.3;
        bottleGroup.add(message);

        // Position bottle on desk
        bottleGroup.position.set(-0.8, 1, -0.4);
        bottleGroup.userData = {
            isBottle: true,
            isFloating: true,
            originalY: 1.05,
            time: Math.PI // Offset the floating animation
        };

        this.bottle = bottleGroup;
        this.desk.add(bottleGroup);
    }

    createDeskAccessories() {
        // Lantern
        const lanternGroup = new THREE.Group();
        
        // Lantern base
        const lanternGeometry = new THREE.CylinderGeometry(0.15, 0.18, 0.3, 8);
        const lanternMaterial = new THREE.MeshLambertMaterial({ color: 0x4a4a4a });
        const lantern = new THREE.Mesh(lanternGeometry, lanternMaterial);
        lantern.position.y = 0.2;
        lanternGroup.add(lantern);

        // Lantern handle
        const handleGeometry = new THREE.TorusGeometry(0.1, 0.015, 4, 8);
        const handle = new THREE.Mesh(handleGeometry, lanternMaterial);
        handle.position.y = 0.35;
        handle.rotation.x = Math.PI / 2;
        lanternGroup.add(handle);

        // Lantern light
        const lightGeometry = new THREE.SphereGeometry(0.12, 8, 6);
        const lightMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffff88,
            transparent: true,
            opacity: 0.6
        });
        const light = new THREE.Mesh(lightGeometry, lightMaterial);
        light.position.y = 0.2;
        lanternGroup.add(light);

        lanternGroup.position.set(-1, 1, 0.5);
        this.desk.add(lanternGroup);
    }
}