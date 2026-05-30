const { fetchGitHubUserData } = require('../services/githubService');
const { saveOrUpdateUser, getAllUsers, getUserByUsername } = require('../models/userModel');

const analyzeAndSaveUser = async (req, res) => {
    try {
        const { username } = req.params;
        const userData = await fetchGitHubUserData(username);
        await saveOrUpdateUser(userData);
        res.status(200).json({ message: 'User analyzed and saved successfully', data: userData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllProfiles = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSingleProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found in database' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { analyzeAndSaveUser, getAllProfiles, getSingleProfile };