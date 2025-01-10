const express = require('express');
const router = express.Router();

router.get('/test22', (req, res) =>{
    res.send('user page');
});

module.exports = router;