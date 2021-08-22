var addBtn = document.getElementById("add");
if(localStorage.getItem("tasks") == null){
    var tasksObject = {};
    localStorage.setItem("tasks",JSON.stringify(tasksObject))
}else{
    var tasksObject = JSON.parse(localStorage.getItem("tasks"));
}

if(localStorage.getItem("completed") == null){
    var completedObject = {};
    localStorage.setItem("completed",JSON.stringify(completedObject))
}else{
    var completedObject = JSON.parse(localStorage.getItem("completed"));
}



document.addEventListener("DOMContentLoaded",() => {
    updateList("tasks",tasksObject,createIncDiv);
    updateList("completed",completedObject,createCmpDiv);  

})


var updateList = (parent_id,localStorageObject,elemFucn) => {
    let parent = document.getElementById(parent_id);
    parent.innerHTML = "";
    Object.keys(localStorageObject).forEach(a => {
        parent.append(elemFucn(localStorageObject[a],a))
    })
};


addBtn.addEventListener("click", () => {
    let textBox = document.getElementById("input")
    let val = textBox.value;
    if(val == "") alert("add something"); 
    else{
        let parent = document.getElementById("tasks");
        let id = Math.random();
        parent.append(createIncDiv(val,id))
        tasksObject[id] = val;
        localStorage.setItem("tasks", JSON.stringify(tasksObject));
    } 
})

var deleteTask = (id)=>{
    delete tasksObject[id];
    localStorage.setItem("tasks", JSON.stringify(tasksObject));  
}

var deleteCmp = (id)=>{
    delete completedObject[id];
    localStorage.setItem("completed", JSON.stringify(completedObject));  
}

document.addEventListener("click",e =>{
    if(e.target.id == "del"){
        deleteTask(e.target.parentElement.id);
        updateList("tasks",tasksObject,createIncDiv);
        console.log("dv")
    }
    else if(e.target.id == "cmp"){
        let parent = document.getElementById("completed")
        completedObject[e.target.parentElement.id] = tasksObject[e.target.parentElement.id];
        localStorage.setItem("completed", JSON.stringify(completedObject));
        deleteTask(e.target.parentElement.id);
        updateList("tasks",tasksObject,createIncDiv);
        updateList("completed",completedObject,createCmpDiv);    
    }   
    else if(e.target.id == "del-cmp"){
        deleteCmp(e.target.parentElement.id);
        updateList("completed",completedObject,createCmpDiv);
    }
})

var createIncDiv = (task_name,id) =>{
    let parent = document.createElement("div");
    parent.setAttribute("class", "task");
    parent.setAttribute("id", `${id}`);
    let task = document.createElement("p");
    task.innerHTML = `${task_name}`;
    let cmpBtn = document.createElement("button");
    cmpBtn.setAttribute("id","cmp")
    cmpBtn.innerHTML = "COMPLETE";
    let delBtn = document.createElement("button");
    delBtn.setAttribute("id","del");
    delBtn.innerHTML = "DELETE";
    parent.append(task);
    parent.append(cmpBtn);
    parent.append(delBtn);
    return parent;
}

var createCmpDiv = (task_name,id) =>{
    let parent = document.createElement("div");
    parent.setAttribute("class", "task");
    parent.setAttribute("id", `${id}`);
    let task = document.createElement("p");
    task.innerHTML = `${task_name}`;
    let delBtn = document.createElement("button");
    delBtn.setAttribute("id","del-cmp");
    delBtn.innerHTML = "DELETE";
    parent.append(task);
    parent.append(delBtn);
    return parent;
}


