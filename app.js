const express = require('express');
const path = require('path');

// 요청 처리와 포트설정등을 처리
const app = express();

// 서버에 포트번호 3000번을 정의
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) =>{

    //res.send("떠....떳냐?")

    // 저 html 파일 붙여볼거임
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), () =>{
    console.log(app.get('port'), ' 이건 무엇?');
})