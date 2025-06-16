const textholder = document.querySelector('.textholder')
const placeholder = document.querySelector('.placeholder')
const timer = document.querySelector('.timer');
let timerStarted = false;
function alertTimer() {
    const char = document.querySelectorAll('.letter');
    let correctedchar = 0;
    char.forEach((span) => {
        if (span.classList.contains('text-white')) {
            correctedchar++;
        }
    });
    const wordTyped = Math.round(correctedchar / 5);

    const toast = document.getElementById('toast');
    toast.textContent = `Time's up! Your typing speed is ${wordTyped} WPM`;
    toast.classList.remove('opacity-0', 'pointer-events-none'); // Show toast

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('opacity-0', 'pointer-events-none'); // Hide toast
    }, 3000);
}

function startTimer(){
    let timeRemaining = 60;
    const intervalId = setInterval(() => {
        timeRemaining--;
        timer.innerText = timeRemaining;
        if(timeRemaining <=0){
            clearInterval(intervalId);
            alertTimer();
        }
    }, 1000);
}
document.addEventListener('DOMContentLoaded',()=>{
    placeholder.focus();
})
document.addEventListener('keydown', ()=>{
    placeholder.focus();
    if(!timerStarted){
        startTimer();
        timerStarted = true;
    }

})
// Adding Words to the div
async function addText(){
    try{
    const offloadText =await  fetch('https://api.quotable.io/random').then();
    const response = await offloadText.json();
    const text = response.content;
    const wordArray = text.trim().split(/\s+/);
    for(const word of wordArray){
        const wordspan = document.createElement('div');
            wordspan.classList.add('word');
            wordspan.classList.add('inline-block');
            
            
    
        for(const char of word){
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('letter');
            wordspan.appendChild(span);
        }

        const space = document.createElement('span');
        space.innerHTML = '&nbsp;';
        space.classList.add('letter');
        wordspan.appendChild(space);
        
        textholder.appendChild(wordspan);

    }
    }
    catch(error){
        console.log("Something went Wrong");
        
    }

}

for(i = 0; i<8; i++){
      addText();
}

let currentIndex = 0;
placeholder.addEventListener('keydown', (ev=>{
    const key =(ev.key);
    console.log(ev.key);
    
    let char = document.querySelectorAll('.letter');
    const currentChar = char[currentIndex]?.innerText;
    if(key === 'Backspace' && currentIndex > 0){
            currentIndex--;
            char[currentIndex].classList.remove('text-white', 'text-[#ca4754]');
        }
    if(key ==='Backspace' && (ev.ctrlKey || ev.metaKey))
        {
        if(currentIndex >0){
            const parent = char[currentIndex].parentElement;
            const letters = parent.querySelectorAll('.letter')
            const wordLength = letters.length;
            for(i =0; i<wordLength && currentIndex>0; i++){
                currentIndex--;
                char[currentIndex].classList.remove('text-white', 'text-[#ca4754]')
            }
            ev.preventDefault();
        }
    }
    if((key === 'r' || key ==="R") && (ev.ctrlKey || ev.metaKey)){
        ev.preventDefault();
        window.location.reload();
    }
    if(key.length === 1 || key === " "){
        if(key === currentChar || (key === ' ' && key ==='\xa0')){
            char[currentIndex].classList.add('text-white');
            currentIndex++;
        }
        
        else{
            char[currentIndex].classList.add('text-[#ca4754]');
            currentIndex++;
        }
        
        ev.preventDefault();
    }
    
}))