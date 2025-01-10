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

            
        }

    })


}

exports.add = function(req, res){

}

exports.complete = function(req, res){

}

exports.del = function(req, res){

}