
let todoRootEl = document.getElementById("todoRoot");
let userInputEl = document.getElementById("userInput");


function getTodoFromLocalStorage(){

  let myTodoList = localStorage.getItem("myTodoList");

  if(myTodoList === null){

    return [];
  }

  else{

    let parseTodo = JSON.parse(myTodoList);

    return parseTodo;
  }

}



let todolist = getTodoFromLocalStorage();


// To add line-through on the titile

function onStatusUpdate( titleId,checkBoxId){

  let myTitle = document.getElementById( titleId);
  let myCheckedBox = document.getElementById(checkBoxId);

  let findTodo = checkBoxId[checkBoxId.length-1];

  
  for(each of todolist){

      if(each.id == findTodo){

            if(each.isChecked === false){

              each.isChecked = true;
            }

            else{

              each.isChecked = false;
              
            }

      }

  }

 
  if(myCheckedBox.checked === true){

    myTitle.classList.add("checked");
  }

  else{
    myTitle.classList.remove("checked");
  }
}

// To delete the todo

function  onClickBtn(todoId){

  // Remove the todo item

  myTodoEl = document.getElementById(todoId);
  todoRootEl.removeChild(myTodoEl);
  
  
  // Update the todoList array by removing the deleted item
  todolist = todolist.filter(todo => "todo" + todo.id !== todoId);

  // Save the updated todoList to local storage
  onSaveTodo();
}


function createAndAppendEl(each){

  let checkBoxId = "checkbox" + each.id;
  let titleId = "title" + each.id;
  let todoId = "todo" + each.id;


  let todoListEl = document.createElement("li");
  todoListEl.classList.add("todo-list-cont");
  todoListEl.id = todoId;
  todoRootEl.appendChild(todoListEl);

  let checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.id = checkBoxId;
  checkboxEl.onclick = function(){

    onStatusUpdate( titleId,checkBoxId);
  }
  if(each.isChecked === true ){

    checkboxEl.checked = true;
  }
  todoListEl.appendChild(checkboxEl);


  let labelEl = document.createElement("label");
  labelEl.classList.add("label-cont");
  labelEl.htmlFor = checkBoxId;
  todoListEl.appendChild(labelEl);

  let titleEl = document.createElement("h5");
  titleEl.textContent = each.title;
  titleEl.id = titleId;
  if( each.isChecked === true){

    titleEl.classList.add("checked");

  }
  labelEl.appendChild(titleEl);

  let deleteBtnEl = document.createElement("button");
  deleteBtnEl.classList.add("delete-btn");
  labelEl.appendChild(deleteBtnEl);
  deleteBtnEl.onclick = function(){

    onClickBtn(todoId);

  }
  let deleteIconEl = document.createElement("i");
  deleteIconEl.classList.add("fa-solid","fa-trash");
  deleteBtnEl.appendChild( deleteIconEl);

}


// Call above function 

for (each of todolist){

  createAndAppendEl(each); 
  
}


// On new todo add

function onTodoAdd(){


  const newTodo = {

    title:userInputEl.value,
    id : todolist.length + 1,
    isChecked : false
  
  }
  createAndAppendEl(newTodo);

  todolist.push(newTodo);

  console.log(todolist);

  userInputEl.value = "";

}


// To save todo

function onSaveTodo(){

  let stringifyTodo = JSON.stringify(todolist);

  localStorage.setItem("myTodoList",stringifyTodo);
  
}
