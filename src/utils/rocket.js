let rocket_image = [];

for(let i = 0 ; i < 10 ; ++i)   {
    var img = new Image();
    img.src = `images/rockets/rocket${i}.png`;
    img.onload = function() {
        rocket_image.push(img);
        console.log(`Rocket${i} Loaded`);
    }
}

class Rocket    {
    constructor(x = Math.floor(Math.random() * game_canvas.width) - 180, y = 0) {
        this.x = x;
        this.y = y;
        this.dead_level = -1000;
    }
    // display_rocket()    {
    //     const img_rocket = new Image();
    //     img_rocket.src = `../../images/rockets/rocket${this.number}.png`;
    //     img_rocket.onload = move_rocket;

    //     const self = this
    //     function move_rocket() {
            
    //         game_ctx.clearRect(self.x, self.y, 200, 200);
    //         self.y = self.y + speed_rocket;
    //         game_ctx.drawImage(img_rocket, self.x, self.y, 200, 200);
    //         if (self.y >= window.innerHeight) {
    //             display_mushroom_explosion((self.x, self.y), 0)
    //             return;
    //         }

    //         window.requestAnimationFrame(move_rocket);
    //     }
    //     this.y = self.y
    // }
}