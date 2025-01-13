// 이번에는 직접연결을 처리할 예정.
// const express = require('express');
// const router = express.Router();

// 직접 라우팅했기 때문에 exports로 처리하는 방법을 제시
const fs = require('fs').promises;
const path = require('path');// db로 직접 연결하지 않기때문에 우선 json파일에 저장해두려고.

const TODO_FILE_PATH = path.join(__dirname, 'todo_list.json');

// 파일읽기 헬퍼함수.
async function readTodoFile(){
    try { // DB나, 파일로딩들은 반드시 예외처리를 추가할것
        // todo가 저장된 파일을 비동기로 읽어들임.
        const data = await fs.readFile(TODO_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) { // 에러가난 경우 : 파일이 없는경우.
        const initialList = { list: [] }; //리스트 초기화
        await fs.writeFile(TODO_FILE_PATH, JSON.stringify(initialList));// json타입의 파일 생성.
        return initialList; // 생성된 파일을 byte코드로 던져줌.
    }
}

// 여기는 요청이 왔을때 응답을 처리하는 영역.
// 목록조회는 실질적으로 요청에서 받아올건 없음.
// 그래서 요청이 들어왔을때 응답으로 todo_list.json파일의 내용을 보여주는것이
// 핵심 목표.
// 목록 조회
exports.list = async(req, res) =>{

    try {
        const todoList = await readTodoFile();
        //그렇다면 정상적으로 실행되면 응답으로 뭐가가야함?
        res.json(todoList); // 받아온 todoList의 내용을 응답의 결과로 리턴.
    } catch (error) {
        res.status(500).json({error:'목록 조회 실패'});
    }

};
