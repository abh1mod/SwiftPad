let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let backgroundColor = "#dedfec"; // Default background color
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);
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
let restore_array = [];
let index = -1;


function change_color(element) {
    draw_color = element.style.backgroundColor;
}

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
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    ctx.lineTo(x, y);
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
    if(e.type !== "mouseout") {
        restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        console.log(restore_array);
    }
    
}   

function clearCanvas() {
    ctx.fillStyle = backgroundColor; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    restore_array = [];
    index = -1;
}

function undo_last(){
    if(index <= 0) {
        clearCanvas();
        return;
    }
    index -= 1;
    ctx.putImageData(restore_array[index], 0, 0);
}