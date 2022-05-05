//  load images of rockets
const missle_width  = game_canvas.width  * 0.07;
const missle_height = missle_width;

let rocket_images = [];
let rockets = null;

for(let i = 0 ; i < 10 ; ++i)   {
    var img = new Image();
    img.src = `images/rockets/rocket${i}.png`;
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
    let i = Math.floor(Math.random() * 10);

    rockets[i].push(R);
}
function render_missle(missle_position, id_missle) {
    let x = missle_position[0];
    let y = missle_position[1];

    game_ctx.drawImage(rocket_images[id_missle], x, y, missle_width, missle_height);
}
//  render all the rockets
function render_Rockets()   {
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
                console.log("score = ", score)
            }
            render_explosion([R.x, R.y], R.explosion_level);
        }
    }
    return  1;
}

//  move the rocket forward and update the explosion stage of the missle
function move_Rockets() {
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