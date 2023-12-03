import {Globaldata} from './main.js'

export class Task{
    constructor(container,html,itemData){
        this.container=container
        this.html=html
        this.itemData=itemData
        this.index=Globaldata.findIndex(obj => obj.id === this.itemData.id)
        saveUserToLocalStorage(Globaldata)
        this.#Render()
        this.#btnHandler()
    }
    #Render(){
        this.container.insertAdjacentHTML('beforeend', this.html)
        this.element = this.container.lastElementChild;
        checkData(Globaldata)
        if(Globaldata[this.index].state) {
            this.element.querySelector('.task-title').classList.add('task-title--done')
        }
    }
    #btnHandler(){
        let add= this.element.querySelector('.done')
        let remove =this.element.querySelector('.delete')

        add.addEventListener('click',()=>{
            Globaldata[this.index].state=true
            saveUserToLocalStorage(Globaldata)
            this.element.querySelector('.task-title').classList.add('task-title--done')
        })
        remove.addEventListener('click',()=>{
            Globaldata.splice(this.index, 1)
            this.delete()
            checkData(Globaldata)
            saveUserToLocalStorage(Globaldata)

        })
    }
    delete(){
        this.element.remove()
    }
}




export function getUserFromLocalStorage() {
    let userString = localStorage.getItem('user');
    let user = JSON.parse(userString);
    return user;
}
export function saveUserToLocalStorage(user) {
    let userString = JSON.stringify(user);
    localStorage.setItem('user', userString);
}





export function checkData(data){
    if(data.length>0){
        document.getElementById('emptyList').classList.add('d-none')
    }
    else{
        document.getElementById('emptyList').classList.remove('d-none')
    }
}





export function html(data){
    return `
    <li class="list-group-item d-flex justify-content-between task-item">
        <span class="task-title">${data.task}</span>
        <div class="task-item__buttons">
            <button type="button" class="btn-action done">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" class="btn-action delete">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>
    `}