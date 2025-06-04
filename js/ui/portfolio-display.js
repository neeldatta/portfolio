// UI management for portfolio and contact modals
class UI {
    static showPortfolio() {
        const modal = document.getElementById('portfolioModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = this.getPortfolioContent();
        modal.style.display = 'block';
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.5s ease-in-out';
        
        // Trigger the animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 50);
    }

    static showContact() {
        const modal = document.getElementById('portfolioModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = this.getContactContent();
        modal.style.display = 'block';
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.5s ease-in-out';
        
        // Trigger the animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 50);
    }

    static showAbout() {
        const modal = document.getElementById('portfolioModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = this.getAboutContent();
        modal.style.display = 'block';
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.5s ease-in-out';
        
        // Trigger the animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 50);
    }

    static show() {
        const modal = document.getElementById('portfolioModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <button class="close-modal" onclick="UI.closeModal()">&times;</button>
                <h1>Mug</h1>
                <p>Just a mug.</p>
            </div>
            <div class="modal-body">
                <div class="section">
                    <h2>It's literally just a mug.</h2>
                </div>
            </div>
        `;
        modal.style.display = 'block';
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.5s ease-in-out';
        
        // Trigger the animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 50);
    }

    static closeModal() {
        const modal = document.getElementById('portfolioModal');
        modal.style.opacity = '0';
        
        // Wait for fade out animation to complete before hiding
        setTimeout(() => {
        modal.style.display = 'none';
        }, 500);
    }

    static getPortfolioContent() {
        return `
            <div class="modal-header">
                <button class="close-modal" onclick="UI.closeModal()">&times;</button>
                <h1>My Portfolio</h1>
                <p>Scroll of Prior Projects</p>
            </div>
            <div class="modal-body">
                <div class="section">
                    <h2>Featured Projects</h2>
                    
                    <div class="project">
                        <h3>Energy Data Analytics Platform @ Abjayon</h3>
                        <p>End-to-end data pipeline processing 5TB+ daily meter data with ML-powered energy disaggregation achieving 84% NILM accuracy and $2M annual savings. Architected using Kafka, Spark Streaming, and MongoDB with 99.9% uptime. Improved LSTM-based energy theft detection by 35%.</p>
                        <a href="https://www.impresa.ai" class="project-link">Learn More</a>
                    </div>

                    <div class="project">
                        <h3>Reusable Spark ETL Framework</h3>
                        <p>Designed and built PySpark+Kafka+Mongo framework for energy data transformations, reducing development time by 60% across multiple utility clients. Framework handles real-time streaming with Kafka, as well as data validation, transformations, and MongoDB integration with built-in monitoring and error handling.</p>
                        <a href="https://www.abjayon.com" class="project-link">Learn More</a>
                    </div>

                    <div class="project">
                        <h3>EQTY LYFE - Full-Stack Real Estate Platform</h3>
                        <p>Architected and developed complete home equity platform managing entire SDLC. Built secure mortgage application flow processing thousands of applications monthly with proprietary underwriting, reducing overhead by 45%. Led cross-functional team of 3 engineers with 30% faster development cycles.</p>
                        <a href="https://www.eqtylyfe.com" class="project-link">Live Platform: EqtyLyfe</a>
                    </div>

    
                    <div class="project">
                        <h3>ML Credit Risk Assessment System @ Torpago</h3>
                        <p>Developed automated underwriting system using ensemble ML models (logistic regression, decision trees) achieving 85% default prediction accuracy. Automated 70% of underwriting workflows and increased qualified applicant throughput by 3x. Built with Go, Echo framework, and PostgreSQL backend.</p>
                        <a href="https://www.torpago.com" class="project-link">Learn More</a>
                    </div>

                    <div class="project">
                        <h3>EEG Brain-Computer Interface</h3>
                        <p>Built a brain-computer interface using OpenBCI hardware and custom signal processing neural networks. Achieved 85% accuracy in thought pattern classification for gaming controls using TensorFlow and advanced signal processing techniques.</p>
                        <a href="https://github.com/neeldatta/Project-T2B-Think2Blink" class="project-link"> View Project</a>
                    </div>

                    <div class="project">
                        <h3>Intelligent NLP Query Matching Tool @ Sunstone Secure</h3>
                        <p>Developed NLP tool with web-scraping capabilities using Python NLTK to match and score queries with webpage text blocks. Achieved 95% query matching accuracy and automated data collection process, reducing manual effort by 80%.</p>
                        <a href="https://github.com/neeldatta/DocSim-NLTK-Project" class="project-link"> View Project</a>
                    </div>

                    <div class="project">
                        <h3>Bear Maps - Geospatial Navigation System</h3>
                        <p>Google Maps-like application implementing k-d tree and extrinsic Priority Queue data structures from scratch. Incorporated A* pathfinding algorithm for optimal route calculation with real-time mapping capabilities.</p>
                        <a href="https://github.com/neeldatta/CS61B-Project-2-BearMaps" class="project-link"> View Project</a>
                    </div>

                    <div class="project">
                        <h3>Automotive Sales Prediction Analytics</h3>
                        <p>Performed comprehensive EDA on US Bureau of Transportation Statistics dataset. Used GLMs alongside nonparametric decision tree regressors to explore feature correlations and their impact on automotive sales forecasting.</p>
                        <a href="#" class="project-link">Analysis Report</a>
                        <a href="#" class="project-link">View Project</a>
                    </div>
                </div>

                <div class="section">
                    <h2>Technical Skills</h2>
                    <div class="skills-grid">
                        <div class="skill-tag">Python</div>
                        <div class="skill-tag">Apache Spark</div>
                        <div class="skill-tag">Kafka</div>
                        <div class="skill-tag">MongoDB</div>
                        <div class="skill-tag">TensorFlow</div>
                        <div class="skill-tag">PyTorch</div>
                        <div class="skill-tag">TypeScript</div>
                        <div class="skill-tag">Next.js</div>
                        <div class="skill-tag">React</div>
                        <div class="skill-tag">PostgreSQL</div>
                        <div class="skill-tag">AWS</div>
                        <div class="skill-tag">Docker</div>
                        <div class="skill-tag">Apache Airflow</div>
                        <div class="skill-tag">scikit-learn</div>
                        <div class="skill-tag">Pandas</div>
                        <div class="skill-tag">Go</div>
                        <div class="skill-tag">Java</div>
                        <div class="skill-tag">Node.js</div>
                        <div class="skill-tag">Git</div>
                        <div class="skill-tag">ELK Stack</div>
                    </div>
                </div>
            </div>
        `;
    }

    static getContactContent() {
        return `
            <div class="modal-header">
                <button class="close-modal" onclick="UI.closeModal()">&times;</button>
                <h1>Contact Me</h1>
                <p>Message in a Bottle</p>
            </div>
            <div class="modal-body">
                <div class="section">
                    <h2>Let's Get In Touch!</h2>
                    <p>Ready to start a conversation? Whether you're looking to collaborate on a project, discuss opportunities, or just want to chat about technology and creative coding, I'd love to hear from you.</p>
                </div>

                <div class="section">
                    <h2>Contact Methods</h2>
                    
                    <div class="project">
                        <h3>📧 Email</h3>
                        <p>The best way to reach me for detailed discussions or project inquiries.</p>
                        <a href="mailto:neeldatta@berkeley.edu" class="project-link">Send Email</a>
                    </div>

                    <div class="project">
                        <h3>💼 LinkedIn</h3>
                        <p>Let's connect professionally and expand our networks.</p>
                        <a href="https://www.linkedin.com/in/neelndatta/" class="project-link">Connect on LinkedIn</a>
                    </div>

                    <div class="project">
                        <h3>🐙 GitHub</h3>
                        <p>Check out my code, contribute to projects, or start a technical discussion.</p>
                        <a href="https://github.com/neeldatta" class="project-link">View GitHub Profile</a>
                    </div>

                </div>

                <div class="section">
                    <h2>What I'm Looking For</h2>
                    <p><strong>Collaboration Opportunities:</strong> Interesting projects that combine creativity with technology</p>
                    <p><strong>Open Source:</strong> Contributing to projects that make the web more interactive and engaging</p>
                    <p><strong>Networking:</strong> Meeting fellow developers, designers, and creative technologists</p>
                </div>

                <div class="section">
                    <h2>Response Time</h2>
                    <p>I typically respond to emails within 24-48 hours. For urgent matters, LinkedIn messages tend to get faster responses.</p>
                    <p>Looking forward to connecting!</p>
                </div>
            </div>
        `;
    }

    // <div class="project">
    //                     <h3>🐦 Twitter</h3>
    //                     <p>Follow my thoughts on web development, 3D graphics, and creative coding.</p>
    //                     <a href="https://twitter.com/yourusername" class="project-link">Follow on Twitter</a>
    //                 </div>

    static getAboutContent() {
        return `
            <div class="modal-header">
                <button class="close-modal" onclick="UI.closeModal()">&times;</button>
                <h1>About Me</h1>
                <p>Getting to know the person behind the code</p>
            </div>
            <div class="modal-body">
                <div class="text-image-block">
                    <img src="img/neeldattac.jpeg" alt="Me at work" class="block-image left">
                    <div class="text-content">
                        <p>I'm a software engineer who fell in love with solving complex problems through code. My journey started at UC Berkeley studying Data Science and Cognitive Science, where I discovered my passion for building systems that can process massive amounts of data and extract meaningful insights. There's something incredibly satisfying about architecting a pipeline that handles 5TB of data daily and just works.</p>
                        
                       
                    </div>
                </div>
                
                <div class="text-image-block reverse">
                    <img src="img/turfin.jpg" alt="Me outside work" class="block-image right">
                    <div class="text-content">
                        <p>When I'm not deep in Spark jobs or debugging Kafka streams, I'm probably tinkering with some new tech project. I built a brain-computer interface that lets you control games with your thoughts (85% accuracy, not bad!), and I'm always exploring the intersection of web development and 3D graphics - like this campfire experience you're currently in.</p>
                        
                        
                    </div>
                </div>
            </div>
            
            <style>
                .text-image-block {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 40px;
                    gap: 30px;
                }
                
                .text-image-block.reverse {
                    flex-direction: row-reverse;
                }
                
                .block-image {
                    width: 200px;
                    height: 250px;
                    object-fit: cover;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                    flex-shrink: 0;
                }
                
                .text-content {
                    flex: 1;
                }
                
                .text-content p {
                    color: #000000;
                    line-height: 1.7;
                    margin-bottom: 20px;
                    font-size: 16px;
                }
                
                .modal-body {
                    padding: 30px;
                    max-height: 70vh;
                    overflow-y: auto;
                }
                
                @media (max-width: 768px) {
                    .text-image-block,
                    .text-image-block.reverse {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    .block-image {
                        width: 180px;
                        height: 220px;
                        margin: 0 auto 20px auto;
                    }
                }
            </style>
        `;
    }

    static showCampfireControls(campfire) {
        // Remove any existing controls first
        const existingControls = document.getElementById('campfire-controls');
        if (existingControls) {
            document.body.removeChild(existingControls);
        }

        // Create container for campfire controls
        const container = document.createElement('div');
        container.id = 'campfire-controls';
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 100px;
            background: rgba(0, 0, 0, 0.8);
            padding: 20px;
            border-radius: 10px;
            min-width: 250px;
            color: white;
            font-family: 'Honoria', sans-serif;
            z-index: 1000;
        `;

        // Add label
        const label = document.createElement('div');
        label.textContent = 'Campfire Brightness';
        label.style.cssText = `
            margin-bottom: 15px;
            text-align: center;
            font-size: 1.2em;
            color: #ff6600;
        `;
        container.appendChild(label);

        // Add slider
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '3';
        slider.step = '0.1';
        slider.value = '1';
        slider.style.cssText = `
            width: 100%;
            margin: 10px 0;
            -webkit-appearance: none;
            background: #333;
            height: 8px;
            border-radius: 4px;
            outline: none;
        `;

        // Style the slider thumb
        slider.style.setProperty('--thumb-color', '#ff6600');
        const style = document.createElement('style');
        style.textContent = `
            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 20px;
                height: 20px;
                background: var(--thumb-color);
                border-radius: 50%;
                cursor: pointer;
                transition: background 0.2s;
            }
            input[type="range"]::-webkit-slider-thumb:hover {
                background: #ff8533;
            }
        `;
        document.head.appendChild(style);

        // Add event listeners for both input and change events
        slider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            console.log('Setting brightness to:', value); // Debug log
            if (campfire && typeof campfire.setBrightness === 'function') {
                campfire.setBrightness(value);
            } else {
                console.error('Campfire or setBrightness method not found!');
            }
        });

        slider.addEventListener('change', (e) => {
            const value = parseFloat(e.target.value);
            console.log('Brightness changed to:', value); // Debug log
            if (campfire && typeof campfire.setBrightness === 'function') {
                campfire.setBrightness(value);
            }
        });

        container.appendChild(slider);

        // Add close button
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            background: none;
            border: none;
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            padding: 5px;
        `;
        closeButton.onclick = () => {
            document.body.removeChild(container);
        };
        container.appendChild(closeButton);

        document.body.appendChild(container);
    }

    static init() {
        this.createTipsToggle();
    }

    static createTipsToggle() {
        // Create container for the toggle
        const toggleContainer = document.createElement('div');
        toggleContainer.id = 'tips-toggle';
        toggleContainer.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            font-family: 'Honoria', sans-serif;
            color: #D2B48C;
            background: rgba(0, 0, 0, 0.7);
            padding: 10px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 1px solid #8B4513;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
        `;
        toggleContainer.innerHTML = '?';
        toggleContainer.style.color = '#D2B48C';
        toggleContainer.onclick = (e) => {
            e.stopPropagation();
            this.toggleMenu();
        };

        // Create dropdown menu
        const menu = document.createElement('div');
        menu.id = 'tips-menu';
        menu.style.cssText = `
            position: absolute;
            top: 0;
            left: 100%;
            margin-left: 10px;
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid #8B4513;
            border-radius: 10px;
            padding: 5px 0;
            min-width: 120px;
            display: none;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        `;

        // Menu items
        const menuItems = [
            { text: 'Toggle Tips', action: () => this.toggleTips() },
            { text: 'About Me', action: () => this.navigateToSection('about') },
            { text: 'Projects', action: () => this.navigateToSection('projects') },
            { text: 'Contact', action: () => this.navigateToSection('contact') }
        ];

        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.style.cssText = `
                padding: 6px 12px;
                color: #D2B48C;
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: 'Honoria', sans-serif;
                font-size: 14px;
            `;
            menuItem.textContent = item.text;
            menuItem.onmouseover = () => {
                menuItem.style.background = 'rgba(139, 69, 19, 0.3)';
                menuItem.style.color = '#fff';
            };
            menuItem.onmouseout = () => {
                menuItem.style.background = 'transparent';
                menuItem.style.color = '#D2B48C';
            };
            menuItem.onclick = (e) => {
                e.stopPropagation();
                item.action();
                this.toggleMenu();
            };
            menu.appendChild(menuItem);
        });

        toggleContainer.appendChild(menu);
        document.body.appendChild(toggleContainer);

        // Close menu when clicking outside
        document.addEventListener('click', () => {
            menu.style.display = 'none';
        });

        // Set initial state to ON
        const instructions = document.getElementById('instructions');
        if (instructions) {
            instructions.style.display = 'block';
        }
    }

    static toggleMenu() {
        const menu = document.getElementById('tips-menu');
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }

    static navigateToSection(section) {
        // Get the interaction controller from the window object
        const interactionController = window.interactionController;
        if (!interactionController) return;

        // First zoom to the appropriate view
        switch(section) {
            case 'about':
                interactionController.navigationController.zoomToAbout();
                setTimeout(() => UI.showAbout(), 1000);
                break;
            case 'projects':
                interactionController.navigationController.zoomToDesk();
                setTimeout(() => UI.showPortfolio(), 1000);
                break;
            case 'contact':
                interactionController.navigationController.zoomToDesk();
                setTimeout(() => UI.showContact(), 1000);
                break;
        }
    }

    static toggleTips() {
        const instructions = document.getElementById('instructions');
        const toggle = document.getElementById('tips-toggle');
        
        if (instructions.style.display === 'none') {
            instructions.style.display = 'block';
            toggle.style.color = '#D2B48C';
        } else {
            instructions.style.display = 'none';
            toggle.style.color = '#8B4513';
        }
    }
}

// Initialize UI when the script loads
UI.init();

// Make UI globally available
window.UI = UI;