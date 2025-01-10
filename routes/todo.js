//todo.js
// 라우팅 쪽에서
// 파일의 존재여부를 확인하여 읽고쓰기 및 
// 내용 추가를 컨트롤할 예정.
let fs = require('fs'); // 파일 관련 시스템 모듈 (파일 다루면 얘는 무조건 필요함)

// 4개의 요청 처리 진행
// list : 저장한 ToDo 목록 불러오기
// add : 새로운 ToDo 항목 추가
// complete : 선택한 ToDo 항목 완료
// del : 선택한 ToDo 항목 삭제

// 이곳이 실질적인 컨트롤러 부분이라 생각하면 편함.
exports.list = function(req, res){
    fs.existsSync('./todo_list.json', function(exists){
        if(exists){
            // 파일이 존재하면 todo_list.json파일을 읽을거임.
            fs.readFile('./todo_list.json', {
                'encoding' : 'utf8'
            }, function(err, list){
                res.json(list);
            });
        }else{
            let list = {
                'list' : []
            };
            fs.writeFile('./todo_list.json', JSON.stringify(list), function(err){
                // todo_list.json파일 읽어오기
                res.json(list);
            });
        }
    });
}

exports.add = function(req, res){

    let todo ={
        'contents': '',
        'complete': false
    };
    // 요청받은 내용
    //  -> 사용자가 입력한 내용을 받아 todo객체의 contents 프로퍼티에 저장.
    todo.contents = req.body.contents;

    // json 파일에 내용 추가시
    // 1. json파일의 내용을 정확히 읽어온다
    // 2. 우선 js 객체 타입으로 변경
    // 3. 변경된 객체에 내용 추가
    // 4. 다시 json으로 바꿔서 저장.
    fs.readFile('./todo_list.json', {
        'encoding' : 'utf8'
    }, function (err, data){ // 정확히 받아오면 데이터를 가져옴
        data = JSON.parse(data); // json -> object
        data.list.push(todo);// todo 객체의 내용을 바뀐 json 객체에 추가.

        fs.writeFile('./todo_list.json', JSON.stringify(data), function(err){
            res.json(true);
        });
    });

}

exports.complete = function(req, res){

}

exports.del = function(req, res){

}