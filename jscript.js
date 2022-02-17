
const buttonPlay = document.getElementById('play');
const selectDifficult = document.getElementById('difficult');
const grid = document.querySelector('.grid');
const main = document.querySelector('main')
const result = document.createElement('h2');
let vettBomb;
let numOfClick;
let columns;
let cellNumber;


buttonPlay.addEventListener('click', function(){
    reset();
    
    switch (selectDifficult.value){
        case 'easy':
            console.log(selectDifficult.value);
            columns = 10;
            cellNumber= columns*columns;
            boxGenerator(cellNumber,columns); //(numero celle , numero colonne)
            vettBomb = bombGenerator(100);
            console.log(vettBomb)
            break;

        case 'medium':
            console.log(selectDifficult.value);
            columns = 9;
            cellNumber= columns*columns;
            boxGenerator(cellNumber,columns);
            vettBomb = bombGenerator(81);
            //console.log(vettBomb);
            break;
        
        case 'crazy':
            console.log(selectDifficult.value);
            columns = 7;
            cellNumber= columns*columns;
            boxGenerator(cellNumber,columns);
            vettBomb = bombGenerator(49);
            console.log(vettBomb);
            break;    
    }
})


/* prendere la cella tramite il this e aggiungere classe dal css, infine rimuovere la possibilità di riselezionarla dopo
function cellCallBack() {
    console.log('cella clickata', this);
    this.classList.add('selected');
    this.removeEventListener('click',cellCallBack)
}*/

function boxGenerator(nBox , nCol){
    for(let i=0; i<nBox; i++){
        var box = document.createElement('div');
        box.classList.add('square');
        box.append(i+1);
        box.style.width = `calc(100% / ${nCol})`;
        grid.appendChild(box);
    }
}

function reset(){ 
    grid.innerHTML = '';
    grid.addEventListener('click', gridCallBack);
    result.innerHTML = '';
    numOfClick=0;
}

function gridCallBack(event){
    numOfClick++;
    const element = event.target;
    element.classList.add('selected');
    const num = parseInt(element.innerHTML);
    for(let i=0; i<vettBomb.length; i++){
        if(num == vettBomb[i]){
            element.classList.add('bomb');
            grid.removeEventListener('click', gridCallBack);
            Lose();
        }
    }
    let winCondition=cellNumber-16
    if(numOfClick == winCondition){
        grid.removeEventListener('click', gridCallBack);
        Win();
    }
    console.log(numOfClick);
    console.log(cellNumber)
     
}

function random(min , max){
    const num = Math.floor(Math.random() * max + min);
    return num;
}

function bombGenerator( nBox ){
    const vett = [];
    let num;
    for(let i=0; i<16; i++){
        do{
            num = random(1,nBox);
        }while(vett.indexOf(num) >=0 )
        vett[i]=num;
    }
    return vett;
}

function Lose(){
    result.innerHTML = `<h2>HAI PERSO score: ${numOfClick - 1}<h2>`
    main.append(result);
}

function Win(){
    result.innerHTML = `<h2>HAI VINTO score: ${numOfClick}<h2>`
    main.append(result);
}
