let isPaused = false;
let tmp = null;

let pauseButton = document.querySelector("#pause");

pauseButton.addEventListener("click", _event => {
    if (isPaused)   isPaused = false;
    else            isPaused = true;

    gamePause();
});

function genButton(icon_src)    {
    let button = document.createElement("button");
    let buttoncanvas = document.createElement("canvas");

    button.appendChild(buttoncanvas);
    
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
        button_ctx.drawImage(button_img, -2, 5, 50, 50);
    };
    console.log(button_img)
    
    return button
}

let playButton = genButton("images/buttons/play.png")
let replayButton = genButton("images/buttons/replay.png")

function gamePause()    {
    let overlay = document.createElement("div")
    overlay.classList += "overlay"
    document.body.appendChild(overlay)
    // while (isPaused) {

    // }
    let menu = document.createElement("div");
    menu.classList += "dashboard";
    
    menu.appendChild(playButton);
    menu.appendChild(replayButton);
    document.body.appendChild(menu);
}