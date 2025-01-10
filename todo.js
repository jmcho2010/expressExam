// 로딩 하자마자
// 데이터 불러오기 요청을 진행

//데이터 로딩은 비동기로 처리
$(document).ready(function () {
	$.ajax('/list', {
		'success': function (list) {
			var trs = '';

			list = JSON.parse(list).list;

			for(var i = 0, len = list.length; i < len; i++) {	// 테이블 내용 만들기
				trs += '<tr>' + 
							'<td>' + (i + 1) + '</td>' + 
							'<td>' + list[i].contents + '</td>' + 
							'<td><button type="button" class="btn btn-success">완료</button></td>' + 
							'<td><button type="button" class="btn btn-danger">삭제</button></td>' + 
						'</tr>';
			}

			$('tbody').html(trs);
		}
	});
});