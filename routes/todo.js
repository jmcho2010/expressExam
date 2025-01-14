// 이번에는 직접연결을 처리할 예정.
// const express = require('express');
// const router = express.Router();

// 직접 라우팅했기 때문에 exports로 처리하는 방법을 제시
const fs = require('fs').promises;
const path = require('path');// db로 직접 연결하지 않기때문에 우선 json파일에 저장해두려고.

const TODO_FILE_PATH = path.join(__dirname, 'todo_list.json');

// 파일읽기 헬퍼함수.
// 여기는 추후 DB에 요청하는 함수로 둘수도 있다.
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

// 추가
// 이번에는 요청으로부터 받아오는게있는가?
// 그럼 무엇을 받아오는가?
exports.add = async(req, res) =>{

    try {

        console.log("test1234567890");
        const {contents} = req.body; // 사용자가 저장한 내용을 받아옴

        if(!contents){// 받아온게 없다면(사용자가 입력을 안했다면.)
            return res.status(400).json({error: '내용 입력 바람.'})
        }

        const todoList = await readTodoFile(); // 기존 목록에 추가할거니
                                                // 당연히 기존정보 필요.
                                              // DB로 연결하면 필요x
        
        // 요청데이터를 잘 받아오는것도 중요하지만
        // 받아온 요청데이터를 어떻게 처리하는가도 굉장히 중요.
        // 또한 받아온 데이터를 잘 검증하는것또한 너무 중요.
           const newTodo = {
            id : Date.now(),
            contents, 
            complete: false,
            createdAt : new Date()
        };

        todoList.list.push(newTodo);
        await fs.writeFile(TODO_FILE_PATH, JSON.stringify(todoList), 'utf8');
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({error:'항목 추가 실패'});
    }

};

exports.complete = async(req, res) =>{

    try {
        
        const { id } = req.body;
        // db요청 대신
        // 컴퓨터(서버)입장에서는 어떤 데이터를 어떻게 접근해야하는지
        // 전혀 알수 없기때문에 해당 데이터가 필요.
        const todoList = await readTodoFile();

        // ui(클라이언트)에서 넘긴 id 값과 일치하는 내용을 변수에 저장
        //  -> id값으로 특정 todo리스트 항목 찾기.
        const todoIndex = todoList.list.findIndex(todo => todo.id === id);

        // 제대로 값 못받아온거.(혹은 없는거)
        // 동시접속(a유저가 이미 완료눌렀는데 b유저가 다시 같은항목에 완료를 눌렀다면?)
        if(todoIndex === -1){
            return res.status(404).json({error : '해당 todo 없어용'});
        }
        // complete 상태 전환.
        // true면은 false로 false면은 true로
        todoList.list[todoIndex].complete = !todoList.list[todoIndex].complete;

        await fs.writeFile(TODO_FILE_PATH, JSON.stringify(todoList), 'utf8');
        res.json(todoList.list[todoIndex]);

    } catch (error) {
        res.status(500).json({error:'상태변경실패'});
    }

};

//삭제

exports.del = async(req, res) =>{

    try {
        
        const { id } = req.body;
        // db요청 대신
        // 컴퓨터(서버)입장에서는 어떤 데이터를 어떻게 접근해야하는지
        // 전혀 알수 없기때문에 해당 데이터가 필요.
        const todoList = await readTodoFile();

        // ui(클라이언트)에서 넘긴 id 값과 일치하는 내용을 변수에 저장
        //  -> id값으로 특정 todo리스트 항목 찾기.
        const todoIndex = todoList.list.findIndex(todo => todo.id === id);

        // 제대로 값 못받아온거.(혹은 없는거)
        // 동시접속(a유저가 이미 완료눌렀는데 b유저가 다시 같은항목에 완료를 눌렀다면?)
        if(todoIndex === -1){
            return res.status(404).json({error : '해당 todo 없어용'});
        }

        // 해당 목록에서 삭제하는 방법이 무엇인지
        // 1. 기존 json에 저장된 내용 삭제하기
        // 2. 데이터 불러오고 그것만 지운후에 해당 내용만 전달.

        todoList.list.splice(todoIndex, 1);

        await fs.writeFile(TODO_FILE_PATH, JSON.stringify(todoList), 'utf8');
        res.status(200).json({message : '삭제성공'});

    } catch (error) {
        res.status(500).json({error:'삭제실패'});
    }


};