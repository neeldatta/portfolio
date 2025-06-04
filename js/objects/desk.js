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
        this.createDeskSign();
    }

    createDesk() {
        const deskGroup = new THREE.Group();

        // Desk top
        const deskTopGeometry = new THREE.BoxGeometry(3, 0.1, 2.2);
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
            [-1.4, 0.5, -1.05],
            [1.4, 0.5, -1.05],
            [-1.4, 0.5, 1.05],
            [1.4, 0.5, 1.05]
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

        // Position scroll on desk - moved up by adjusting y position
        scrollGroup.position.set(0.8, 1.1, 0);  // Increased y from 1 to 1.1
        scrollGroup.userData = {
            isScroll: true,
            isFloating: true,
            originalY: 1.06,  // Adjusted originalY to match new position
            time: 0
        };

        this.scroll = scrollGroup;
        this.desk.add(scrollGroup);

        // Create canvas for "PROJECTS" text
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 128;
        const context = canvas.getContext('2d');
        
        // Make background transparent
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the text
        context.fillStyle = '#4a2c2a';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = 'bold 60px Honoria';
        context.fillText('Projects', canvas.width/2, canvas.height/2);

        // Create plane for text
        const textGeometry = new THREE.PlaneGeometry(1.5, 0.4);
        const textMaterial = new THREE.MeshLambertMaterial({ 
            map: new THREE.CanvasTexture(canvas),
            roughness: 0.8,
            transparent: true
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        
        // Position text on table surface
        textMesh.position.set(0.75, 1.06, 0.825);  // Slightly above table surface
        textMesh.rotation.x = -Math.PI / 2;  // Lay flat on table
        
        this.desk.add(textMesh);
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
        bottleGroup.position.set(-0.7, 1, -0.5);
        bottleGroup.userData = {
            isBottle: true,
            isFloating: true,
            originalY: 1.05,
            time: Math.PI // Offset the floating animation
        };

        this.bottle = bottleGroup;
        this.desk.add(bottleGroup);

        // Create canvas for "CONTACT ME" text
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 128;
        const context = canvas.getContext('2d');
        
        // Make background transparent
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the text
        context.fillStyle = '#4a2c2a';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = 'bold 60px Honoria';
        context.fillText('CONTACT ME', canvas.width/2, canvas.height/2);

        // Create plane for text
        const textGeometry = new THREE.PlaneGeometry(1.5, 0.4);
        const textMaterial = new THREE.MeshLambertMaterial({ 
            map: new THREE.CanvasTexture(canvas),
            roughness: 0.8,
            transparent: true
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        
        // Position text on table surface
        textMesh.position.set(-0.7, 1.06, -0.1);  // Under the bottle
        textMesh.rotation.x = -Math.PI / 2;  // Lay flat on table
        
        this.desk.add(textMesh);
    }

    createDeskAccessories() {
        // mug
        const mugGroup = new THREE.Group();
        
        // mug base
        const mugGeometry = new THREE.CylinderGeometry(0.15, 0.18, 0.3, 8);
        const mugMaterial = new THREE.MeshLambertMaterial({ color: 0x4a4a4a });
        const mug = new THREE.Mesh(mugGeometry, mugMaterial);
        mug.position.y = 0.2;
        mugGroup.add(mug);

        // mug handle
        const handleGeometry = new THREE.TorusGeometry(0.1, 0.015, 4, 8);
        const handle = new THREE.Mesh(handleGeometry, mugMaterial);
        handle.position.y = 0.35;
        handle.rotation.x = Math.PI / 2;
        mugGroup.add(handle);

        // mug light
        const lightGeometry = new THREE.SphereGeometry(0.12, 8, 6);
        const lightMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffff88,
            transparent: true,
            opacity: 0.6
        });
        const light = new THREE.Mesh(lightGeometry, lightMaterial);
        light.position.y = 0.2;
        mugGroup.add(light);

        mugGroup.position.set(-0.7, 1, 0.4);
        mugGroup.userData = {
            isMug: true,
            isFloating: true,
            originalY: 1.05,
            time: Math.PI // Offset the floating animation
        };
        this.desk.add(mugGroup);

        // Create canvas for "MUG" text
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 128;
        const context = canvas.getContext('2d');
        
        // Make background transparent
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the text
        context.fillStyle = '#4a2c2a';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = 'bold 60px Honoria';
        context.fillText('MUG', canvas.width/2, canvas.height/2);

        // Create plane for text
        const textGeometry = new THREE.PlaneGeometry(1.5, 0.4);
        const textMaterial = new THREE.MeshLambertMaterial({ 
            map: new THREE.CanvasTexture(canvas),
            roughness: 0.8,
            transparent: true
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        
        // Position text on table surface
        textMesh.position.set(-0.7, 1.06, 0.825);  // Under the mug
        textMesh.rotation.x = -Math.PI / 2;  // Lay flat on table
        
        this.desk.add(textMesh);
    }

    createDeskSign() {
        const signGroup = new THREE.Group();
        
        // Sign post
        const postGeometry = new THREE.CylinderGeometry(0.08, 0.1, 1.8, 8);
        const postMaterial = new THREE.MeshLambertMaterial({
            color: 0x8B4513,
            roughness: 0.8
        });
        const post = new THREE.Mesh(postGeometry, postMaterial);
        post.position.set(0, 0.9, 0);
        signGroup.add(post);
        
        // Create canvas for text
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        
        // Draw wooden background
        context.fillStyle = '#A0522D';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some wood grain effect
        context.strokeStyle = '#8B4513';
        context.lineWidth = 2;
        for(let i = 0; i < 20; i++) {
            context.beginPath();
            context.moveTo(0, i * 20);
            context.lineTo(canvas.width, i * 20 + Math.random() * 10);
            context.stroke();
        }
        
        // Draw the text
        context.fillStyle = '#4a2c2a';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = 'bold 90px Honoria';
        context.fillText('PROJECTS  ', canvas.width/2, canvas.height/2);

        // Create the board group
        const boardGroup = new THREE.Group();
        
        // Main rectangular part of the board
        const boardGeometry = new THREE.BoxGeometry(1.2, 0.6, 0.1);
        const boardMaterial = new THREE.MeshLambertMaterial({ 
            map: new THREE.CanvasTexture(canvas),
            roughness: 0.8
        });
        const board = new THREE.Mesh(boardGeometry, boardMaterial);
        board.position.set(-0.6, 0, 0);
        board.castShadow = true;
        boardGroup.add(board);

        // Arrow point
        const arrowShape = new THREE.Shape();
        arrowShape.moveTo(0, 0.3);
        arrowShape.lineTo(-0.4, 0);
        arrowShape.lineTo(0, -0.3);
        arrowShape.closePath();

        const arrowGeometry = new THREE.ExtrudeGeometry(arrowShape, {
            depth: 0.1,
            bevelEnabled: false
        });
        const arrow = new THREE.Mesh(arrowGeometry, boardMaterial);
        arrow.position.set(-1.2, 0, 0);
        arrow.castShadow = true;
        boardGroup.add(arrow);

        // Position the entire board group
        boardGroup.position.set(0, 1.5, 0);
        
        
        signGroup.add(boardGroup);
        
        // Position the sign group to the right of the desk
        signGroup.position.set(7, 0, 0.75);
        signGroup.rotation.y = -Math.PI / 4.5; // Face towards the desk
        signGroup.userData = {
            isSign: true,
            isDesk: true // Add isDesk to trigger desk zoom on click
        };
        
        this.scene.add(signGroup);
    }
}