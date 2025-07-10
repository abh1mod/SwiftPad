let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let toggleButton = document.getElementById("toggleToolbar"); 

toggleButton.addEventListener("click", function() {
    let toolbar = document.querySelector(".toolbar");
    if (toolbar.style.display === "none" || toolbar.style.display === "") {
        toolbar.style.display = "block";
    } else {
        toolbar.style.display = "none";
    }
});

ctx.beginPath();
ctx.arc(400,400,200,0,Math.PI*2);
ctx.lineWidth = 5;
ctx.strokeStyle = "blue";
ctx.stroke();

class Circle {
    constructor(x, y, radius, fillColor) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.strokeColor = fillColor;
        this.fillColor = fillColor;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();
        ctx.fillStyle = this.fillColor;
        // ctx.fill();
    }
} 
let circle = new Circle(800, 800, 200, "blue", "lightblue");
circle.draw(ctx);