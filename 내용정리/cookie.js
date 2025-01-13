// 아래의 코드는 node에서 쿠키 저장시 사용한 예시
// 기능은 로그인 구현
// 쿠키 문자열을 자바스크립트 객체로 변환하는 함수
// const parseCookies = (cookie = '') =>
//     cookie
//        .split(';')
//        .map(v => v.split('='))
//        .reduce((acc, [k, v]) => {
//           acc[k.trim()] = decodeURIComponent(v);
//           return acc;
//        }, {});
 
 
//  http
//     .createServer(async (req, res) => {
    
//           // 먼저 저장되어있는 쿠키가 있는지 없는지 검사
//        const cookies = parseCookies(req.headers.cookie); // 변환 -> { mycookie: 'test' }
 
//        // form에서 action이 /Login으로, submit하면 발동
//        if (req.url.startsWith('/login')) {
       
//           const { query } = url.parse(req.url); // url을 객체로 만들어 query키만 빼옴
//           const { name } = qs.parse(query); // query키의 값인 문자열을 또 객체화해서 name키만 빼옴. 이 값은 쿠키에 저장될꺼임
 
//           const expires = new Date();
//           expires.setMinutes(expires.getMinutes() + 5);
 
//           res.writeHead(302, {
//              Location: '/',
//              'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
//           });
//           res.end();
 
 
//        } else if (cookies.name) { // name이라는 쿠키가 있는 경우, 로그인 된 경우


// 위의 코드는 node로 로그인을 구현한 예시인데
// node는 개발자가 일일히 처리해줘야 하는 불편함이 있음.
// 참고로 document.cookie를 통해 vanilaJS 또한 쿠키를 다룰수 있음.

// Express 에서는 쿠키를 읽거나 쓰거나를 cookie-parser 미들웨어를 통해 접근할수있음.
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cookieParser()); // get요청이 오면 uri변수들이 파싱되어 req.cookies객체에 저장된다.
// 쿠키를 쓸 준비 완료.
app.get('/', (req, res) =>{

    //쿠키 읽기
    if(req.cookies){
        console.log(req.cookies);
    }else{
        // 쿠키 세팅
        res.cookie('name', encodeURIComponent(name),{
            expires:new Date(),
            httpOnly:true,
            path:'/',
            gunchim:'ssak'
        })
    }
    res.send('cookie test');
})

app.listen(app.get('port'), ()=>{
    console.log('port', '빈 포트에서 대기중');
})