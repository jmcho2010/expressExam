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
            const target = event.target;
            const id = Number(target.dataset.id); // 특정한 내용만 선택하기 위해

            if(target.classList.contains('complete-btn')){
                await completeTodo(id);
            }

        });

    }

    // 조별로 addTodo 메서드 완성해보기
    // 1. 데이터가 정상적으로 추가되는지.
    // 2. 추가한 데이터를 바로 볼수 있는지.
    async function addTodo(){
        // /add로의 요청.

        // add처리후 응답을 어떻게 표현할것인가.
    }


    async function completeTodo(id){

    }

});