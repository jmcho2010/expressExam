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
const secret_key = 'secretKey';

app.use(cookieParser(secret_key));


app.set('port', process.env.PORT || 3000);

app.use(cookieParser()); // get요청이 오면 uri변수들이 파싱되어 req.cookies객체에 저장된다.
// 쿠키를 쓸 준비 완료.
app.get('/', (req, res) =>{

    const test = req.cookies.name;

    const test2 = req.signedCookies.name;
    //쿠키 읽기
    if(test2){
        // 쿠키값을 서버가 받으면 문자로 받게됨.
        console.log(test2);
        console.log(req.signedCookies.count);
    }else{
        // 쿠키 세팅
        const name = {
            name:'test1',
            pw:`1234`
        }; // 실질적인 쿠키의 내용 세팅
        // -> name에 객체 타입으로 던지는게 맞음.

        // 쿠키를 만들때에는 res.cookie를 통해 생성.
        // cookie(키, 값, 옵션형태로 사용이 가능)
        // encodeURIComponent()
        //  -> URI의 특정한 문자를 UTF-8로 인코딩해서 결과를 처리하는 메서드.
        // 쿠키 옵션에서 쓸수 있는 프로퍼티들
        // maxAge : 만료시간을 밀리초 단위로 설정
        // expires : 만료 날짜를 GMT 시간으로 설정.
        // path : 쿠키의 경로 디폴트값 "/"
        // domain : 도메인 네임 디폴트값
        // secure : https에서만 쿠키를 사용할수 있도록 처리.
        // httpOnly : 웹서버를 통해서만 쿠키에 접근할수 있도록 처리.
        // signed : 쿠키에 대한 서명 지정.(실전에서는 대부분 켜둠.)
        //  -> 내 서버가 직접 만든 쿠키인지 아닌지를 검증하기위함.
        //  -> 쿠키의 약점중 하나가 클라이언트 위조가 가능.
        //  -> 서명의 원리는 비밀키를 통해 만들어낸 서명을 쿠키값 뒤에 붙이는것.
        //  -> 서명이 완료된 쿠키는 req.signedCookies 에 들어감.
        res.cookie('name', encodeURIComponent(name),{
            //expires:new Date(), // 이경우에는 쿠키가 즉시만료.
            maxAge:1000*60*60*24, // 24시간(쿠키 유효기간)
            httpOnly:true,
            path:'/',
            signed:true, // 서명처리
            secure:process.env.NODE_ENV === 'prodution'
            // 운영환경은 https로 동작.
            //gunchim:'ssak' // 여기는 말그대로 설정이기 때문에 이 코드는 의미x

            


        })
        let count =0;
        console.log("쿠키생성확인");
    }
    count = count +1;
    res.cookie('count', count, {signed:true});
    console.log(res.cookie); // 크게 의미 없음.
    res.send('cookie test');
})

app.listen(app.get('port'), ()=>{
    console.log('port', '빈 포트에서 대기중');
})