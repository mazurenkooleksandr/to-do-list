const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;

let data = localStorage.getItem("ToDo");

if(data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadList(array) {
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash) {
    if(trash){return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function (e) {
    if(e.keyCode == 13){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            localStorage.setItem("ToDo", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

function firsttaskFun () {
    if("onclick"){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            localStorage.setItem("ToDo", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
}

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete") {
        completeToDo(element);

    } else if(elementJob == "delete") {
        removeToDo(element);
    }
    
    localStorage.setItem("ToDo", JSON.stringify(LIST));
});

fetch('https://api.openweathermap.org/data/2.5/weather?q=Vinnytsia&appid=41a3c036f496bacf57632c46c5e3b68e')

    .then(function(resp){ return resp.json() })
    .then(function(data) {
        console.log(data);
        document.querySelector('.weather-block__city').textContent = data.name;
        document.querySelector('.weather-block__degrees').innerHTML = Math.round(data.main.temp - 273) + "&deg;";
        document.querySelector('.weather-block__disclaimer').textContent = data.weather[0]['description'];
        document.querySelector('.weather-block__icons').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" width="40px">`

    });