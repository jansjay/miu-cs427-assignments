/*
Sanjaya Jaysooriya 
615730
CS472-2023-03A-03D-01
*/
const storageItemKey = "task-list";
function addTask(){
    var taskElem = document.getElementById('task');
    if(!!taskElem && taskElem.value !== "") {
        var taskListLocalStorage = localStorage.getItem(storageItemKey);
        if(!!taskListLocalStorage && taskListLocalStorage.trim() !== "") {
            taskListLocalStorage = taskListLocalStorage.concat("\n", taskElem.value);
            localStorage.setItem(storageItemKey, taskListLocalStorage);
        } else {
            localStorage.setItem(storageItemKey, taskElem.value);
        }
        taskElem.value = "";
        displayList();
    }
}

function clearTasks() {
    localStorage.removeItem(storageItemKey);
    displayList();
}

function displayList() {
    var taskListElem = document.getElementById('task-list');    
    var taskListLocalStorage = localStorage.getItem(storageItemKey);
    if(!!taskListElem && !!taskListLocalStorage) {
        taskListElem.value = taskListLocalStorage;
    } else {
        taskListElem.value = "";
    }        
}