# GitHub Profile Analyzer

A simple Node.js API that analyzes GitHub user profiles, stores the results in MySQL, and exposes endpoints to retrieve saved profiles.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root or copy `.env.example`:

```bash
cp .env.example .env
```

3. Update `.env` with your MySQL database credentials:

```dotenv
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root123
DB_NAME=github_analyzer
PORT=3000
```

4. Create the MySQL database and table if needed.

Example schema:

```sql
CREATE DATABASE IF NOT EXISTS github_analyzer;
USE github_analyzer;

CREATE TABLE IF NOT EXISTS user_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  public_repos INT,
  followers INT,
  following INT,
  total_stars INT,
  total_forks INT,
  top_language VARCHAR(255),
  account_age_days INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

5. Start the server:

```bash
npm run dev
```

or for production:

```bash
npm start
```

The server runs on `http://localhost:<PORT>`.

## API Endpoints

### 1. Analyze and save a GitHub user

`POST /api/analyze/:username`

Example:

```bash
curl -X POST http://localhost:3000/api/analyze/octocat
```

What it does:
- Fetches GitHub profile data from the GitHub API
- Fetches public repositories for the user
- Calculates totals for stars, forks, and top language
- Computes account age in days
- Saves or updates the result in the `user_profiles` table

Response example:

```json
{
  "message": "User analyzed and saved successfully",
  "data": {
    "username": "octocat",
    "full_name": "The Octocat",
    "public_repos": 8,
    "followers": 5000,
    "following": 9,
    "total_stars": 123,
    "total_forks": 45,
    "top_language": "JavaScript",
    "account_age_days": 4300
  }
}
```

### 2. Get all saved profiles

`GET /api/profiles`

Example:

```bash
curl http://localhost:3000/api/profiles
```

Returns:
- All saved GitHub profile analyses from the database

### 3. Get a single saved profile by username

`GET /api/profile/:username`

Example:

```bash
curl http://localhost:3000/api/profile/octocat
```

Returns:
- The saved profile for the requested username
- `404` if the profile is not found

## Project Structure

- `server.js` - app entry point
- `src/routes/userRoutes.js` - API route definitions
- `src/controllers/userController.js` - request handling logic
- `src/services/githubService.js` - GitHub API fetching and analysis
- `src/models/userModel.js` - MySQL database operations
- `src/config/db.js` - database connection config

## Notes

- This project uses GitHub public API endpoints, so rate limiting may apply.
- The MySQL table must exist before calling the API.
- `dotenv` loads environment variables from `.env`.
