const express = require('express');
const router = express.Router();

// app3.js를보면
// use에서 user.js의 주소를 
// /user로 시작하도록 처리
// 즉 이쪽으로 요청을 넘겨받으려면
// /user/test22
router.get('/item', (req, res) =>{
    res.send('find page');
});

module.exports = router;