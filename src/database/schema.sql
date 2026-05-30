 -- creating database to first 
 
CREATE DATABASE github_analyzer;
USE github_analyzer;

CREATE TABLE user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    public_repos INT,
    followers INT,
    following INT,
    total_stars INT,
    total_forks INT,
    top_language VARCHAR(100),
    account_age_days INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);