const express = require('express');
const app = express();

// 해당 프로젝트(앱, 어플리케이션)에 관련 설정 속성등을 만듬
app.set('port', process.env.PORT || 3001);

/* 공통으로 사용할 미들웨어를 생성*/ 
app.use((req, res, next) =>{

    console.log("나는 무적권 실행함 ㅋㅋ");
})