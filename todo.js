// 로딩 하자마자
// 데이터 불러오기 요청을 진행

//데이터 로딩은 비동기로 처리

document.addEventListener('DOMContentLoaded', async() =>{

    // 우선 데이터 목록을 확인해야하기때문에 해당 경로로 요청을 보낼거임
    // 외부 서버로의 요청이 아닌 우리가 직접 만든 프로젝트 내의 서버이기때문에
    // 도메인까지 쓸 필요 x(처리에 맞는 url로 요청하면 됨.)
    const response = await fetch('/list');

    if(!response.ok){
        throw new Error("리스트를 불러오는데 실패했습니다.");
    }

    // 저쪽에 요청을하면 json타입으로 데이터를 받아올거임.
    const data = await response.json();
    const list = data.list;
    let trs = '';

        for(var i = 0, len = list.length; i < len; i++) {	// 테이블 내용 만들기
            trs += '<tr>' + 
                        '<td>' + (i + 1) + '</td>' + 
                        '<td>' + list[i].contents + '</td>' + 
                        '<td><button type="button" class="btn btn-success">완료</button></td>' + 
                        '<td><button type="button" class="btn btn-danger">삭제</button></td>' + 
                    '</tr>';
        }
        document.querySelector('tbody').innerHTML = trs;

})





// todo.js 코드를 -> promise or async를 사용해서 변경
// $(document).ready(function () { // todo.js 호출되자마자 실행되도록
// 	$.ajax('/list', {
// 		'success': function (list) {
// 			var trs = '';

// 			list = JSON.parse(list).list;

// 			for(var i = 0, len = list.length; i < len; i++) {	// 테이블 내용 만들기
// 				trs += '<tr>' + 
// 							'<td>' + (i + 1) + '</td>' + 
// 							'<td>' + list[i].contents + '</td>' + 
// 							'<td><button type="button" class="btn btn-success">완료</button></td>' + 
// 							'<td><button type="button" class="btn btn-danger">삭제</button></td>' + 
// 						'</tr>';
// 			}

// 			$('tbody').html(trs);
// 		}
// 	});
// });