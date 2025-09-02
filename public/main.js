let toolbar = document.getElementById("toolbar");
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let eraser = document.getElementById("eraser")

let width = window.innerWidth - 2;  // 1280 
let height = window.innerHeight - 2; // 665
const dpr = window.devicePixelRatio || 1;

let is_drawing = false;

let backgroundColor = '#1F1B24';
let brushColor = "white";
let brushSize = 5;

function changeBrushColor(color) {
    brushColor = color;
    sendDrawEvent('changeBrushColor', null, null, color);
}

function changeBrushSize(value){
    brushSize = value;
}

eraser.onclick = ()=>{
    brushColor ='#1F1B24';
}

const socket = io();

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
    //a = dpr, d = dpr: scales the X and Y axes by the device pixel ratio
    //b = 0, c = 0: no skew.
    //e = 0, f = 0: no translation.
}



function sendDrawEvent(action, x, y, color) {
    const payload = { action, lineWidth: 2.5, color};
    payload.xNorm = x/width;   // Coordinate normalized
    payload.yNorm = y/height;

    socket.emit('draw', payload);
}


socket.on('draw', (msg) => {
    const { action, xNorm, yNorm, lineWidth, color } = msg || {};
    const xCoordinate = xNorm*width;
    const yCoordinate = yNorm*height;

    if (action === 'start') {
        incomingLineWidth =  lineWidth || 2.5;
    }
    else if(action === 'changeBrushColor') {
        brushColor = msg.color;
    }
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (action === 'start') {
        ctx.beginPath();
        ctx.moveTo(xCoordinate, yCoordinate);
        incomingIsDrawing = true;
    } 
    else if (action === 'draw') {
        if (!incomingIsDrawing) {
            ctx.beginPath();
            ctx.moveTo(xCoordinate, yCoordinate);
            incomingIsDrawing = true;
        } 
        else {
            ctx.lineTo(xCoordinate, yCoordinate);
            ctx.stroke();
        }
    } 
    else if (action === 'stop') {
        if (incomingIsDrawing) {
            ctx.stroke();
            ctx.closePath();
            incomingIsDrawing = false;
        }
    }

});



const toggleBtn = document.getElementById('toggleToolbar');
toggleBtn.onclick = () => {
    toggleBtn.textContent = toggleBtn.textContent === '>' ? '<' : '>';
}

toggleBtn.addEventListener('click', () => {
    const isHidden = toolbar.style.transform === 'translateX(160px)';
    if (isHidden) {
        toolbar.style.transform = 'translateX(0)';
        toolbar.style.opacity = '1';
    } else {
        toolbar.style.transform = 'translateX(160px)';
        toolbar.style.opacity = '0.9';
    }
});


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
    sendDrawEvent('start', x, y);
    e.preventDefault();
}

function draw(e) {
    if (!is_drawing) return;
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    sendDrawEvent('draw', x, y);
    e.preventDefault();
}

function stop(e) {
    if (is_drawing) {
        ctx.stroke();
        ctx.closePath();
        is_drawing = false;
    }
    sendDrawEvent('stop');
    e.preventDefault();
}

reSizeCanvas();   // whenever page reloads scale is set to original