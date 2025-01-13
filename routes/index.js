const express = require('express');
const router = express.Router();

// 실질적 요청에 대한 응답은 라우팅에서 처리.
router.get('/', (req, res) =>{
    res.send('index page');
});

router.get('/test', (req, res) =>{
    res.send('test page');
});

module.exports = router;