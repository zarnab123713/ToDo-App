let data = JSON.parse(localStorage.getItem("Pro")) || []

render()

function addTask(){
let t = task.value
let d = date.value

if(t=="" || d=="") return

data.push({
text:t,
date:d,
status:"todo"
})

task.value=""
date.value=""

save()
render()
}

function render(){
todo.innerHTML=""
doing.innerHTML=""
done.innerHTML=""

data.forEach((t,i)=>{
let div = document.createElement("div")
div.className="task"

// div.innerHTML = `
// ${t.text}<br>
// <small>Due: ${t.date}</small><br>
// <button onclick="move(${i})">Move Next ➡</button>
// `
div.innerHTML = `
${t.text}<br>
<small>Due: ${t.date}</small><br>

<button onclick="move(${i})">Move Next ➡</button>
<button onclick="del(${i})">Delete 🗑</button>
`
if(t.status=="todo") todo.appendChild(div)
if(t.status=="doing") doing.appendChild(div)
if(t.status=="done") done.appendChild(div)
})

updateDashboard()
}

function move(i){
if(data[i].status=="todo") data[i].status="doing"
else if(data[i].status=="doing") data[i].status="done"
else data[i].status="todo"

save()
render()
}

function updateDashboard(){
let total = data.length
let done = data.filter(t=>t.status==="done").length
let pending = total - done

document.getElementById("total").innerText = total
document.getElementById("completed").innerText = done
document.getElementById("pending").innerText = pending

let percent = total==0 ? 0 : (done/total)*100
document.getElementById("progress").style.width = percent + "%"
}

function save(){
localStorage.setItem("Pro",JSON.stringify(data))
}

// Due date reminder
setInterval(()=>{
let today = new Date().toISOString().split("T")[0]

data.forEach(t=>{
if(t.date===today && t.status!=="done"){
alert("Reminder: " + t.text)
}
})
},60000)

function del(i){
data.splice(i,1)
save()
render()
}