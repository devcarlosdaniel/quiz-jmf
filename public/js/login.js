import { array } from './perguntas.js'

function del(id){
    const players = JSON.parse(localStorage.getItem("players"))
    const deleted = players.filter((player)=>{
        return player.id != id
    })
    localStorage.setItem("players",JSON.stringify(deleted))
}

function render(){
    document.querySelector("body").style.visibility="visible"
    document.querySelector("main h1").innerHTML=`Perguntas: ${array.length}`
    const players = JSON.parse(localStorage.getItem("players"))
    let sortedPlayers = players ? (players.sort((a,b)=>{return b.points - a.points})).slice(0,10) : []
    const tbody = document.querySelector("tbody")
    tbody.innerHTML=""
    sortedPlayers.forEach((player)=>{
        const tr = document.createElement("tr")
        tr.innerHTML=`
            <td>${player.name}</td>
            <td>${player.points}</td>
            <td>
                <button id="DEL${player.id}">X</button>
            </td>
        `
        tbody.appendChild(tr)
        document.querySelector(`#DEL${player.id}`).addEventListener("click",()=>{
            del(player.id)
            render()
        })
    });
}


function login(){
    const password = "698dc19d489c4e4db73e28a713eab07b" //Está escriptada!
    if(md5(prompt("Password"))==password){
        render()
    }else{
        login()
    }
}

document.addEventListener("DOMContentLoaded",login)

document.getElementById("clear").addEventListener("click",()=>{
    if(confirm("Confirma que deseja zerar o ranking?")==true){
        localStorage.clear()
        render()
        alert("Ranking esvaziado!")
    }
})
