let isPaused = false;
let timePaused = null;
let exploded = false;
let tmp = null;

let pauseButton = document.querySelector("#pause");

pauseButton.addEventListener("click", _event => {
    if (exploded === false) {
        gamePause();
    }
});

function gamePause()    {
    isPaused = true;
    timePaused = Date.now();
    let overlay = document.createElement("div")
    overlay.classList += "overlay"
    document.body.appendChild(overlay)

    let dashboard = document.createElement("div");
    dashboard.classList += "dashboard";
    
    dashboard.appendChild(playButton);
    dashboard.appendChild(replayButton);
    dashboard.appendChild(menuButton)
    document.body.appendChild(dashboard);
}

function genButton(icon_src)    {
    let button = document.createElement("button");
    let buttoncanvas = document.createElement("canvas");

    button.appendChild(buttoncanvas);
    button.style.padding = 0;
    button.style.margin = "10px";
    
    buttoncanvas.width  = 60;
    buttoncanvas.height = 60;

    buttoncanvas.style.position = 'relative';
    buttoncanvas.style.margin = 0;
    buttoncanvas.style.left = 0;
    buttoncanvas.style.top = 0;

    let button_ctx = buttoncanvas.getContext('2d');
    let button_img = new Image();
    button_img.src = icon_src;
    button_img.zIndex = 1000;
    button_img.onload = () => {
        button_ctx.drawImage(button_img, 3, 1, buttoncanvas.width - 3, buttoncanvas.height - 3);
    };
    
    return button
}

let playButton = genButton("images/buttons/play.png")
playButton.addEventListener("click", _event => {
    gameContinue();
});

function gameContinue() {
    isPaused = false;
    time_mock = Date.now() - (timePaused - time_mock);
    let overlay = document.querySelector(".overlay")
    let menu = document.querySelector(".dashboard")
    document.body.removeChild(overlay)
    document.body.removeChild(menu)
    gameRender()
}

let replayButton = genButton("images/buttons/replay.png")
let replayed = false;

replayButton.addEventListener("click", _event => {
    replayed = true;
    gameReplay();

    setTimeout(() => {
        replayed = false;
    }, 75);
});

function gameReplay() {
    let menu = document.querySelector(".dashboard")
    let overlay = document.querySelector(".overlay")
    document.body.removeChild(menu)
    document.body.removeChild(overlay)
    clearTimeout(losingTimeoutId)
    game(game_mode)
}

let menuButton = genButton("images/buttons/menu.png")

menuButton.addEventListener("click", _event => {
    location.href = "index.html"
});