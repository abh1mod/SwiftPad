let toolbar = document.getElementById("toolbar");
let canvas = document.getElementById("myCanvas");
let zoomIn = document.getElementById("zoom-in");
let zoomOut = document.getElementById("zoom-out");
let resetZoom = document.getElementById("reset-zoom");

let ctx = canvas.getContext("2d");

let width = window.innerWidth - 8;  // 1280 
let height = window.innerHeight - 5; // 665
const dpr = window.devicePixelRatio || 1;

let width_orignal = width;
let height_original = height;
let is_drawing = false;

  zoomIn.onclick = () => {
    if (width >= width_orignal * 1.3) return;
    width *= 1.05;
    height *= 1.05;
    if (Math.abs(width - width_orignal) < width_orignal * 0.04) {
        width = width_orignal;
        height = height_original;
    }
        reSizeCanvas();
    };

    zoomOut.onclick = () => {
        if (width <= width_orignal * 0.8) return;
        width *= 0.95;
        height *= 0.95;
        if (Math.abs(width - width_orignal) < width_orignal * 0.04) {
            width = width_orignal;
            height = height_original;
        }

        reSizeCanvas();
    };

    resetZoom.onclick = ()=>{
        width = width_orignal;
        height = height_original;
        reSizeCanvas();
    }

let backgroundColor = '#1F1B24';
let brushColor = "white";
function reSizeCanvas(){
    canvas.style.width = width+"px";
    canvas.style.height = height+"px";
    canvas.width = width*dpr ;
    canvas.height = height*dpr ;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log(width, height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    //ctx.setTransform(a, b, c, d, e, f);
    //a = dpr, d = dpr: scales the X and Y axes by the device pixel ratio.
    //b = 0, c = 0: no skew.
    //e = 0, f = 0: no translation.
}

document.getElementById("toggleToolbar").onclick = ()=>{
    if(toolbar.style.display == "none"){
        toolbar.style.display = "flex";
    }
    else toolbar.style.display = "none";
}


//Applicable on touch devices
// When the user places a finger on the screen 
canvas.addEventListener("touchstart", start, false);
// When the user moves their finger on the screen
canvas.addEventListener("touchmove", draw, false);
// When the user lifts their finger off the screen 
canvas.addEventListener("touchend", stop, false);

// Applicable on mouse devices
// When the user presses the mouse button 
canvas.addEventListener("mousedown", start, false);
// When the user moves the mouse while pressing the button
canvas.addEventListener("mousemove", draw, false);
// When the user releases the mouse button 
canvas.addEventListener("mouseup", stop, false);
// When the mouse pointer leaves the canvas area 
canvas.addEventListener("mouseout", stop, false);


// Function to get the (x, y) coordinates of a touch or mouse event relative to the canvas
function getCoordinates(e) {
    // Get the canvas's position and size relative to the viewport
    // This is necessary to correctly calculate the coordinates
    // relative to the canvas, especially for touch events
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) { // If it's a touch event
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    } else { // If it's a mouse event
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
}

function start(e) {
    is_drawing = true;
    ctx.strokeStyle = brushColor;
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    // send_to_socket(x, y, true);
    e.preventDefault();
}

function draw(e) {
    if (!is_drawing) return;
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    // send_to_socket(x, y);
    e.preventDefault();
}

function stop(e) {
    if (is_drawing) {
        ctx.stroke();
        ctx.closePath();
        is_drawing = false;
    }
    e.preventDefault();
}


reSizeCanvas();   // whenever page reloads scale is set to original