const axios = require('axios');

const fetchGitHubUserData = async (username) => {
    try {
        const userRes = await axios.get(`https://api.github.com/users/${username}`);
        const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
        
        const repos = reposRes.data;
        let totalStars = 0;
        let totalForks = 0;
        let langCount = {};

        repos.forEach(repo => {
            totalStars += repo.stargazers_count;
            totalForks += repo.forks_count;
            if (repo.language) {
                langCount[repo.language] = (langCount[repo.language] || 0) + 1;
            }
        });

        const topLanguage = Object.keys(langCount).length ? 
            Object.keys(langCount).reduce((a, b) => langCount[a] > langCount[b] ? a : b) : null;

        const accountCreated = new Date(userRes.data.created_at);
        const now = new Date();
        const accountAgeDays = Math.floor((now - accountCreated) / (1000 * 60 * 60 * 24));

        return {
            username: userRes.data.login,
            full_name: userRes.data.name,
            public_repos: userRes.data.public_repos,
            followers: userRes.data.followers,
            following: userRes.data.following,
            total_stars: totalStars,
            total_forks: totalForks,
            top_language: topLanguage,
            account_age_days: accountAgeDays,
        };
    } catch (error) {
        throw new Error(`GitHub API Error: ${error.response?.status || error.message}`);
    }
};

module.exports = { fetchGitHubUserData };