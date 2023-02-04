import { array } from './perguntas.js'
import { modal } from './modal.js'
import { filter } from './filter.js'

const locked = false

if(locked==true){
    window.location.href="./soon.html"
}

function uuidv4(){
    const uuidv4 = Math.floor(Math.random()*999999)
    return uuidv4
}

function clear(){
    document.querySelector("main").innerHTML=`
        <h1 id="themeQuestion"></h1>
        <label id="question"></label>
        <div id="inputs">
        </div>
    `
}

function setScore(nick){
    const newPlayer = {
        id:uuidv4(),
        name:nick,
        points:points
    }
    const players = localStorage.getItem("players")
    const player = players ? JSON.parse(players) : []
    localStorage.setItem("players",JSON.stringify([...player,newPlayer]))
}
function playSound(url){
    const audio = new Audio(`public/sound/${url}.mp3`)
    audio.play()
}

function ranking(){
    const showPlayers = document.getElementById("showPlayers")
    showPlayers.innerHTML=""
    const players = JSON.parse(localStorage.getItem("players"))
    let rankingArray = players ? (players.sort((a,b)=>{return b.points - a.points})).slice(0,10) : []
    rankingArray.forEach((elem)=>{
        const div = document.createElement("div")
        div.classList.add("topPlayer")
        div.innerHTML=`
            <div>${elem.name}</div>
            <div title="Pontos">${elem.points} 🪙</div>
            
        `
        showPlayers.appendChild(div)
    })
    document.getElementById("ranking").addEventListener("click",()=>{
        modal("close","#ranking")
    })
}

let points = 1
function questions(){
    const name = document.getElementById("name").value
    modal("open","main")
    modal("close",".register")
    if(array.length>0){
        let random = Math.floor(Math.random()*array.length)
        const mainTitle = document.querySelector(`main h1`)
        mainTitle.innerHTML=array[random].title
        const mainLabel = document.querySelector(`main label`)
        mainLabel.innerHTML=array[random].text
        const camp = document.querySelector(".camp")
        camp.id="CAMP"+random
        for (let index = 0; index < array[random].alt.length; index++) {
            const element = array[random].alt[index];
            const inputs = document.querySelector("#inputs")
            const div = document.createElement("div")
            div.innerHTML=`<button id="A${element.quote}">(${element.quote}) ${element.text}</button>`
            inputs.appendChild(div)
            document.querySelector(`#A${element.quote}`).addEventListener("click",()=>{
                document.querySelector(`#A${element.quote}`).disabled
                if(element.value==true){
                    clear()
                    questions()
                    points+=1
                    playSound("point")
                }else{
                    clear()
                    modal("open","#lose")
                    setScore(name)
                }
            })
            document.addEventListener("keyup",(e)=>{
                const key = (e.key).toUpperCase()
                if(camp.id=="CAMP"+random){
                    if(key==element.quote && element.value==true){
                        clear()
                        questions()
                        points+=1
                        playSound("point")
                    }else if(key==element.quote && element.value==false){
                        clear()
                        modal("open","#lose")
                        setScore(name)
                    }
                }
            })
        }
        array.splice(random,1)
    }else{
        modal("open","#win")
        setScore(name)
        playSound("win")
    }
    document.getElementById("reset").addEventListener("click",()=>{
        document.location.href="./"
    })
    document.getElementById("new").addEventListener("click",()=>{
        document.location.href="./"
    })
}

let canCreate = false
document.getElementById("create").addEventListener("submit",(e)=>{
    e.preventDefault()

    const name = (document.getElementById("name").value).toUpperCase()
    filter.forEach((e)=>{
        if(name.includes(e.toUpperCase())){
            alert("Você não pode usar esse nome!")
            window.location.href=""
        }else{
            canCreate=true 
        }  
    })

    if(canCreate==true){
        canCreate=false
        questions()
    }

})

document.querySelector("#openRank").addEventListener("click",()=>{
    modal("open","#ranking")
    ranking()
})
