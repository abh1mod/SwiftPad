const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let isDrawing = false;
let penWidth = 5;

const startDrawing = (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = penWidth;
    ctx.moveTo(e.offsetX, e.offsetY);
};

const drawing = (e) => {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
};

const stopDrawing = () => {
    isDrawing = false;
    ctx.closePath();
};

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);
