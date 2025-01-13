const express = require('express');
const router = express.Router();

// 실질적 요청에 대한 응답은 라우팅에서 처리.
router.get('/', (req, res) =>{
    //render메서드는 랜더링(보여줄떄)
    // 이 템플릿 파일을 참고해주세요라는뜻(확장자 ejs는 이미 설정해서 안써도됨)
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