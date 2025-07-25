console.log('hello world');

let tugas = JSON.parse(localStorage.getItem('tugas')) || [];
let task        = document.getElementById('todo-input');
let date        = document.getElementById('todo-date');
let add         = document.getElementById('add');
let delete_all  = document.getElementById('delete-all');
let filter      = document.getElementById('filter-btn');
let filterSelect = document.getElementById('filter-select');
let list        = document.getElementById('todo-list');
let del         = document.getElementById('delete');
show()
function showAlert(message) {
    const alertCard = document.getElementById('alert-card');
    const alertMessage = document.getElementById('alert-message');
    alertMessage.textContent = message;
    alertCard.classList.remove('hidden');
    setTimeout(() => {
        alertCard.classList.add('hidden');
    }, 3000); 
}

function validate() {
    if (task.value === '' && date.value === '') {
        showAlert('Mohon lengkapi semua input');
        return false;
    }else if(date.value === ''){
        showAlert('Mohon lengkapi tanggal tugas');
        return false;
    }else if(task.value == ''){
        showAlert('Mohon lengkapi nama tugas');
         return false;
    }
    return true;
}
function addTask() {
  if (validate()){
    tugas.push({
        tugas : task.value,
        tgl    :date.value,
        status : ''
    });
    saveTugas();
    show();
  }
}
function removeTask(param){
    tugas.splice(param,1);
    saveTugas();

}
function removeAllTask(){
    tugas = [];
    saveTugas();
    show();

}
function toggleFilter(){

}

function status(status, i) {
    if (status === 'Completed')   tugas[i].status = 'Completed';
     else tugas[i].status = '';
    saveTugas();
    show();

}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}
function saveTugas() {
    localStorage.setItem('tugas', JSON.stringify(tugas));
}
function show() {
    let html = ``;

let filteredTugas = tugas.slice();

    
    const filterValue = filterSelect.value;

    if (filterValue === 'completed')  filteredTugas = filteredTugas.filter(val => val.status === 'Completed');
    if (filterValue === 'asc')    filteredTugas.sort((a, b) => new Date(a.tgl) - new Date(b.tgl));
     else if (filterValue === 'desc')  filteredTugas.sort((a, b) => new Date(b.tgl) - new Date(a.tgl));
    


    
    filteredTugas.forEach((val, i) => {
        html += `
            <tr class="${i % 2 === 0 ? 'bg-blue-50' : 'bg-white'} border-b border-gray-200">
                <td class="pl-4 border-r border-gray-100 align-middle break-words w-[30%]">${val.tugas}</td>
                <td class="text-center border-r border-gray-100 align-middle break-words w-[50%] px-4">${formatDate(val.tgl)}</td>
                <td class="text-center border-r border-gray-100 align-middle break-words w-[50%] px-4 py-2">${(val.status === 'Completed') ? `<span class="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">Completed</span>` :``}</td>
                <td align="right" class="py-2 px-2 flex sm:flex-cols gap-2 justify-end w-[100%]">

                ${val.status !== ''? ``: `<button type="button" class="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 border border-blue-600 text-xs sm:w-auto" onclick="status('Completed', ${i})">Completed</button><button type="button" class="py-1 px-3 rounded bg-red-500 text-white hover:bg-red-600 border border-red-600 text-xs w-full sm:w-auto" onclick="removeTask(${i}); show();">Delete</button>`}
                    
                </td>
            </tr>`;
    });
    list.innerHTML = html;
}

add.onclick = function(e){
    addTask();
    show();
};

delete_all.onclick = function(e){
    removeAllTask();
    show();

}
filter.onclick = function(e){
    show();
};