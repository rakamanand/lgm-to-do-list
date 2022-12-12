//Get all reqiured elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todolist = document.querySelector(".todolist");
const deleteAllBtn = document.querySelector(".footer");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //Get user enter value
    if(userData.trim() != 0){ //if users all are not only space
        addBtn.classList.add("active"); //active the add button
    }else{
        addBtn.classList.remove("active"); //noactive add button
    }

}

showTasks();

//if user click the add button
addBtn.onclick = ()=>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo"); //getting  localstorage
    if(getLocalStorage == null){ //if localstorage null
        listArr = []; //creating a blank array
    }else{
        listArr = JSON.parse(getLocalStorage);  //transforming json atring into json objects
    }
    listArr.push(userData); //pushing are adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming the js object to json string
    showTasks();
}

function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;

    });
    todolist.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task add leave the input field blank
}

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //remove are delete the perticular index li
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks(); //calling showtasks
}

//delete all tasks  function
deleteAllBtn.onclick = ()=>{
    listArr = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}