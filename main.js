let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let toggleButton = document.getElementById("toggleToolbar"); 

toggleButton.addEventListener("click", function() {
    let toolbar = document.querySelector(".toolbar");
    if (toolbar.style.display === "none" || toolbar.style.display === "") {
        toolbar.style.display = "flex";
    } else {
        toolbar.style.display = "none";
    }
});

let draw_color = "black";
let draw_width = "5";
let is_drawing = false;

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function start(e) {
    is_drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    e.preventDefault();
}   
function draw(e) {
    if (!is_drawing) return;
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.strokeStyle = draw_color;
    ctx.lineWidth = draw_width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    e.preventDefault();
}
function stop(e) {
    if(is_drawing) {
        ctx.stroke();
        ctx.closePath();
        is_drawing = false;
    }
    e.preventDefault();
}   