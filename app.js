let gameSeq = [] ;
let userSeq = [] ;

let HighestScore = 0 ;

let btncolor = ["red", "green" , "yellow" , "blue"] ; // this will help to choose color boxes 

let started = false ;
let level = 0 ;

let h2 = document.querySelector('h2') ;
let h3 = document.querySelector('h3'); 


document.addEventListener("keypress" , function () {
    if(started == false){
        console.log("Game Begin") ;
        started = true ;

        levelchange() ;
    }
})

function gameflash(btn){

    btn.classList.add("flash") ;
    setTimeout(function (){
        btn.classList.remove("flash") ;
    } , 100)

}

function userboxflash(btn){

    btn.classList.add("userflash") ;
    setTimeout(function (){
        btn.classList.remove("userflash") ;
    } , 100)

}

function levelchange() {
    userSeq = [] ;
    level++ ;
    h2.innerText = `Level ${level}` ;

    // random color btn choosen 

    let randomindex = Math.floor(Math.random() * 3) ;
    let randomcolor = btncolor[randomindex] ;
    let randombtn = document.querySelector(`.${randomcolor}`) ;
    
    gameSeq.push(randomcolor) ;
    console.log(gameSeq) ;

    gameflash(randombtn) ;
}

function checkans(idx) {

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            if(level > HighestScore){
                HighestScore = level ;
            }
            setTimeout(levelchange , 1000) ;
        }
    }else{
        h2.innerHTML = `Game Over!! Your Score was <b>${level}</b> <br> Press Any key to Start Again.`;
        document.querySelector("body").style.backgroundColor = "red" ;
        setTimeout( function(){
            document.querySelector("body").style.backgroundColor = "white" ;
        }, 500)
        h3.innerText = `Highest Score : ${level}` ;
        restartagain() ;
    } 
}   

function boxpress() {
    let box = this ; 
    userboxflash(box) ;

    usercolor = box.getAttribute("id") ;
    userSeq.push(usercolor) ;

    checkans(userSeq.length - 1) ;
} 

let allbox = document.querySelectorAll(".box") ;

for(box of allbox){
    box.addEventListener("click" ,boxpress) ;
}

function restartagain(){
    userSeq = [] ;
    gameSeq = [] ;

    level = 0 ;
    started = false ;
}