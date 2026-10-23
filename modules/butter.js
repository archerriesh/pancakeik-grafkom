import library from "../lib/libA.js";

export default function drawButter(canvas_handler){
    canvas_handler.width = window.innerWidth;
    canvas_handler.height = window.innerHeight;

    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);

    let lib = new library(canvas_handler.width, image_data);

    let butter = [
        {x:100, y:60},
        {x:650, y:60},
        {x:650, y:600},
        {x:50, y:600}
    ]

    let butterAtas = [
        { x: 1025, y: 255 },
        { x: 1120, y: 255 },
        { x: 1110, y: 270 },
        { x: 1015, y: 270 }
    ];

    let butterSamping = [
        { x: 1110, y: 270 },
        { x: 1120, y: 255 },
        { x: 1120, y: 295 },
        { x: 1110, y: 310 }
    ];

    // mangkok luar
    lib.polar_circle(1070, 280, 70, { r: 218, g: 207, b: 232 });
    lib.flood_fill(1070, 280, { r: 218, g: 207, b: 232 });

    // mangkok dalam
    lib.polar_circle(1070, 280, 45, { r: 255, g: 255, b: 255 });
    lib.flood_fill(1070, 280, { r: 225, g: 210, b: 240 });

    // butter
    lib.polygon(butter, {r:195,g:155,b:75});
    lib.boundary_fill(1062, 290, {r:195,g:155,b:75}, {r:245,g:235,b:200});
    
    // butter atas
    lib.polygon(butterAtas, {r:195,g:155,b:75});
    lib.boundary_fill(1068, 262, {r:195,g:155,b:75}, {r:245,g:235,b:200});

    // butter samping
    lib.polygon(butterSamping, {r:195,g:155,b:75});
    lib.boundary_fill(1115, 280, {r:195,g:155,b:75}, {r:245,g:235,b:200});
    ctx.putImageData(image_data, 0, 0);

    ctx.font = "bold 15px sans-serif";
    ctx.fillStyle = "#0017C8";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("BUTTER", 1062, 292);


    canvas_handler.addEventListener("click", (e)=> {
        
        const rect = canvas_handler.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) * (canvas_handler.width / rect.width);
        const mouseY = (e.clientY - rect.top) * (canvas_handler.height / rect.height);
        
        const jarakKeButter = Math.hypot(mouseX - 1070, mouseY - 280);
        
        if (jarakKeButter <= 70 ) {
            let lib = new library(canvas_handler.width, image_data);

            lib.polar_circle(350, 330, 45, {r:245,g:235,b:200});
            lib.boundary_fill(350, 330, {r:245,g:235,b:200}, {r:245,g:235,b:200});

            ctx.putImageData(image_data, 0, 0);

            ctx.font = "bold 15px sans-serif";
            ctx.fillStyle = "#0017C8";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("BUTTER", 1062, 292);
        }
    });
}