import library from "../lib/libA.js";

export default function drawButter(canvas_handler) {
    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);

    let lib = new library(canvas_handler.width, image_data);

    let butter = [
        { x: 1005, y: 305 },
        { x: 1100, y: 305 },
        { x: 1100, y: 345 },
        { x: 1005, y: 345 }
    ]

    let butterAtas = [
        { x: 1015, y: 290 },
        { x: 1110, y: 290 },
        { x: 1100, y: 305 },
        { x: 1005, y: 305 }
    ];

    let butterSamping = [
        { x: 1100, y: 305 },
        { x: 1110, y: 290 },
        { x: 1110, y: 330 },
        { x: 1100, y: 345 }
    ];

    // mangkok luar
    // rgb(218, 207, 232) warna mangkok luar
    lib.polar_circle(1060, 317, 70, { r: 218, g: 207, b: 232 });
    lib.flood_fill(1060, 317, { r: 218, g: 207, b: 232 });

    // mangkok dalam
    // rgb(225, 210, 240) warna mangkok dalam
    lib.polar_circle(1060, 317, 45, { r: 255, g: 255, b: 255 });
    lib.flood_fill(1060, 317, { r: 225, g: 210, b: 240 });

    // butter
    // rgb(195, 155, 75) warna outline butter
    // rgb(245, 235, 200) warna dalam butter
    lib.polygon(butter, {r:195,g:155,b:75});
    lib.boundary_fill(1052, 325, {r:195,g:155,b:75}, {r:245,g:235,b:200});
    
    // butter atas
    lib.polygon(butterAtas, {r:195,g:155,b:75});
    lib.boundary_fill(1058, 297, {r:195,g:155,b:75}, {r:245,g:235,b:200});

    // butter samping
    lib.polygon(butterSamping, {r:195,g:155,b:75});
    lib.boundary_fill(1105, 315, {r:195,g:155,b:75}, {r:245,g:235,b:200});
    ctx.putImageData(image_data, 0, 0);

    ctx.font = "bold 15px sans-serif";
    ctx.fillStyle = "#0017C8";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("BUTTER", 1052, 327);
    
    ctx.font = "bold 23px sans-serif";
    ctx.fillStyle = "#FF86A7";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Butter", 1060, 420);

    let timerButter = 0;

    // fungsi click menyimpan butter ke teflon
    canvas_handler.addEventListener("click", (e)=> {  
        const rect = canvas_handler.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) * (canvas_handler.width / rect.width);
        const mouseY = (e.clientY - rect.top) * (canvas_handler.height / rect.height);

        const jarakX = mouseX - 1060;
        const jarakY = mouseY - 317;
        const jarak = Math.sqrt((jarakX * jarakX) + (jarakY * jarakY))
        
        if (jarak <= 70 ) {
            let lib = new library(canvas_handler.width, image_data);

            lib.polar_circle(350, 330, 45, {r:245,g:235,b:200});
            lib.boundary_fill(350, 330, {r:245,g:235,b:200}, {r:245,g:235,b:200});

            ctx.putImageData(image_data, 0, 0);

            timerButter = setInterval(draw, 500); 

            ctx.font = "bold 15px sans-serif";
            ctx.fillStyle = "#0017C8";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("BUTTER", 1052, 327);

            ctx.font = "bold 23px sans-serif";
            ctx.fillStyle = "#FF86A7";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Butter", 1060, 420);

        }
    });

    // fungsi draw buat butter meleleh
    let radius = 45;
    let warnaButter = {r:245,g:235,b:200};

    function draw(){
        let pRadius = radius;
        radius += 10;

        if (radius >= 179){
            radius = 179;
            warnaButter = {r:255, g:225,b:120};

            for (let i = 0; i<=179;i++){
                lib.polar_circle(350, 330, i, warnaButter);
            }
            clearInterval(timerButter);
        } else{
            for (let i=pRadius; i<radius;i++){
                lib.polar_circle(350, 330, i, warnaButter);
            }
        }

        ctx.putImageData(image_data, 0, 0);

        ctx.font = "bold 15px sans-serif";
        ctx.fillStyle = "#0017C8";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("BUTTER", 1052, 327);

        ctx.font = "bold 23px sans-serif";
        ctx.fillStyle = "#FF86A7";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Butter", 1060, 420);
    }

}