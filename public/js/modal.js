export function modal(t,m){
    const modal = document.querySelector(m)
    if(t=="open"){
        modal.classList.add("active")
        document.querySelector("main").classList.add("animatedBackground")
    }else if(t=="close"){
        modal.classList.remove("active")
    }
}