let toolbar = document.getElementById("toolbar");
let canvas = document.getElementById("myCanvas");
let zoomIn = document.getElementById("zoom-in");
let zoomOut = document.getElementById("zoom-out");
let resetZoom = document.getElementById("reset-zoom");

let ctx = canvas.getContext("2d");

let width = window.innerWidth - 8;  // 1280 
let height = window.innerHeight - 5; // 665

let width_orignal = width;
let height_original = height;

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

function reSizeCanvas(){
    canvas.style.width = width+"px";
    canvas.style.height = height+"px";
    canvas.width = width ;
    canvas.height = height ;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log(width, height);
}

document.getElementById("toggleToolbar").onclick = ()=>{
    if(toolbar.style.display == "none"){
        toolbar.style.display = "flex";
    }
    else toolbar.style.display = "none";
}



reSizeCanvas();   // whenever page reloads scale is set to original