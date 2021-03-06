//  load images of rockets
const missle_width  = game_canvas.width  * 0.1;
const missle_height = missle_width;

let rocket_images = [];
let rockets = null;

//  different game mode has different set of rocket
let rocket_set = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for(let i = 0 ; i < 10 ; ++i)   {
    var img = new Image();
    img.src = `images/rockets/${i}.png`;
    img.onload = function() {
        if (i == 9) console.log("GAME READY");
        else        console.log(`LOADED ${i + 1} rockets`);
    }
    rocket_images.push(img);
}

//  declare a class Rocket
class Rocket    {
    constructor(x = Math.floor(Math.random() * (game_canvas.width - 180)), y = 0)   {
        this.x = x;
        this.y = y;
        this.explosion_level = -1000;
    }
}
//  generate new Rocket
function genRocket()    {
    var R = new Rocket();
    let i = rocket_set[Math.floor(Math.random() * rocket_set.length)];

    rockets[i].push(R);
}
function render_missle(missle_position, id_missle) {
    let x = missle_position[0];
    let y = missle_position[1];

    game_ctx.drawImage(rocket_images[id_missle], x, y, missle_width, missle_height);
}
//  render all the rockets
function renderRockets()   {
    for(let i = 0 ; i < 10 ; ++i)
    for(let j = 0 ; j < rockets[i].length ; ++j)    {
        let R = rockets[i][j];
        if (R.explosion_level > 6) {
            rockets[i].splice(j--, 1);
        }
        if (R.explosion_level < -1 && R.y + missle_height > game_canvas.height)
            return  0;
        
        if (R.explosion_level < 0)  render_missle([R.x, R.y], i);
        else {
            if (R.explosion_level == 0) {
                score++;
                scoreElement = document.querySelector("#score");
                scoreElement.textContent = score;
            }
            render_explosion([R.x, R.y], R.explosion_level);
        }
    }
    return  1;
}

//  move the rocket forward and update the explosion stage of the missle
function moveRockets() {
    if (prediction != null) {
        for(let R of rockets[prediction])
            R.explosion_level = -1;
        
        prediction = null;
    }

    for(let i = 0 ; i < 10 ; ++i) {
        for(let j = 0 ; j < rockets[i].length ; ++j)    {
            rockets[i][j].y += 5;
            rockets[i][j].explosion_level++;
        }
    }
}