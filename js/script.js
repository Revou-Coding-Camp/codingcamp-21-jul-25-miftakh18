console.log('hello world');
let tugas = [];

let task        = document.getElementById('todo-input');
let date        = document.getElementById('todo-date');
let add         = document.getElementById('add');
let delete_all  = document.getElementById('delete-all');
let filter      = document.getElementById('filter');
let list        = document.getElementById('todo-list');
show()
function addTask(){
tugas.push({
    tugas : task.value,
    tgl    :date.value
});
show();

}
function removeTask(){

}
function removeAllTask(){
tugas = [];
}
function toggleFilter(){

}

function show(){
tugas.forEach((val,i) => list.innerHTML = `
<tr>
        <td class='pl-4'>${val.tugas}</td>
        <td class='text-center'>${val.tgl}</td>
        <td align='right'><button  type='button' id='complated'>Complated</button><button type='button' id='delete'>Delete</button></td>
</tr>`);
}

add.onclick = function(e){
    addTask();
};

delete_all.onclick = function(e){
    removeAllTask();
}