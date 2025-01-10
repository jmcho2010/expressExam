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

let app = express();
let port = 3000;

