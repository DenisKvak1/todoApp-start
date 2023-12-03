

import {html,Task, getUserFromLocalStorage,saveUserToLocalStorage, checkData} from './template.js'
let taskList= document.getElementById('tasksList')
let btnAdd=document.getElementById('add')
let removeDoneTasks=document.getElementById('removeDoneTasks')


export let Globaldata=[]



if(Globaldata.length<1 && getUserFromLocalStorage()){
    Globaldata=getUserFromLocalStorage()
    
    Globaldata.forEach((item)=>{
        new Task(taskList, html(item), item)
    })
}

removeDoneTasks.addEventListener('click', ()=>{
    Globaldata = Globaldata.filter(obj => obj.state != true);
    saveUserToLocalStorage(Globaldata)
    taskList.innerHTML=''
    Globaldata.forEach((item)=>{
        new Task(taskList, html(item), item)
    })
    checkData(Globaldata)
})

btnAdd.addEventListener('click', ()=>{
    let inputValue= document.getElementById('taskInput').value
    if(inputValue){
        Globaldata.push({id: +new Date(), task: inputValue, state: false})
        let item=Globaldata[Globaldata.length-1]
        new Task(taskList, html(item), item)
    }
})



