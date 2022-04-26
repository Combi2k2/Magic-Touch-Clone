let speed_rocket = null;
let rocket_image = [];

for(let i = 0 ; i < 10 ; ++i)   {
    var img = new Image();
    img.src = `images/rockets/rocket${i}`;
    img.onload = function() {
        rocket_image.push(img);
    }
}
let rocket = class  {
    constructor(x = Math.floor(Math.random() * game_canvas.width), y = 0)   {
        this.x = x;
        this.y = y;
        this.dead_level = -1000;
    }
    //  methods
    display_rocket()    {
        var img = new Image();
        img.src = `../../images/rockets/rocket${this.number}.png`;
        img.onload = setInterval(move_rocket, 100);

        console.log(img);
        
        function move_rocket() {
            game_ctx.clearRect(this.x, this.y, 200, 200);   this.y += speed_rocket;
            game_ctx.drawImage(img, this.x, this.y, 200, 200);
            if (this.y >= window.innerHeight)
                return;
            setInterval(move_rocket, 100)
        }
    }
    explode()   {
        display_sprite_explosion((this.x, this,y))
    }
}