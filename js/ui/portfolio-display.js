// UI management for portfolio and contact modals
class UI {
    static showPortfolio() {
        const modal = document.getElementById('portfolioModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = this.getPortfolioContent();
        modal.style.display = 'block';
    }

    static showContact() {
        const modal = document.getElementById('portfolioModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = this.getContactContent();
        modal.style.display = 'block';
    }

    static showAbout() {
        const modal = document.getElementById('portfolioModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = this.getAboutContent();
        modal.style.display = 'block';
    }

    static showMug() {
        const modal = document.getElementById('portfolioModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h1>Mug</h1>
                <p>Just a mug.</p>
            </div>
            <div class="modal-body">
                <div class="section">
                    <h2>Mug.</h2>
                </div>
            </div>
        `;
        modal.style.display = 'block';
    }

    static closeModal() {
        const modal = document.getElementById('portfolioModal');
        modal.style.display = 'none';
    }

    static getPortfolioContent() {
        return `
            <div class="modal-header">
                <h1>My Portfolio</h1>
                <p>Tales of Code & Creation</p>
            </div>
            <div class="modal-body">
                <div class="section">
                    <h2>Featured Projects</h2>
                    
                    <div class="project">
                        <h3>Full-Stack Real Estate Investment Platform</h3>
                        <p>A full-stack web application built with Next.js, Tailwind CSS, and Supabase. Features include user authentication, payment processing, and real-time inventory management.</p>
                        <a href="#" class="project-link">View Project</a>
                        <a href="#" class="project-link" style="margin-left: 10px;">GitHub</a>
                    </div>

                    <div class="project">
                        <h3>Data Visualization Dashboard</h3>
                        <p>Interactive dashboard for analyzing business metrics using D3.js and Python. Processes large datasets and presents insights through dynamic charts and graphs.</p>
                        <a href="#" class="project-link">View Project</a>
                        <a href="#" class="project-link" style="margin-left: 10px;">GitHub</a>
                    </div>

                    <div class="project">
                        <h3>3D Portfolio Website</h3>
                        <p>Immersive campfire-themed portfolio built with Three.js. Features interactive 3D objects, particle systems, and smooth camera transitions for a unique user experience.</p>
                        <a href="#" class="project-link">View Project</a>
                        <a href="#" class="project-link" style="margin-left: 10px;">GitHub</a>
                    </div>

                    <div class="project">
                        <h3>AI Chatbot Integration</h3>
                        <p>Intelligent customer service bot using natural language processing. Integrates with existing CRM systems and provides 24/7 automated support.</p>
                        <a href="#" class="project-link">View Project</a>
                        <a href="#" class="project-link" style="margin-left: 10px;">GitHub</a>
                    </div>
                </div>

                <div class="section">
                    <h2>Technical Skills</h2>
                    <div class="skills-grid">
                        <div class="skill-tag">JavaScript</div>
                        <div class="skill-tag">Python</div>
                        <div class="skill-tag">React</div>
                        <div class="skill-tag">Node.js</div>
                        <div class="skill-tag">MongoDB</div>
                        <div class="skill-tag">Three.js</div>
                        <div class="skill-tag">Docker</div>
                        <div class="skill-tag">AWS</div>
                        <div class="skill-tag">Git</div>
                        <div class="skill-tag">PostgreSQL</div>
                        <div class="skill-tag">TypeScript</div>
                        <div class="skill-tag">GraphQL</div>
                        <div class="skill-tag">WebGL</div>
                        <div class="skill-tag">Blender</div>
                        <div class="skill-tag">D3.js</div>
                        <div class="skill-tag">Express.js</div>
                    </div>
                </div>

                <div class="section">
                    <h2>About Me</h2>
                    <p>I'm a passionate developer who loves creating digital experiences that blend technology with storytelling. When I'm not coding, you can find me around campfires like this one, sharing stories and connecting with others.</p>
                    <p>I believe that great software should feel as natural and inviting as gathering around a warm fire with friends. My approach combines technical expertise with creative vision to build applications that are both functional and memorable.</p>
                    <p>Currently exploring the intersection of web development and 3D graphics, bringing immersive experiences to the browser.</p>
                </div>
            </div>
        `;
    }

    static getContactContent() {
        return `
            <div class="modal-header">
                <h1>Message in a Bottle</h1>
                <p>Let's Start a Conversation</p>
            </div>
            <div class="modal-body">
                <div class="section">
                    <h2>Get In Touch</h2>
                    <p>Ready to start a conversation? Whether you're looking to collaborate on a project, discuss opportunities, or just want to chat about technology and creative coding, I'd love to hear from you.</p>
                </div>

                <div class="section">
                    <h2>Contact Methods</h2>
                    
                    <div class="project">
                        <h3>📧 Email</h3>
                        <p>The best way to reach me for detailed discussions or project inquiries.</p>
                        <a href="mailto:your.email@example.com" class="project-link">Send Email</a>
                    </div>

                    <div class="project">
                        <h3>💼 LinkedIn</h3>
                        <p>Let's connect professionally and expand our networks.</p>
                        <a href="https://linkedin.com/in/yourprofile" class="project-link">Connect on LinkedIn</a>
                    </div>

                    <div class="project">
                        <h3>🐙 GitHub</h3>
                        <p>Check out my code, contribute to projects, or start a technical discussion.</p>
                        <a href="https://github.com/yourusername" class="project-link">View GitHub Profile</a>
                    </div>

                    <div class="project">
                        <h3>🐦 Twitter</h3>
                        <p>Follow my thoughts on web development, 3D graphics, and creative coding.</p>
                        <a href="https://twitter.com/yourusername" class="project-link">Follow on Twitter</a>
                    </div>
                </div>

                <div class="section">
                    <h2>What I'm Looking For</h2>
                    <p><strong>Collaboration Opportunities:</strong> Interesting projects that combine creativity with technology</p>
                    <p><strong>Speaking Engagements:</strong> Talks about Three.js, creative web development, or immersive experiences</p>
                    <p><strong>Open Source:</strong> Contributing to projects that make the web more interactive and engaging</p>
                    <p><strong>Networking:</strong> Meeting fellow developers, designers, and creative technologists</p>
                </div>

                <div class="section">
                    <h2>Response Time</h2>
                    <p>I typically respond to emails within 24-48 hours. For urgent matters, LinkedIn messages tend to get faster responses.</p>
                    <p>Looking forward to connecting! 🔥</p>
                </div>
            </div>
        `;
    }

    static getAboutContent() {
        return `
            <div class="modal-header">
                <h1>About Me</h1>
                <p>The Story Behind the Code</p>
            </div>
            <div class="modal-body">
                <div class="section">
                    <h2>Who I Am</h2>
                    <p>I'm a passionate full-stack developer with a love for creating immersive digital experiences. My journey in tech began with a curiosity about how things work, which evolved into a deep appreciation for the art of software development.</p>
                </div>

                <div class="section">
                    <h2>My Journey</h2>
                    <div class="project">
                        <h3>🎓 Education</h3>
                        <p>Computer Science graduate with a focus on web development and interactive media. Continuously learning and exploring new technologies.</p>
                    </div>

                    <div class="project">
                        <h3>💼 Experience</h3>
                        <p>Worked on diverse projects ranging from enterprise applications to creative interactive experiences. Specialized in building scalable web applications and immersive 3D experiences.</p>
                    </div>

                    <div class="project">
                        <h3>🎯 Current Focus</h3>
                        <p>Exploring the intersection of web development and 3D graphics, creating engaging user experiences that combine technical excellence with creative vision.</p>
                    </div>
                </div>

                <div class="section">
                    <h2>My Approach</h2>
                    <p><strong>Problem Solving:</strong> I believe in understanding problems deeply before crafting solutions</p>
                    <p><strong>User-Centric:</strong> Every line of code should serve the end user's experience</p>
                    <p><strong>Clean Code:</strong> Writing maintainable, well-documented code is a priority</p>
                    <p><strong>Continuous Learning:</strong> Staying current with emerging technologies and best practices</p>
                </div>

                <div class="section">
                    <h2>Beyond the Code</h2>
                    <p>When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical writing and mentoring.</p>
                    <p>I believe in the power of community and collaboration in the tech world, and I'm always excited to connect with fellow developers and creative technologists.</p>
                </div>
            </div>
        `;
    }
}

// Make UI globally available
window.UI = UI;