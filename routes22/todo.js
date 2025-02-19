// //todo.js
// // 라우팅 쪽에서
// // 파일의 존재여부를 확인하여 읽고쓰기 및 
// // 내용 추가를 컨트롤할 예정.
// let fs = require('fs'); // 파일 관련 시스템 모듈 (파일 다루면 얘는 무조건 필요함)

// // 4개의 요청 처리 진행
// // list : 저장한 ToDo 목록 불러오기
// // add : 새로운 ToDo 항목 추가
// // complete : 선택한 ToDo 항목 완료
// // del : 선택한 ToDo 항목 삭제

// // 이곳이 실질적인 컨트롤러 부분이라 생각하면 편함.

// exports.list = function(req, res){
//     fs.readFile('todo_list.json', 'utf8', (err, data) =>{

//         console.log(data);
//         if(err){
//             console.error("파일 읽기 에러 : ", err);
//             res.status(500).send("서버에러입니다");
//             return;
//         }

//         let list = [];

//         if(data){
//             try{
//                 list = JSON.parse(data).list;
//             }catch(parseErr){
//                 console.error("JSON 파싱 에러:", parseErr);
//             }
//         }
//         res.render('index', { list })
//     });
// };



// // exports.list = function(req, res) {
// //     const fs = require('fs');

// //     console.log("접근?");
    
// //     if (fs.existsSync('./todo_list.json')) {
// //         console.log("파일이 존재합니다.");
// //         // 파일이 존재하면 todo_list.json 파일을 읽음
// //         fs.readFile('./todo_list.json', { encoding: 'utf8' }, function(err, list) {
// //             if (err) {
// //                 console.error("파일 읽기 에러:", err);
// //                 res.status(500).send("파일 읽기 에러");
// //                 return;
// //             }
// //             res.json(JSON.parse(list)); // JSON 데이터로 응답
// //         });
// //     } else {
// //         console.log("파일이 존재하지 않습니다.");
// //         let list = { list: [] };
// //         fs.writeFile('./todo_list.json', JSON.stringify(list), function(err) {
// //             if (err) {
// //                 console.error("파일 쓰기 에러:", err);
// //                 res.status(500).send("파일 쓰기 에러");
// //                 return;
// //             }
// //             console.log("새로운 파일 생성 완료");
// //             res.render('index', { list });
// //             //res.json(list); // 빈 리스트 응답
// //         });
// //     }
// // };
// // exports.list = function(req, res){
// //     console.log("접근?")
// //     fs.existsSync('todo_list.json', function(exists){
// //         console.log("여기는 접근하나?");
// //         if(exists){
// //             // 파일이 존재하면 todo_list.json파일을 읽을거임.
// //             fs.readFile('todo_list.json', {
// //                 'encoding' : 'utf8'
// //             }, function(err, list){
// //                 res.json(list);
// //             });
// //         }else{
// //             console.log("여기는 접근하나????????");
// //             let list = {
// //                 'list' : []
// //             };
// //             fs.writeFile('todo_list.json', JSON.stringify(list), function(err){
// //                 // todo_list.json파일 읽어오기
// //                 console.log("파일 읽는가?");
// //                 res.json(list);
// //             });
// //         }
// //     });
// // };

// // 사용자가 추가 버튼을 누르면
// // json파일에 해당 내용을 저장.
// // 저장한후 저장된 결과까지 사용자가 볼수있도록 처리.
// exports.add = function(req, res){

//     // 사용자가 요청한 내용들을 받아옴.(입력한 할일에 대한 정보를 받아옴)
//     const newContent = req.body.content;

//     fs.readFile('todo_list.json', 'utf8', (err, data) =>{
//         let list = [];
//         if(!err && data){
//             try {
//                 list = JSON.parse(data).list;
//             } catch (error) {
//                 console.log("json 파싱 에러임", error);
//             }     
//        }
//        const newItem = {content: newContent};
//        list.push(newItem);

//        fs.writeFile('todo_list.json', JSON.stringify({ list }), (writeErr) =>{

//             if(writeErr){
//                 console.error("파일 쓰기 에러 : ", writeErr);
//                 res.status(500).send("서버 에러");
//                 return;
//             }
//             // add가 되고나면 json파일의 내용이 변경.
//             res.redirect('/list');
//        });


//     });

// };


// // exports.add = function(req, res){

// //     let todo ={
// //         'contents': '',
// //         'complete': false
// //     };
// //     // 요청받은 내용
// //     //  -> 사용자가 입력한 내용을 받아 todo객체의 contents 프로퍼티에 저장.
// //     todo.contents = req.body.contents;

// //     // json 파일에 내용 추가시
// //     // 1. json파일의 내용을 정확히 읽어온다
// //     // 2. 우선 js 객체 타입으로 변경
// //     // 3. 변경된 객체에 내용 추가
// //     // 4. 다시 json으로 바꿔서 저장.
// //     fs.readFile('todo_list.json', {
// //         'encoding' : 'utf8'
// //     }, function (err, data){ // 정확히 받아오면 데이터를 가져옴
// //         data = JSON.parse(data); // json -> object
// //         data.list.push(todo);// todo 객체의 내용을 바뀐 json 객체에 추가.

// //         fs.writeFile('todo_list.json', JSON.stringify(data), function(err){
// //             res.json(true);
// //         });
// //     });

// // };

// // exports.complete = function(req, res){

// // }

// // exports.del = function(req, res){

// // }



const fs = require('fs').promises;
const path = require('path');

const TODO_FILE = path.join(__dirname, '../todo_list.json');

// 파일 존재 확인 및 초기화 함수
async function ensureTodoFile() {
    try {
        await fs.access(TODO_FILE);
    } catch (error) {
        // 파일이 없으면 초기 구조 생성
        await fs.writeFile(TODO_FILE, JSON.stringify({ list: [] }, null, 2));
    }
}

// Todo 목록 조회
exports.list = async function(req, res) {
    try {
        await ensureTodoFile();
        
        const data = await fs.readFile(TODO_FILE, 'utf8');
        const todoData = JSON.parse(data);
        
        res.render('index', { list: todoData.list || [] });
    } catch (error) {
        console.error("파일 읽기 에러:", error);
        res.status(500).send("서버 내부 오류");
    }
};

// Todo 항목 추가
exports.add = async function(req, res) {
    try {
        await ensureTodoFile();
        
        const newContent = req.body.content;
        
        if (!newContent) {
            return res.status(400).send("내용을 입력해주세요");
        }

        const data = await fs.readFile(TODO_FILE, 'utf8');
        const todoData = JSON.parse(data);

        const newItem = {
            id: Date.now(),
            content: newContent,
            completed: false
        };

        todoData.list.push(newItem);

        await fs.writeFile(TODO_FILE, JSON.stringify(todoData, null, 2));
        
        res.redirect('/list');
    } catch (error) {
        console.error("Todo 추가 중 에러:", error);
        res.status(500).send("서버 내부 오류");
    }
};

module.exports = router;