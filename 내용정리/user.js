const express = require('express');
const router = express.Router();

// app3.js를보면
// use에서 user.js의 주소를 
// /user로 시작하도록 처리
// 즉 이쪽으로 요청을 넘겨받으려면
// /user/test22

// 라우터 주소에는 특수패턴 추가가 가능
router.get('/test22/:id', (req, res) =>{
    res.send('user page', req.params.id);
});

module.exports = router;