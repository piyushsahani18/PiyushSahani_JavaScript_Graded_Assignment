
let count = 0;
function addNewTaskToList() {
    let taskTextDom = document.getElementById("taskText");
    let taskText = taskTextDom.value;
    if (taskText === null || taskText === undefined || taskText === "") {
        return;
    } else {
        populate(taskText);
        taskTextDom.value = '';
    }
}

function populate(taskText) {
    count++;
    let ul = document.getElementById('taskUl');
    let li = document.createElement('li');
    li.setAttribute('id', 'li' + count);

    let label = document.createElement('label');
    label.setAttribute('id', 'label' + count);
    label.appendChild(document.createTextNode(taskText));

    let editBtn = document.createElement('button');
    editBtn.appendChild(document.createTextNode('Edit'));
    editBtn.setAttribute('id', 'editBtn' + count);
    editBtn.setAttribute('class', 'editBtn');
    editBtn.addEventListener('click', function () {
        editTask('editBtn' + count);
    });


    let deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.setAttribute('id', 'deleteBtn' + count);
    deleteBtn.setAttribute('class', 'deleteBtn');
    deleteBtn.addEventListener('click', function () {
        deleteTask('deleteBtn' + count);});

    li.appendChild(label);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
}


function editTask(editBtnId) {
    disableAllButtons(true);
    let labelNumber = editBtnId.match(/\d+/)[0];
    let labelDom = document.getElementById('label' + labelNumber);
    let taskTextDom = document.getElementById("taskText");


    taskTextDom.addEventListener('keydown', function handler(e) {
        if (e.key === 'Enter') {
            if (taskTextDom.value === undefined || taskTextDom.value === null || taskTextDom.value === "") {
                deleteTask(labelNumber);
            }
            else {
                labelDom.innerText = taskTextDom.value;
                this.removeEventListener('keydown', handler);
                taskTextDom.value = '';
            }
            disableAllButtons(false);
        }
    });
    taskTextDom.value = labelDom.innerText;
}


function deleteTask(deleteBtnId) {
    let labelId = deleteBtnId.match(/\d+/)[0];
    let liToDelete = document.getElementById('li' + labelId);
    liToDelete.remove();
}


function disableAllButtons(disable) {
    let buttons = document.querySelectorAll('button');
    if (disable) {
        buttons.forEach((button) => {
            button.disabled = true;
            button.classList.add('disableBtnOnEdit');
        });
    }
    else {
        buttons.forEach((button) => {
            button.disabled = false;
            button.classList.remove('disableBtnOnEdit');
        });
    }
}

window.onload = function () {
    populate('Task 1');
    populate('Task 2');
    document.getElementById("addBtn").onclick = function () {
        addNewTaskToList();
    }
}