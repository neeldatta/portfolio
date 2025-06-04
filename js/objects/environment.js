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
        this.createSingleTree();
        this.createBackgroundTrees();
        this.createStars();
        this.createWelcomeText();
        this.createTableArrow();
        this.createPerimeterTrees();
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

    createSingleTree() {
        // Tree positions
        const treePositions = [
            { x: 4, z: -6, type: 'coniferous' },     // Behind desk
            { x: 8, z: -4, type: 'coniferous' },     // Right of desk, slightly forward
            { x: 12, z: -6, type: 'coniferous' },    // Further right, aligned with first tree
            { x: -12, z: -4, type: 'coniferous' },   // Left of tent, moved further left
            { x: -18, z: -6, type: 'deciduous' }     // Further left of tent, moved further left
        ];

        // Create trees
        treePositions.forEach(pos => {
            // Create trunk
            const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 8);
            const trunkMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x4d2926,
                roughness: 0.9,
                metalness: 0.1
            });
            const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
            trunk.position.set(pos.x, 1, pos.z);
            trunk.castShadow = true;
            trunk.receiveShadow = true;
            this.scene.add(trunk);

            const scale = 1.2; // Slightly larger than default

            if (pos.type === 'coniferous') {
                // Create coniferous (spiky) tree with multiple layers
                const foliageColors = [0x1a5a1a, 0x2d4a2d, 0x3d6a3d]; // Different shades of green
                const foliageLayers = 3;

                for (let i = 0; i < foliageLayers; i++) {
                    const foliageGeometry = new THREE.ConeGeometry(
                        1.5 * scale * (1 - i * 0.2),
                        2 * scale * (1 - i * 0.1),
                        8
                    );
                    const foliageMaterial = new THREE.MeshStandardMaterial({
                        color: foliageColors[i % foliageColors.length],
                        roughness: 0.8,
                        metalness: 0.1
                    });
                    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
                    foliage.position.set(pos.x, 2 * scale + i * 0.8 * scale, pos.z);
                    foliage.castShadow = true;
                    foliage.receiveShadow = true;
                    this.scene.add(foliage);
                }
            } else {
                // Create deciduous (round) tree
                const foliageGeometry = new THREE.SphereGeometry(1.2 * scale, 8, 8);
                const foliageMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0x2d4a2d,
                    roughness: 0.8,
                    metalness: 0.1
                });
            const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
                foliage.position.set(pos.x, 2.5 * scale, pos.z);
            foliage.castShadow = true;
                foliage.receiveShadow = true;
                this.scene.add(foliage);

                // Add a second, slightly smaller sphere for more natural look
                const innerFoliageGeometry = new THREE.SphereGeometry(0.9 * scale, 8, 8);
                const innerFoliageMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0x3d6a3d,
                    roughness: 0.8,
                    metalness: 0.1
                });
                const innerFoliage = new THREE.Mesh(innerFoliageGeometry, innerFoliageMaterial);
                innerFoliage.position.set(pos.x, 2.5 * scale, pos.z);
                innerFoliage.castShadow = true;
                innerFoliage.receiveShadow = true;
                this.scene.add(innerFoliage);
            }
        });

        // Create bushes
        const bushPositions = [
            // Right side bushes
            { x: 13.5, z: -5.5 },
            { x: 14.5, z: -6.5 },
            // Left side bushes near coniferous tree
            { x: -13.5, z: -3.5 },
            { x: -11.5, z: -4 }
        ];

        bushPositions.forEach(pos => {
            // Create bush with multiple spheres
            const bushGroup = new THREE.Group();
            const bushScale = 0.4 + Math.random() * 0.2; // Random size variation

            // Create 3-4 spheres for each bush
            const sphereCount = 3 + Math.floor(Math.random() * 2);
            for (let i = 0; i < sphereCount; i++) {
                const sphereGeometry = new THREE.SphereGeometry(bushScale, 8, 8);
                const sphereMaterial = new THREE.MeshStandardMaterial({
                    color: 0x2d4a2d,
                    roughness: 0.8,
                    metalness: 0.1
                });
                const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                
                // Offset each sphere slightly
                sphere.position.set(
                    (Math.random() - 0.5) * 0.3,
                    (Math.random() - 0.5) * 0.3,
                    (Math.random() - 0.5) * 0.3
                );
                
                sphere.castShadow = true;
                sphere.receiveShadow = true;
                bushGroup.add(sphere);
            }

            bushGroup.position.set(pos.x, bushScale, pos.z);
            this.scene.add(bushGroup);
        });
    }

    createBackgroundTrees() {
        // Tree positions behind camera
        const treePositions = [
            { x: -15, z: 20, type: 'coniferous' },
            { x: -10, z: 22, type: 'deciduous' },
            { x: -5, z: 20, type: 'coniferous' },
            { x: 0, z: 22, type: 'deciduous' },
            { x: 5, z: 20, type: 'coniferous' },
            { x: 10, z: 22, type: 'deciduous' },
            { x: 15, z: 20, type: 'coniferous' }
        ];

        // Create trees
        treePositions.forEach(pos => {
            // Create trunk
            const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 8);
            const trunkMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x4d2926,
                roughness: 0.9,
                metalness: 0.1
            });
            const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
            trunk.position.set(pos.x, 1, pos.z);
            trunk.castShadow = true;
            trunk.receiveShadow = true;
            this.scene.add(trunk);

            const scale = 1.2; // Slightly larger than default

            if (pos.type === 'coniferous') {
                // Create coniferous (spiky) tree with multiple layers
                const foliageColors = [0x1a5a1a, 0x2d4a2d, 0x3d6a3d]; // Different shades of green
                const foliageLayers = 3;

                for (let i = 0; i < foliageLayers; i++) {
                    const foliageGeometry = new THREE.ConeGeometry(
                        1.5 * scale * (1 - i * 0.2),
                        2 * scale * (1 - i * 0.1),
                        8
                    );
                    const foliageMaterial = new THREE.MeshStandardMaterial({
                        color: foliageColors[i % foliageColors.length],
                        roughness: 0.8,
                        metalness: 0.1
                    });
                    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
                    foliage.position.set(pos.x, 2 * scale + i * 0.8 * scale, pos.z);
                    foliage.castShadow = true;
                    foliage.receiveShadow = true;
                    this.scene.add(foliage);
            }
        } else {
                // Create deciduous (round) tree
                const foliageGeometry = new THREE.SphereGeometry(1.2 * scale, 8, 8);
                const foliageMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0x2d4a2d,
                    roughness: 0.8,
                    metalness: 0.1
                });
            const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
                foliage.position.set(pos.x, 2.5 * scale, pos.z);
            foliage.castShadow = true;
                foliage.receiveShadow = true;
                this.scene.add(foliage);

                // Add a second, slightly smaller sphere for more natural look
                const innerFoliageGeometry = new THREE.SphereGeometry(0.9 * scale, 8, 8);
                const innerFoliageMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0x3d6a3d,
                    roughness: 0.8,
                    metalness: 0.1
                });
                const innerFoliage = new THREE.Mesh(innerFoliageGeometry, innerFoliageMaterial);
                innerFoliage.position.set(pos.x, 2.5 * scale, pos.z);
                innerFoliage.castShadow = true;
                innerFoliage.receiveShadow = true;
                this.scene.add(innerFoliage);
            }
        });

        // Create bushes behind camera
        const bushPositions = [
            { x: -12, z: 18 },
            { x: -8, z: 19 },
            { x: -4, z: 18 },
            { x: 4, z: 19 },
            { x: 8, z: 18 },
            { x: 12, z: 19 }
        ];

        bushPositions.forEach(pos => {
            // Create bush with multiple spheres
            const bushGroup = new THREE.Group();
            const bushScale = 0.4 + Math.random() * 0.2; // Random size variation

            // Create 3-4 spheres for each bush
            const sphereCount = 3 + Math.floor(Math.random() * 2);
            for (let i = 0; i < sphereCount; i++) {
                const sphereGeometry = new THREE.SphereGeometry(bushScale, 8, 8);
                const sphereMaterial = new THREE.MeshStandardMaterial({
                    color: 0x2d4a2d,
                    roughness: 0.8,
                    metalness: 0.1
                });
                const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                
                // Offset each sphere slightly
                sphere.position.set(
                    (Math.random() - 0.5) * 0.3,
                    (Math.random() - 0.5) * 0.3,
                    (Math.random() - 0.5) * 0.3
                );
                
                sphere.castShadow = true;
                sphere.receiveShadow = true;
                bushGroup.add(sphere);
            }

            bushGroup.position.set(pos.x, bushScale, pos.z);
            this.scene.add(bushGroup);
        });
    }

    createStars() {
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 0.1,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        // Create 1000 stars in a hemisphere
        const starCount = 1000;
        const positions = new Float32Array(starCount * 3);
        const radius = 50; // Large radius for the starfield

        for (let i = 0; i < starCount; i++) {
            // Generate random position in a hemisphere
            const theta = Math.random() * Math.PI * 2; // Random angle around the circle
            const phi = Math.random() * Math.PI / 2;   // Random angle from horizon to zenith
            const r = radius + Math.random() * 10;     // Random distance with slight variation

            // Convert spherical coordinates to Cartesian
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.cos(phi);
            const z = r * Math.sin(phi) * Math.sin(theta);

            // Only place stars in the upper hemisphere
            if (y > 0) {
                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;
            }
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(stars);
    }

    createWelcomeText() {
        const material = new THREE.LineBasicMaterial({ 
            color: 0x000000,
            linewidth: 1
        });

        const x = -0.5

        // W
        const wPoints = [
            new THREE.Vector3(-3.5, 0.01, 3.5 + x),
            new THREE.Vector3(-3.2, 0.01, 4+ x),
            new THREE.Vector3(-2.9, 0.01, 3.5+ x),
            new THREE.Vector3(-2.6, 0.01, 4+ x),
            new THREE.Vector3(-2.3, 0.01, 3.5+ x)
        ];
        const wGeometry = new THREE.BufferGeometry().setFromPoints(wPoints);
        const wLine = new THREE.Line(wGeometry, material);
        this.scene.add(wLine);

        // E
        const ePoints = [
            new THREE.Vector3(-1.8, 0.01, 3.5+ x),
            new THREE.Vector3(-1.8, 0.01, 4+ x),
            new THREE.Vector3(-1.4, 0.01, 4+ x),
            new THREE.Vector3(-1.8, 0.01, 4+ x),
            new THREE.Vector3(-1.8, 0.01, 3.75+ x),
            new THREE.Vector3(-1.4, 0.01, 3.75+ x),
            new THREE.Vector3(-1.8, 0.01, 3.75+ x),
            new THREE.Vector3(-1.8, 0.01, 3.5+ x),
            new THREE.Vector3(-1.4, 0.01, 3.5+ x)
        ];
        const eGeometry = new THREE.BufferGeometry().setFromPoints(ePoints);
        const eLine = new THREE.Line(eGeometry, material);
        this.scene.add(eLine);

        // L
        const lPoints = [
            new THREE.Vector3(-1.0, 0.01, 3.5+ x),
            new THREE.Vector3(-1.0, 0.01, 4+ x),
            new THREE.Vector3(-0.6, 0.01, 4+ x)
        ];
        const lGeometry = new THREE.BufferGeometry().setFromPoints(lPoints);
        const lLine = new THREE.Line(lGeometry, material);
        this.scene.add(lLine);

        // C
        const cPoints = [];
        for (let i = 0; i <= 8; i++) {
            const angle = Math.PI/2 - Math.PI/8 + (i / 8) * Math.PI * 1.2;
            cPoints.push(new THREE.Vector3(
                0.1 + Math.cos(angle) * 0.25,
                0.01,
                (3.75 + Math.sin(angle) * 0.25) + x
            ));
        }
        const cGeometry = new THREE.BufferGeometry().setFromPoints(cPoints);
        const cLine = new THREE.Line(cGeometry, material);
        this.scene.add(cLine);

        // O
        const oPoints = [];
        for (let i = 0; i <= 16; i++) {
            const angle = (i / 16) * Math.PI * 2;
            oPoints.push(new THREE.Vector3(
                0.9 + Math.cos(angle) * 0.25,
                0.01,
                (3.75 + Math.sin(angle) * 0.25) + x
            ));
        }
        const oGeometry = new THREE.BufferGeometry().setFromPoints(oPoints);
        const oLine = new THREE.Line(oGeometry, material);
        this.scene.add(oLine);

        // M
        const mPoints = [
            new THREE.Vector3(1.6, 0.01, 4+ x),
            new THREE.Vector3(1.6, 0.01, 3.5+ x),
            new THREE.Vector3(1.9, 0.01, 3.75+ x),
            new THREE.Vector3(2.2, 0.01, 3.5+ x),
            new THREE.Vector3(2.2, 0.01, 4+ x)
        ];
        const mGeometry = new THREE.BufferGeometry().setFromPoints(mPoints);
        const mLine = new THREE.Line(mGeometry, material);
        this.scene.add(mLine);

        
        // E
        const e2Points = [
            new THREE.Vector3(2.6, 0.01, 3.5 + x),
            new THREE.Vector3(2.6, 0.01, 4 + x),
            new THREE.Vector3(3.0, 0.01, 4 + x),
            new THREE.Vector3(2.6, 0.01, 4 + x),
            new THREE.Vector3(2.6, 0.01, 3.75 + x),
            new THREE.Vector3(3.0, 0.01, 3.75 + x),
            new THREE.Vector3(2.6, 0.01, 3.75 + x),
            new THREE.Vector3(2.6, 0.01, 3.5 + x),
            new THREE.Vector3(3.0, 0.01, 3.5 + x)
        ];
        const e2Geometry = new THREE.BufferGeometry().setFromPoints(e2Points);
        const e2Line = new THREE.Line(e2Geometry, material);
        this.scene.add(e2Line);

        // // Exclamation mark
        // const exclamationPoints = [
        //     // Vertical line
        //     new THREE.Vector3(2.3, 0.01, 3.5 + x),
        //     new THREE.Vector3(2.3, 0.01, 4 + x),
        //     // Dot
        //     new THREE.Vector3(2.3, 0.01, 3.4 + x)
        // ];
        // const exclamationGeometry = new THREE.BufferGeometry().setFromPoints(exclamationPoints);
        // const exclamationLine = new THREE.Line(exclamationGeometry, material);
        // this.scene.add(exclamationLine);

    }


    createTableArrow() {
        const material = new THREE.LineBasicMaterial({ 
            color: 0x000000,
            linewidth: 1
        });

        // Original arrow line
        const arrowPoints = [
            new THREE.Vector3(2, 0.01, 2.5),  // Start point
            new THREE.Vector3(3.5, 0.01, 1),  // End point before arrow head
        ];
        const arrowGeometry = new THREE.BufferGeometry().setFromPoints(arrowPoints);
        const arrowLine = new THREE.Line(arrowGeometry, material);
        this.scene.add(arrowLine);

        // Original arrow head - triangular shape
        const headPoints = [
            new THREE.Vector3(3.5, 0.01, 1),  // Base center
            new THREE.Vector3(3.8, 0.01, 1),  // Tip
            new THREE.Vector3(3.5, 0.01, 0.8),  // Bottom left
            new THREE.Vector3(3.5, 0.01, 1),  // Back to base center
            new THREE.Vector3(3.5, 0.01, 1.2),  // Bottom right
            new THREE.Vector3(3.8, 0.01, 1)  // Back to tip
        ];
        const headGeometry = new THREE.BufferGeometry().setFromPoints(headPoints);
        const headLine = new THREE.Line(headGeometry, material);
        this.scene.add(headLine);

        // New curved arrow to ABOUT ME board
        const curvePoints = [];
        const startX = -1.8;  // Starting near the first E
        const startZ = 2.5;   // Starting at z=2.5
        const endX = -4.5;    // Ending before the ABOUT ME board
        const endZ = 1.5;     // Ending slightly before the board

        // Create points for a smooth curve using quadratic Bezier
        for (let i = 0; i <= 20; i++) {
            const t = i / 20;
            const x = startX + (endX - startX) * t;
            const z = startZ + (endZ - startZ) * t * t;  // Quadratic curve
            curvePoints.push(new THREE.Vector3(x, 0.01, z));
        }

        const curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const curveLine = new THREE.Line(curveGeometry, material);
        this.scene.add(curveLine);

        // Arrow head for the curved arrow
        const curveHeadPoints = [
            new THREE.Vector3(endX, 0.01, endZ),  // Base center
            new THREE.Vector3(endX - 0.3, 0.01, endZ),  // Tip
            new THREE.Vector3(endX, 0.01, endZ - 0.2),  // Bottom left
            new THREE.Vector3(endX, 0.01, endZ),  // Back to base center
            new THREE.Vector3(endX, 0.01, endZ + 0.2),  // Bottom right
            new THREE.Vector3(endX - 0.3, 0.01, endZ)  // Back to tip
        ];
        const curveHeadGeometry = new THREE.BufferGeometry().setFromPoints(curveHeadPoints);
        const curveHeadLine = new THREE.Line(curveHeadGeometry, material);
        this.scene.add(curveHeadLine);
    }

    createPerimeterTrees() {
        const treeCount = 16; // More trees than torches for denser coverage
        const radius = 15; // Same radius as torches
        const isConiferous = 0.7; // 70% chance of coniferous trees

        for (let i = 0; i < treeCount; i++) {
            const angle = (i / treeCount) * Math.PI * 2;
            // Add some random variation to the radius and angle
            const radiusVariation = radius + (Math.random() - 0.5) * 2;
            const angleVariation = angle + (Math.random() - 0.5) * 0.2;
            
            const x = Math.cos(angleVariation) * radiusVariation;
            const z = Math.sin(angleVariation) * radiusVariation;

            // Create trunk
            const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 8);
            const trunkMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x4d2926,
                roughness: 0.9,
                metalness: 0.1
            });
            const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
            trunk.position.set(x, 1, z);
            trunk.castShadow = true;
            trunk.receiveShadow = true;
            this.scene.add(trunk);

            const scale = 1.2 + Math.random() * 0.3; // Random scale variation

            if (Math.random() < isConiferous) {
                // Create coniferous (spiky) tree with multiple layers
                const foliageColors = [0x1a5a1a, 0x2d4a2d, 0x3d6a3d]; // Different shades of green
                const foliageLayers = 3;

                for (let i = 0; i < foliageLayers; i++) {
                    const foliageGeometry = new THREE.ConeGeometry(
                        1.5 * scale * (1 - i * 0.2),
                        2 * scale * (1 - i * 0.1),
                        8
                    );
                    const foliageMaterial = new THREE.MeshStandardMaterial({
                        color: foliageColors[i % foliageColors.length],
                        roughness: 0.8,
                        metalness: 0.1
                    });
                    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
                    foliage.position.set(x, 2 * scale + i * 0.8 * scale, z);
                    foliage.castShadow = true;
                    foliage.receiveShadow = true;
                    this.scene.add(foliage);
                }
            } else {
                // Create deciduous (round) tree
                const foliageGeometry = new THREE.SphereGeometry(1.2 * scale, 8, 8);
                const foliageMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0x2d4a2d,
                    roughness: 0.8,
                    metalness: 0.1
                });
                const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
                foliage.position.set(x, 2.5 * scale, z);
                foliage.castShadow = true;
                foliage.receiveShadow = true;
                this.scene.add(foliage);

                // Add a second, slightly smaller sphere for more natural look
                const innerFoliageGeometry = new THREE.SphereGeometry(0.9 * scale, 8, 8);
                const innerFoliageMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0x3d6a3d,
                    roughness: 0.8,
                    metalness: 0.1
                });
                const innerFoliage = new THREE.Mesh(innerFoliageGeometry, innerFoliageMaterial);
                innerFoliage.position.set(x, 2.5 * scale, z);
                innerFoliage.castShadow = true;
                innerFoliage.receiveShadow = true;
                this.scene.add(innerFoliage);
            }
        }
    }
}