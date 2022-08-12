//creating buttonand telling JavaScript to get the element from the HTML document that has the Id add-button.
var addButton =document.getElementById("add-button");
//This listener will wait for a click on addButton, and when it ‘hears’ the click, it will react by running the addToDoItem function. Of course, it won’t work just yet, since you haven’t written an addToDoItem function yet!
addButton.addEventListener("click" ,addToDoItem);
//creating a function addToDoItem
// function addToDoItem() {
//     alert("Add button clicked!");
// }
function addToDoItem() {
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
}

//Connecting Clear Completed button
function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}
var clearButton =document.getElementById("clear-completed-button");
clearButton.addEventListener("click" ,clearCompletedToDoItems);

//Connecting Empty button
var emptyButton =document.getElementById("empty-button");
emptyButton.addEventListener("click" ,emptyList);
function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}
//Connecting save-button button
var saveButton =document.getElementById("save-button");
saveButton.addEventListener("click" ,saveList);
function saveList() {
    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}

var toDoEntryBox =document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

function newToDoItem(itemText,completed){
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if(completed){
        toDoItem.classList.add("completed");
    }
    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick",toggleToDoItemState);
}

function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

loadList();
