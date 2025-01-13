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

const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const session  = require('express-session'); // 세션관리용 미들웨어
const fileStore = require('session-file-store')(session); // 세션파일스토어

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
    secure : true, // 
    secret : process.env.COOKIE_SECRET // 암호화시 쓰일키 지정
}))

// 세션 관련속성