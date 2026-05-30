const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
require('dotenv').config();


const app = express();
app.use(express.json());

// Use user routes TO api endpoints
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "GitHub Profile Analyzer API is running!",
        version: "1.0.0",
        status: {
            server: "active",
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || "development"
        },
        documentation: {
            base_url: req.protocol + '://' + req.get('host'),
            endpoints: {
                analyze_user: {
                    method: "POST",
                    url: "/api/analyze/:username",
                    description: "Fetch and analyze GitHub user profile, store in database",
                    example: `${req.protocol}://${req.get('host')}/api/analyze/torvalds`
                },
                get_all_profiles: {
                    method: "GET",
                    url: "/api/profiles",
                    description: "Get all analyzed profiles from database",
                    example: `${req.protocol}://${req.get('host')}/api/profiles`
                },
                get_single_profile: {
                    method: "GET",
                    url: "/api/profile/:username",
                    description: "Get specific user profile by username",
                    example: `${req.protocol}://${req.get('host')}/api/profile/torvalds`
                },
                github_repo: {
                    method: "GET",
                    url: "https://github.com/YOUR_USERNAME/github-profile-analyzer",
                    description: "View source code on GitHub"
                }
            }
        },
        setup_instructions: {
            local_setup: {
                database: "MySQL",
                steps: [
                    "1. Install MySQL or use Docker",
                    "2. Create database: github_analyzer",
                    "3. Run schema.sql to create table",
                    "4. Configure .env file with database credentials",
                    "5. Run: npm install",
                    "6. Run: node server.js"
                ]
            },
            docker_setup: {
                command: "docker run --name mysql-github -e MYSQL_ROOT_PASSWORD=root123 -e MYSQL_DATABASE=github_analyzer -p 3306:3306 -d mysql:8.0"
            },
            env_example: {
                DB_HOST: "localhost",
                DB_USER: "root",
                DB_PASSWORD: "your_password",
                DB_NAME: "github_analyzer",
                PORT: 3000
            }
        },
        deployed_endpoints: {
            note: "Database must be configured on deployment platform",
            recommended_platforms: [
                "Railway.app (has built-in MySQL)",
                "Render.com (use ClearDB or Aiven MySQL)",
                "Heroku (use JawsDB MySQL)"
            ]
        }
    });
});

// listen on this port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});