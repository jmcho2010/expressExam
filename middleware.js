const express = require('express');
const app = express();

// 해당 프로젝트(앱, 어플리케이션)에 관련 설정 속성등을 만듬
app.set('port', process.env.PORT || 3001);

/* 공통으로 사용할 미들웨어를 생성*/ 
app.use((req, res, next) =>{

    req.test = 'test';
    // next : 다음 미들웨어로 넘어가는 함수
    //  - next가 없으면 다음 미들웨어 실행 불가 
    // next는 express에 내장되어있는 메서드.

    next();
})

// get, post건 
// 요청이 왔을때 처리할(url별로 처리할 내용들을 추가.) 
app.get('/test', (req, res) =>{
    console.log(req.test);
    res.send(req.test);
})

app.get('/error', (req, res, next) =>{
    next();
} , (req, res) =>{
    try{

    }catch(err){
        error(err);
    }
});

// 주소부분에 정규표현식을 사용한 내용도 적용이 가능.
// 다만 가장 뒤에 적는게 제일 좋음.
app.get('/category/:name', (req, res) =>{
    res.send(`여기에 들어오는거 확인 ${req.params.name}`)
})

// 이 코드가 있어야 서버 실행이 가능.
app.listen(3001);