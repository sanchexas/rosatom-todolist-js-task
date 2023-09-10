const TODOLIST = 'todolist';
const IS_EVEN = 'even';
const IS_ODD = 'odd';

if(!localStorage.getItem(TODOLIST)){
    localStorage.setItem(TODOLIST, '[]');
}

const RENDER = () =>{
    let ls = JSON.parse(localStorage.getItem(TODOLIST));
    for(let i = 0; i < ls.length; i++){
        document.getElementById('todos').innerHTML += `<div class="todo__item"><span class="${ls[i].isCompleted ? "completed" : ""}">${ls[i].title}</span><div class="todo__item__actions">${ls[i].isCompleted ? "" : '<img class="completeBtn" src="media/check.svg" alt="complete" title="Выполнено">'}<img class="deleteBtn" src="media/delete.svg" alt="delete" title="Удалить"></div></div>`
    }
    activateCompleteButtons();
    activateDeleteButtons();
}

function add(){
    const inputValue = document.querySelector('input').value;
    if(inputValue != ''){
        let ls = JSON.parse(localStorage.getItem(TODOLIST));
        ls.unshift({
            isCompleted: false,
            title: inputValue,
            });
        localStorage.setItem(TODOLIST, JSON.stringify(ls));
        window.location.reload();
    }else{
        alert("Заголовок не может быть пустым!");
    }
}

function remove(key){
    let ls = JSON.parse(localStorage.getItem(TODOLIST));
    ls.splice(key, 1);
    localStorage.setItem(TODOLIST, JSON.stringify(ls));
    window.location.reload();
}

function complete(key){
    let ls = JSON.parse(localStorage.getItem(TODOLIST));
    ls[key].isCompleted = true;
    ls.push(ls[key]);
    ls.splice(key, 1);
    localStorage.setItem(TODOLIST, JSON.stringify(ls));
    window.location.reload();
}

function showEven(){
    let items = document.querySelectorAll('.todo__item');
    items.forEach((item, i)=>{
        if(i%2){
            item.classList.toggle('even');
            document.getElementById('even').classList.toggle('bordered__btn');
        }
    });
}

function showOdd(){
    let items = document.querySelectorAll('.todo__item');
    items.forEach((item, i)=>{
        if(i%2 == false){
            item.classList.toggle('odd');
            document.getElementById('odd').classList.toggle('bordered__btn');
        }
    });
}

function deleteFirst(){
    let ls = JSON.parse(localStorage.getItem(TODOLIST));
    ls.splice(0, 1);
    localStorage.setItem(TODOLIST, JSON.stringify(ls));
    window.location.reload();
}

function deleteLast(){
    let ls = JSON.parse(localStorage.getItem(TODOLIST));
    ls.splice(ls.length-1, 1);
    localStorage.setItem(TODOLIST, JSON.stringify(ls));
    window.location.reload();
}

function activateDeleteButtons(){
    let deleteButton = document.querySelectorAll('.deleteBtn');
    deleteButton.forEach((btn, i)=>{
        btn.addEventListener("click", ()=> remove(i));
    });
}

function activateCompleteButtons(){
    let deleteButton = document.querySelectorAll('.completeBtn');
    deleteButton.forEach((btn, i)=>{
        btn.addEventListener("click", ()=> complete(i));
    });
}

RENDER();