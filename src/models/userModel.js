const db = require('../config/db');

const saveOrUpdateUser = async (userData) => {
    const query = `
        INSERT INTO user_profiles 
        (username, full_name, public_repos, followers, following, total_stars, total_forks, top_language, account_age_days)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        full_name = VALUES(full_name),
        public_repos = VALUES(public_repos),
        followers = VALUES(followers),
        following = VALUES(following),
        total_stars = VALUES(total_stars),
        total_forks = VALUES(total_forks),
        top_language = VALUES(top_language),
        account_age_days = VALUES(account_age_days)
    `;
    
    const values = [
        userData.username,
        userData.full_name,
        userData.public_repos,
        userData.followers,
        userData.following,
        userData.total_stars,
        userData.total_forks,
        userData.top_language,
        userData.account_age_days
    ];
    
    const [result] = await db.execute(query, values);
    return result;
};

const getAllUsers = async () => {
    const [rows] = await db.execute('SELECT * FROM user_profiles ORDER BY created_at DESC');
    return rows;
};

const getUserByUsername = async (username) => {
    const [rows] = await db.execute('SELECT * FROM user_profiles WHERE username = ?', [username]);
    return rows[0];
};

module.exports = { saveOrUpdateUser, getAllUsers, getUserByUsername };