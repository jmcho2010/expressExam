// body-parser
// 본문에 있는 데이터를 해석하여 req.body 객체로 만들어주는 미들웨어
//  -> 폼데이터, Ajax요청의 데이터 처리시 사용.
//     (사용자가 입력한 데이터를 처리할때 사용)

// node에서 쓰려면 굉장히 번거로웠음
// 일일히 다 받아서 파싱후 name값을 꺼내는 방식.
// else if (req.method === 'POST') {
//     if (req.url === '/user') {
//        let body = '';
//        // 요청의 body를 stream 형식으로 받음
//        req.on('data', data => {
//           body += data;
//        });
//        // 요청의 body를 다 받은 후 실행됨(응답으로 처리할 부분.)
//        return req.on('end', () => {
//           console.log('POST 본문(Body):', body);
//           const { name } = JSON.parse(body); // name은 클라이언트에서 폼 전송할때 보낸 객체다.
//           const id = Date.now();
//           users[id] = name;
//           res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
//           res.end('ok');
//        });
//     }

// express 에서는 내장된 바디파서 라는것을 활용하여 간단히 뽑아냄.
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// -> 클라이언트에서 데이터를 보냈을때 파싱해서 body에 넣어줌.

app.post('/test', (req, res) =>{

    req.body.name; // 사용자가 전송한 내용을 받아올수 있음

});

