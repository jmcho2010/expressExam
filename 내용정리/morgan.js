// morgan.js
// -> 요청과 응답 자체의 정보를 가져오는 미들웨어
// -> 에러 검출이나 로그가 필요할시 사용.
// -> 개발, 운영환경별로의 설정도 가능

// express의 장점중 하나는 개발환경 운영환경 나누기가 매우 쉬움
const express = require('express');
const path = require('path');
const morgan = require('morgan'); // 미들웨어 연결

const app = express();
app.set('port', process.env.PORT || 3000);

// 로그 기록
if (process.env.NODE_ENV === 'production') { 
   app.use(morgan('combined')); // 배포환경이면
} else {
   app.use(morgan('dev')); // 개발환경이면
}

app.get('/', (req, res) => { 
   res.send('Hello, index');
});

app.listen(app.get('port'), () => {
  console.log('port', '번 포트에서 대기 중');
});