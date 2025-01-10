// 프로젝트 만들기
// ToDo list만들기
// 1. 목록 보기
// 2. 새로운 todo 항목 추가
// 3. 항목을 선택하여 완료
// 4. 항목을 선택하여 삭제.

// 구조
// 정적리소스를 저장하는 폴더(static)
// views
// 요청처리 routes
// app2.js(메인 웹 서버)

let express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path');

let app = express(); // express를 사용하기 위한 앱 생성
let port = 3000; // 포트번호 설정
// -> json파일등을 통해 지정해두고 해당 정보를 불러오는것을 권장.
// -> 서버관련설정들은 코드에 직접 적는거보다는 따로 만들어서 관리하는것이 일반적

// 설정의 모든것을 모아두는 메서드
app.configure(function(){
    app.set('port', port); // 포트번호 설정완료
    app.set('views', __dirname + '/views')// html(템플릿 / 템플릿 경로 설정)
    app.set('view engine', 'ejs') // 템플릿엔진 설정
    // 템플릿 엔진은 HTML에서 서버단의 코드를 인식할수있도록
    // 도움을 주는 라이브러리 -> ex) JSP, thymeleaf
    
    app.use(express.logger('dev'));
    app.use(express.bodyParser()); // 요청한 본문 내용 파싱
    app.use(express.methodOverride()); // 구식 브라우저 메서드 지원
    app.use(app.router);// 라우팅.
});

// 개발과 운영환경 설정은 다른경우가 대부분
//  -> log 확인부분, 에러 메세지 처리
// 운영이 아닌 개발 환경에서의 설정 
app.configure('development', function(){
    app.use(express.errorHandler());
});

// get : 검색 및 페이지 방문
// post : 개인정보 전송 및 큰 데이터 저장시 사용
// 라우팅
app.get('/', routes.index);
// todo 리스트 페이지 접근
app.get('/list', todo.list);
app.post('/add', todo.add);
app.post('/complete', todo.complete);
app.post('/del', todo.del);

//서버실행
// get 메서드는 set한 정보를 가져오는것 또한 가능.
http.createServer(app).listen(app.get('port'), function(){
    console.log(`${app.get(port)} 번의 서버가 시작됐습니다.`);
})