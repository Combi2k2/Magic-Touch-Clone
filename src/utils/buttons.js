let isPaused = false;
let exploded = false;
let tmp = null;

let pauseButton = document.querySelector("#pause");

pauseButton.addEventListener("click", _event => {
    if (exploded === false) {
        isPaused = true;
        gamePause();
    }
});

function gamePause()    {
    let overlay = document.createElement("div")
    overlay.classList += "overlay"
    document.body.appendChild(overlay)

    let menu = document.createElement("div");
    menu.classList += "dashboard";
    
    menu.appendChild(playButton);
    menu.appendChild(replayButton);
    document.body.appendChild(menu);
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
        button_ctx.drawImage(button_img, 0, 0, buttoncanvas.width, buttoncanvas.height);
    };
    console.log(button_img)
    
    return button
}

let playButton = genButton("images/buttons/play.png")
playButton.addEventListener("click", _event => {
    isPaused = false;
    gameContinue();
});

function gameContinue() {
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
    if (!exploded) {
        let overlay = document.querySelector(".overlay")
        document.body.removeChild(overlay)
    }
    document.body.removeChild(menu)
    GameStart('Classic')
    gameRender()
}