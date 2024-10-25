const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
   
    valeus:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },

    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimeId: setInterval(countDown, 1000),
    },
};

function countDown(){
    state.valeus.currentTime--;
    state.view.timeLeft.textContent = state.valeus.currentTime;

    if (state.valeus.currentTime <=0){
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O Seu resltado foi: " + state.valeus.result);
    }
}

function playSound(audioName) {
    let audio = new Audio("./src/audio/hit.m4a");
    audio.volume = 0.2;
    audio.play();
  }

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.valeus.hitPosition = randomSquare.id;
}


function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.valeus.hitPosition) {
                state.valeus.result++;
                state.view.score.textContent = state.valeus.result;
                state.valeus.hitPosition = null;
                playSound("Hit");
            }
        });
    });
}


function init() {
    addListenerHitBox();

}

init();