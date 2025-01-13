// express
// node를 다이렉트로 쓰기가 너무 복잡하고 할게많음.
// -> 개발자가 일일히 손보고 하느냐 할게 너무 많음.
// -> 프레임워크를 통해 좀더 쉽고 빠르게 서버의 세팅을 진행할수 있음.
// -> express는 node기반의 경량 프레임워크
// express 가 있다면 프로젝트 관리를 더 쉽고 빠르고 편하게 할수 있음.

// express의 미들웨어
// 사전상 미들웨어의 의미
//  운영체제와 기계 사이를 중계역할하는 소프트웨어(중간에서 매개역할)
//  요청과 응답 중간에 위치해 있는 소프트웨어(코드)
//   (요청과 응답을 제어하는 코드)

// 템플릿 엔진
// html자체는 정적(주어진 기능만 사용할수 있음,)
//  -> html은 직접 기능을 추가하기위해 js의 존재가 필수.
//  -> 자바스크립트를 사용하여 html을 랜더링할수 있도록 처리.
//  -> pug, Handlebars
//  -> 우리는 ejs를 사용할거. html의 양식을 거의 그대로 사용할수 있음.
//  -> 개념상으로는 동적인 랜더링을 위해 사용.
//     (데이터의 결과를 쉽게 화면에 랜더링 하기위해 쓴다해도 과언은 아님.)
// https://expressjs.com/id/resources/middleware/body-parser.html
// 모듈들을 사용할때 변수에 담아두는 이유는
// express.모듈명 <--- 이런식으로 진행되야함
//  -> 모듈쓸때마다 express.
// 미들웨어 모듈
// 1. body-parser : http 요청 body를 파싱
//  - express.bodyParser
// 2. compression : http 요청 압축
//  - express.compress
// 3. connect-rid : 고유한 요청 id 생성
// 4. cookie-parser : 쿠키 헤더를 파싱하고 req.cookies에 할당하는 모듈
//  - 쿠키에 정보를 추가할때 사용.(UI개발자가 쓸일은 드물음.)
// 5. cookie-session : 쿠키 기반의 세션 생성시 사용
// 6. cors : 다양한 옵션들을 이용하여 CORS 활성화
//   - cors : 서버가 다른 출처로부터의 엑세스를 허용하거나 제한할수 있게 하는 
//     HTTP 헤더 기반의 메커니즘.
// 7. csurf : CSRF 취약점 방어
// 8. errorhandler : 에러 디버깅및 수정시 사용
// 9. method-override : 헤더를 이용하여 HTTP method 변경시
// 10. morgan : 요청로그 남기기
// 11. multer : multi-part formdata 처리
// 12. serve-index : 주어진 경로의 디렉토리 리스트 제공
// 12. serve-static : 정적 파일 제공
// 13. session : 서버 기반의 세션 생성(세션을 제어하여 로그인 시간제한을 둘 수 있음)
// 14. timeout : http 요청 처리를 위한 timeout(요청이 너무 길어지면 다른작업을 못할수 있어서)
//               일정 시간이 지나면 자동으로 끊을때 사용.
// 15. vhost : 가상 도메인 생성.

// 라우터, 라우팅

// 라우팅 
// 서로 다른 ip 네트워크간의 패킷을 전달하는 프로세스(최적의 경로를 선택하는 프로세스)
//  -> express에서는 ip가 다르진 않기때문에 패킷전달용으로 활용

// 라우터
// 라우팅 중계 장비

// express에서는 app.js같은 파일에서
// app.get 같은 HTTP method와 연관되어 있는 부분들이
// 라우터라 생각하면됨.

// next() 
// 다음라우터로 넘어가는 기능.

// req. res관련 메서드
// req.app: req 객체를 통한 app 객체로의 접근이다. 예를 들어 req.app.get('port')와 같은 식으로 사용할 수 있다.
// req.body: body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체이다.
// req.cookies: cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체이다.
// req.ip: 요청의 ip 주소를 담는다.
// req.params: 라우트 매개변수에 대한 정보가 담긴다.
// req.query: 쿼리스트링의 정보가 담긴다.
// req.signedCookies: 서명된 쿠키들은 req.cookies 대신 여기에 담긴다.
// req.get(헤더 이름): 헤더의 값을 가져온다.
// res 객체도 알아보자.

// res.app: 똑같이 res 객체를 통해 app 객체에 접근한다.
// res.cookie(키, 값, 옵션): 쿠키를 응답에 설정하는 메서드이다.
// res.clearCookie(키, 값, 옵션): 쿠키를 응답에서 제거하는 메서드이다.
// res.end(): 데이터 없이 응답을 보낸다.
// res.json(JSON): JSON 형식의 응답을 보낸다.
// res.redirect(주소): 리다이렉트할 주소와 함께 응답을 보낸다.
// res.render(뷰, 데이터): 템플릿 엔진을 렌더링하여 응답할 때 사용하는 메서드이다.
// res.send(데이터): 데이터와 함께 응답을 보낸다. 데이터는 문자열, HTML, 버퍼, 객체, 배열 등이 될 수 있다.
// res.sendFile(경로): 경로에 위치한 파일을 응답한다.
// res.set(헤더, 값): 응답의 헤더를 설정한다.
// res.status(코드): 응답 시의 HTTP 상태 코드를 지정한다.

// ../ <--- 상위폴더 접근
// ./ <---- 현재폴더(생략가능)
// ./test/test2  test/test2