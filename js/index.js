// ******************* selct Element *******************

var addBtn=document.getElementById ('addBtn');
var taskInput=document.getElementById('taskInput');
var mySelect=document.getElementById('mySelect');
var SearchInput=document.getElementById('SearchInput');



addBtn.onclick=addTodo
var todos=[];
if(localStorage.getItem('allTodos')!=null){
todos=JSON.parse(localStorage.getItem('allTodos'))
displayData(todos)
}
function addTodo(){
var task={
    taskDetails:taskInput.value ,
    isCompleted:false,
    id:`${Math.random()*10000}-${Math.random()*10000}`
}
todos.push(task)
clear();
localStorage.setItem("allTodos",JSON.stringify(todos));
console.log(todos);
displayData(todos);

}
// ******************* displayData *******************

function displayData(arr){
  var  cartoona=""
    for(var task of arr){
        cartoona+=`
           <div class=" tasks my-3 rounded text-light d-flex justify-content-between p-3 ${task.isCompleted==true?"bg-task":""}">
    <div class="task d-flex ">
      <i class="fa-regular fa-circle-check me-2  " onclick="beCompleted('${task.id}')"></i>
      <p class="task-text m-0 p-0 align-self-center ${task.isCompleted==true?"completed":""}">${task.taskDetails}</p>
    </div>
    <div>
      <i class="fa-solid fa-trash mx-2" onclick="deleteTodo('${task.id}')"></i>
    </div>
   </div>
        `
    }
    document.getElementById('tasks').innerHTML=cartoona;
}

function beCompleted(id){
  console.log(id);
  var foundedIndex= todos.findIndex(function(task){
    return task.id==id
  })
  todos[foundedIndex].isCompleted=todos[foundedIndex].isCompleted== true?false:true;
  localStorage.setItem("allTodos",JSON.stringify(todos));
  displayAccordingSelectedValue();

}
mySelect.onchange =function(){
 displayAccordingSelectedValue()
}
function displayAccordingSelectedValue(){
 var selectedValue= (mySelect.options[mySelect.options.selectedIndex].value);
  switch (selectedValue){
    case "All":
      displayData(todos);
      break;
      case"Completed":
      var completedTask=todos.filter(function(task){
        return task.isCompleted==true;
      })
      displayData(completedTask)
      break;
      case"Uncompleted":
      var UncompletedTask=todos.filter(function(task){
           return task.isCompleted==false
      })
      displayData(UncompletedTask);
      break;
  }
  
}

// ******************* deleteTodo *******************

function deleteTodo(id){
   var foundedIndex= todos.findIndex(function(task){
    return task.id==id
   })
   todos.splice(foundedIndex,1)
   displayData(todos)
      localStorage.setItem("allTodos",JSON.stringify(todos));

  }

  // ******************* SearchInput *******************
SearchInput.oninput=function(e){
  var searchArr=[];
  for(var i=0;i<todos.length;i++){
    if(todos[i].taskDetails.includes(e.target.value)){
      searchArr.push(todos[i])
    }
  }
  displayData(searchArr);
}

// ******************* clear *******************
function clear(){
taskInput.value='';
}