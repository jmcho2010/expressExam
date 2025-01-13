// 세션의 동작순서
// 1. 클라이언트의 요청(해당 페이지 접근, 파일불러오기, 저장등)
// 2. 서버에서는 접근 클라이언트의 cookie를 확인, 클라이언트가 올바른 세션ID를 보냈는가 확인
//     -> 올바른 세션ID라고 했지만 해당 세션ID의 존재 유무만 체크한다
//     -> cookie를 확인한다 했음(Request-Header)
// 3. 세션ID가 없다면 서버는 세션ID를 생성해 클라이언트에게 전송.
// 4. 서버에서 클라이언트로 준 세션ID를 쿠키를 사용해 서버에 저장.
// 5. 클라이언트는 재접속시 해당 쿠키를 이용하여 세션 ID값을 서버에 전달

// session 미들웨어
// 세션구현및 특정사용자를 위한 데이터를 임시로 저장해둘때 유용한 방법.

// 세션에 접근하는 방법.
// 세션 스토어

// const cookieParser = require('cookie-parser');
// const express = require('express');
// const app = express();
// const session  = require('express-session'); // 세션관리용 미들웨어
// const fileStore = require('session-file-store')(session); // 세션파일스토어

// app.use(cookieParser(process.env.COOKIE_SECRET));

// 세션 관련속성
// app.use(session({
//     secure : true, // https 환경에서만 session 정보를 주고받도록 처리
//     secret : process.env.COOKIE_SECRET, // 암호화시 쓰일키 지정
//     resave : false, // 세션을 언제나 저장할지 말지 설정
//     saveUninitialized : true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
//     cookie: { // 세션에 관련된 쿠키 설정(세션 관리시 클라이언트에 보내는 쿠키)
//         httpOnly : true, // 바닐라js를통한 세션쿠키는 사용 불가능.
//         secure: true
//     },
//     name: 'session-cookie' // 설정안하면 디폴트값은 connect.sid
// }))

// app.get('/', (req, res, next)=>{
//     req.session.id = "hello";
// })

// express의 세션은 클라이언트에 세션쿠키를 전송
//  -> 안전하게 쿠키를 전송하려면 서명을 추가해주는것이 좋음.



const express = require('express');
const app = express();
const session  = require('express-session'); // 세션관리용 미들웨어
const fileStore = require('session-file-store')(session); // 세션파일스토어

const port = process.env.port || 9724;

// 세션은 미들웨어에 대한 설정을 먼저 진행하는것이 일반적.
// 파일스토어는 사용하기전에 인스톨이 필요
// 저장할 고유한 저장소에 대한 지정을 따로 할수있음.
// ex) mariaDB , Redis, MongoDB

// 세션을 사용하기 위해서는 npm install --save express-session 로 설치 필요
// 세션세팅
app.use(session({
    secret:process.env.SESSION_SECRET || 'gunchimSSAK',
    resave: false,
    saveUninitialized: false, // 둘다 false로 둔 이유는 우리가 원할때 세션을 생성하기위해.
    cookie: {
        httpOnly: true,
        secure:process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60
    },
    store: new fileStore({
        path: './sessions',
        ttl: 3600, // 데이터, 세션의 만료시간을 제어하는 속성
         // -> 일반 초단위로 설정되어있음.
        retries:2
    })
}));


app.get('/', (req, res) =>{
    // 세션 존재여부 확인 및 카운터 증가
    req.session.num = (req.session.num || 0) + 1;
    res.send(`세션 방문 횟수 : ${req.session.num}`);
});

app.get('/reset', (req, res) =>{
    // 세션 초기화
    // 세션 kill -> 로그아웃 처리시 유용
    // 에러처리를 추가해주는것이 잘못된 요청이나 여러가지 에러사항들을
    // 처리할때 용이.
    req.session.destroy((err) =>{
        //try catch가 정석
        if(err){
            console.error('세션 초기화 실패:' , err);
            return res.statusCode(500).send('세션초기화 실패');
        }
        res.send('세션 초기화 완료');
    })
});

app.listen(port, () =>{
    console.log(`서버 실행중`);
})