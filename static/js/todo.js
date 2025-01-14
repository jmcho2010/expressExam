document.addEventListener('DOMContentLoaded', () =>{

    // 초기 목록 불러오기
    fetchTodoList();

    // 추가버튼 이벤트
    const addButton = document.querySelector('.btn-primary');
    addButton.addEventListener('click', addTodo);


    // 목록 불러오기 함수
    async function fetchTodoList(){
        // 그렇다면 저쪽으로 어떻게 연결할건데?
        // 단순히 요청처리를 하기도하지만
        //요청에 대한 응답의 내용을 어떻게 가공해서 보여줄지도 처리.
        try {
            const response = await fetch('/list');
            const data = await response.json();
            renderTodoList(data.list); // list의 의미는 json내부의 배열명
        } catch (error) {
            console.error("목록 불러오기 실패 ㅠㅠ", error);
        }

    }

    // todo 목록 랜더링 함수
    // renderTodoList 완성해보기.
    // tbody는 이미 존재하고 있으니 tbody의 자식요소로 내용들을 할당할것.
    function renderTodoList(list) {
        // 갖고와야할 정보는?
        const tbody = document.querySelector('#todo-list');
        //불러와야하는 데이터 건수는 몇건인가?
        //map함수는 key:value 데이터를 여러건 뿌릴떄 쓰면좋음
        tbody.innerHTML = list.map((todo, index) =>`
            <tr>
                <td>${index +1}</td>
                <td class="${todo.complete ? 'completed' : ''}">
                    ${todo.contents}
                </td>
                <td>
                    <button type="button" class="btn btn-success complete-btn" data-id="${todo.id}">
                        완료
                    </button>                
                </td>
                <td>
                    <button type="button" class="btn btn-danger delete-btn" data-id="${todo.id}">
                        삭제
                    </button>                
                </td>
            </tr>
        `).join('');

        // 완료/삭제 버튼 이벤트 리스너
        tbody.addEventListener('click', async(event) =>{
            const target = event.target; // 사용자가 선택한 버튼의 정보를 가져오기위해
            const id = Number(target.dataset.id); // 특정한 내용만 선택하기 위해

            // 완료버튼 선택했는지 확인
            if(target.classList.contains('complete-btn')){
                await completeTodo(id);
            }else if(target.classList.contains('delete-btn')){
                await deleteTodo(id);
            }

        });

    }

    // 조별로 addTodo 메서드 완성해보기
    // 1. 데이터가 정상적으로 추가되는지.
    // 2. 추가한 데이터를 바로 볼수 있는지.
    async function addTodo() {
        const todoInput = document.getElementById('new_todo');
        const contents = todoInput.value.trim();

        if (!contents) {
            alert('할 일을 입력해주세요.');
            return;
        }

        try {
            const response = await fetch('/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ contents })
            });
            // 응답 받아온 결과를 화면에 어떻게 보여줄것인가를 구현
            if (response.ok) {
                alert("성공!");
                todoInput.value = '';
                fetchTodoList();
            }
        } catch (error) {
            console.error('Todo 추가 실패:', error);
        }
    }

    // 완료함수
    async function completeTodo(id){
        // id 파라미터는 왜 받아온거지?
        //  -> 버튼이 1개가 아니니깐
        try{
            const response = await fetch('/complete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            if(response.ok){
                fetchTodoList();
            }

        } catch(error){
            console.error('todo 완료 실패 : ', error);
        }
        
    }

    // 조별 미션
    // delete 구현
    // app.js에 라우팅추가
    // 클라이언트 todo.js에 deleteTodo 함수 추가
    // 라우터에 /del 요청 들어왔을시 처리할 코드 추가
    async function deleteTodo(id){
        // id 파라미터는 왜 받아온거지?
        //  -> 버튼이 1개가 아니니깐
        try{
            const response = await fetch('/del', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            if(response.ok){
                fetchTodoList();
            }

        } catch(error){
            console.error('todo 삭제 실패 : ', error);
        }
        
    }

});