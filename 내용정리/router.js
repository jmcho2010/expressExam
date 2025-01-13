// express에서는 
// js파일중에 이름이 같은 파일들이 존재할수 있음.
// 이름이 같은 파일들은 폴더별로는 구분이됨
// 클라이언트단(view단) / 라우터단(서버단)

// 최근 라우팅은 
// index 하나 만들어두고
// 나머지는 업무별로 분배한다 생각하면 편함.
const express = require('express');
const router = express.Router();

// /user/admin으로 들어가면 실행됨
router.get('/user/admin', (req,res) => {
    console.log('Hello, admin!');
}); 

// /user/foo로 들어가면 이쪽이 실행됨. 위에서 아래 순서로 코드가 실행되니까.
router.get('/user/:id', (req, res) => {
    console.log(req.params, req.query);
});

// /user/foo로 들어가도 실행되지 않음
router.get('/user/foo', (req,res) => {
    console.log('Hello, foo!');
}); // => 따라서, router.get('/user/:id', (req, res) => { 보다 위에 위치해야함.

// http method를 전부 지원.
router.post('/user/foo', (req,res) => {
    console.log('포스트 방식 처리');
}); // => 따라서, router.get('/user/:id', (req, res) => { 보다 위에 위치해야함.

// 라우터의 주소가 같은 경우가 존재함.
// but 메서드명은 다르게.
// 왜 굳이 그렇게? 
// get은 해당 페이지 방문, 검색을 위해 사용
// post는 새로운 내용만들기, 수정, 삭제등에 사용
// url을 낭비하지 않도록 메서드명만 다르게 처리하는 경우가 있음.
// 일명 그룹화를 통해서 같은 주소의 처리를 각기 다르게 하는 방법도 있음

// route라는 메서드를 활용하여 그룹화처리 가능.
router.route('/test')
    .get((req, res) => {
        res.send('GET /test');
    })
    .post((req, res) =>{
        res.send('Post /test');
    })