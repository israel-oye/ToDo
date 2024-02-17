var allTasks = [];
var showTodos = document.getElementById('showTodo');

function updateContent() {
    showTodos.innerHTML = '';

    allTasks.map((todo, index) => {
        showTodos.innerHTML += `
                <div>${index+1} ${todo['taskName']}<div/>
                 <div class="pb-2">Description: ${todo['description']}<div/>
             `
    });
}


function submitTodo() {
    var todoName = document.getElementById('todoName').value;
    var todoDetail = document.getElementById('todoDetail').value;

    var todoObj = {
        taskName: todoName,
        description: todoDetail
    }

    if (todoName === '' || todoDetail === '') {
        alert('Please enter a value!');
    } else {
        allTasks.push(todoObj);
        console.log(allTasks);

        document.getElementById('todoName').value = '';
        document.getElementById('todoDetail').value = '';

        updateContent();
    }
}


function deleteTodo() {
    var startingIndex = Number(prompt('Which number do you want to delete?'));
    allTasks.splice(startingIndex - 1, 1);
    updateContent();
}