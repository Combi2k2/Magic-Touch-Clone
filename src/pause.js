let isPaused = 0;
let tmp = null;

let pauseButton = document.querySelector("#pause");
pauseButton.addEventListener("click", pause);

function pause(_event)  {
    if (!isPaused) {
        let cur_time  = Date.now();
        tmp = cur_time - last_genRocket;
        isPaused = 1
        //console.log(animationId)
        window.cancelAnimationFrame(animationId);

    } else {
        let cur_time  = Date.now();
        last_genRocket = cur_time - tmp;
        isPaused = 0
        animationId = window.requestAnimationFrame(gameRender)
    }
}