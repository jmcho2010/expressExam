const express = require('express');
const router = express.Router();

// 실질적 요청에 대한 응답은 라우팅에서 처리.
router.get('/', (req, res) =>{
    res.render('index', { // render 메서드를 통해 views의 .ejs파일로 연결이 가능.
        title: 'Todo 애플리케이션'
    })
});

router.get('/test', (req, res) =>{
    res.render('gunchim', { // render 메서드를 통해 views의 .ejs파일로 연결이 가능.
        title: 'Todo 애플리케이션'
    })
});

module.exports = router;