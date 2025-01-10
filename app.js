const express = require('express');
const path = require('path');

// 요청 처리와 포트설정등을 처리
const app = express();

// 서버에 포트번호 3000번을 정의
app.set('port', process.env.PORT || 3000);

// 미들웨어의 예시
// 이 코드는 메인페이지로 접속했을때(메인을 요청했을때)
// 처리와 응답으로 어떤것을 전송할지를 정한다.
// 여기서도 역시나 콜백은 계속씀. 
// 정확히는 get의 콜백함수를 미들웨어라 할수 있음.
// post, use
// use : url에 관계없이 매번 실행되는 미들웨어
//  -> 중간에 요청을 가로채거나 요청을 다른 방법으로 컨트롤할때 사용.
app.get('/', (req, res) =>{

    //res.send("떠....떳냐?")

    // 저 html 파일 붙여볼거임
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), () =>{
    console.log(app.get('port'), ' 이건 무엇?');
})