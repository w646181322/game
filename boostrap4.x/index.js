let navLi = document.querySelectorAll(".nav ul li")
// console.log(navLi)
for(let i=0;i<navLi.length;i++){
    let obj = navLi[i]
    console.log(1)
    obj.addEventListener("click",mouseclick)
}

function mouseclick(){
    console.log(2)
    // console.log(this.style.className)
    for(let y=0;y<navLi.length;y++){
        navLi[y].className = "col-md-2 col-lg-2 col-sm-2 col-xs-6"
        // navLi[y].style.backgroundColor = 'red'
    }
    this.className = "nav-active col-md-2 col-lg-2 col-sm-2 col-xs-6"
    console.log(this.className)
}

let bImg = document.querySelector('.banner img')
let lbt = document.querySelector('.lbt')
console.log(document.querySelector('.banner img').clientHeight)
let h = document.querySelector('.banner img').clientHeight
lbt.style.height = h + "px"

let dotli = document.querySelectorAll('.li')
console.log(dotli)
for(let i=0;i<dotli.length;i++){
    dotli[i].addEventListener('mouseover',dotclick)
}

function dotclick(){
    console.log(2)
    // console.log(this.style.className)
    for(let y=0;y<dotli.length;y++){
        dotli[y].className = "li"
    }
    this.className = "dot-active li"
    console.log(this.className)
}