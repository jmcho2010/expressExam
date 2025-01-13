const express = require('express');
const path = require('path');
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
const indexRouter = require('./routes/index'); // 이 파일은 라우터를 설정할 파일이다.
//const todoRoutes = require('./routes/todo');

const app = express();
const PORT = process.env.PORT || 3000;

// 환경설정
// const isProduction = process.env.NODE_ENV === 'production';// 이건 지금 운영환경
// 이 코드를 통해 개발/ 운영환경에 대한 분기설정이 가능

// 기본설정 일부를 미리
app.use(express.json()); // JSON 요청이 오면 그 본문을 파싱
app.use(express.urlencoded({extended: true}));// URL 인코딩 데이터 파싱

// 뷰 엔진 설정
app.set('views', path.join(__dirname, 'views')); // views 폴더를 바라보도록
app.set('view engine', 'ejs');// 우리가 사용하는 템플릿 엔진이 ejs니 거기에 맞춰서...
// 프록시 관련된 내용 설정도 가능
app.set('trust proxy', true); // 프록시 신뢰 설정.

// 뷰 엔진설정후에는 정적파일 서비스 또한 추가하여
// 뷰엔진에 css와 js를 잘 적용시킬수 있도록 처리.
//  -> 여기서의 js는 클라이언트단의 js

// static 파일 경로 설정
app.use(express.static(path.join(__dirname, 'static')));
// 경로 설정시 꼭 path.join 메서드를 써야하는가?
//  -> 필수는 아님. 쓰면 편함.
//  -> 경로의 최고문제는 플랫폼별로 인식하는 경로 자체가 다를수 있음
//     ex) 개발서버는 윈도우 환경 -> 운영 linux
//          -> path.join은 절대경로와 상대경로의 문제점을 해결해주면서
//             크로스 플랫폼 호환경로 생성또한 가능.

// 라우터 설정
app.use('/', indexRouter); // 인덱스라우터로 처리 위임.
app.use('/test', indexRouter); // 단순 위임.

//app.use('/todo', todoRoutes);// 이쪽 라우터를 타면 주소가 무조건 /todo로 시작
// ex) list를 처리하는 코드가 있다면 그리고 주소를 /list로 세팅했다면
//     사용자는 요청을 /todo/list로 접근해야 가능.

// 그렇다면 indexRouter에 모든것을 몰아두면 편하게 처리할것같은데
// 왜. 굳이 todoRoutes를 추가하여 복잡하게 일을 처리하는가?
// 1. 라우팅 로직의 모듈화
// 2. 코드 가독성, 유지보수성 향상
// 3. 응집도 결합도 이슈.(기능별 라우트 독립적 관리)
// 4. 관심사 분리의 원칙 적용
//    -> 처리영역은 업무별로 분리하는것이 제일 좋음.



// 지금 프로젝트는 주소 자체는 간단히 처리하고 싶기떄문에
// 직접 라우팅을 설정하는 방법으로 진행.
// list는 다이렉트로 요청이 아니라 메인 접근시 같이 불러오도록 설정.
// app.get('/list', (req, res) => todoRoutes.list(req, res));

// 404처리
// 우리가 만들지 않은 url 요청이 왔을시 처리
//  -> 에러메세지는 사용자에게 가급적 노출x
//  -> 조금만더 응용하면 404에러시 출력할수있는 화면을 따로 만드는것도 가능.

// 서버 시작
const server = app.listen(PORT, () =>{
    // 서버가 실행되면서 같이 실행될 콜백함수 설정
    console.log(`
        🚀 서버 실행 정보 
        - 포트: ${PORT}
        - 환경: ${process.env.NODE_ENV || 'development'}
        - 주소: http://localhost:${PORT}
      `);
});

server.timeout = 5000; // 5초간 서버 응답이 없을 경우 타임아웃처리.
module.exports = app; // 다른 모듈에서 앱을 사용할수 있도록 처리

