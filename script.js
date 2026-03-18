const task = document.getElementById("taskInput");
const addtskbtn = document.getElementById("addTask");
const tasklist = document.getElementById("taskList");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//ADD TASK
addtskbtn.addEventListener("click", function() {
    const textValue = task.value.trim();
    if(textValue !== ""){
        const obj = {
            id:Date.now(),
            text:textValue,
            completed:false
        };
        tasks.push(obj);
        task.value="";
        saveToLocalStorage();
        renderTasks();
        
    }
    
});

//Render Task
function renderTasks(){
    tasklist.innerHTML ="";

    //looping through each task
    tasks.forEach((item, index )=> {
        const li=document.createElement("li");
        li.textContent = item.text;
        if(item.completed){
            li.classList.add("completed");
        }

        //Completed task
        li.addEventListener("click", () =>{
            tasks[index].completed =!tasks[index].completed;
            saveToLocalStorage();
            renderTasks();
        });

        //Deleting task
        const deletBtn =document.createElement("button");
        deletBtn.textContent ="delete";
        deletBtn.addEventListener("click", (e) =>{
            e.stopPropagation();
            tasks.splice(index,1);
            saveToLocalStorage();
            renderTasks();
        });
        li.appendChild(deletBtn);
        tasklist.appendChild(li);
    });
}


function saveToLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
renderTasks();