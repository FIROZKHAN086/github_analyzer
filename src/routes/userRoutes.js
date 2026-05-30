const express = require('express');
const router = express.Router();
const { analyzeAndSaveUser, getAllProfiles, getSingleProfile } = require('../controllers/userController');

router.post('/analyze/:username', analyzeAndSaveUser);
router.get('/profiles', getAllProfiles);
router.get('/profile/:username', getSingleProfile);

module.exports = router;