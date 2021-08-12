const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');


let todoData = [];

if(localStorage.getItem('arr') !== null) {
    todoData = JSON.parse(localStorage.getItem('arr'));
}


const render = function() {
    
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `<span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>`;
        if(item.comleted) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        
        const todoComplete = li.querySelector('.todo-complete');
        todoComplete.addEventListener('click', () => {
            item.comleted = !item.comleted;
            render();
        });

        const todoRemove = li.querySelector('.todo-remove');
        todoRemove.addEventListener('click', () => {
            todoData.splice(index, 1);
            render();
        });
    });

    localStorage.setItem('arr', JSON.stringify(todoData));
    
};


todoControl.addEventListener('submit', (event) => {
    event.preventDefault();

    if(headerInput.value.trim() === '') {
        return;
    }
    const newTodo = {
        value: headerInput.value,
        completed: false,
    };
    todoData.push(newTodo);
    render();
    headerInput.value = '';
});


render();