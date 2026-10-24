import library from "../lib/libA.js";
import matrix from "../lib/matrixA.js";

export default function drawAdonan(canvas_handler) {
    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
    let lib = new library(canvas_handler.width, image_data);
    let mat = new matrix(canvas_handler.width, image_data);

    // mangkok luar
    lib.polar_circle(850, 285, 76, { r: 60, g: 35, b: 15 }); 
    lib.flood_fill(850, 285, { r: 197, g: 160, b: 169 });     

    // mangkok dalem
    lib.polar_circle(850, 285 - 2, 71, { r: 75, g: 45, b: 20 });
    lib.flood_fill(850, 285 - 2, { r: 163, g: 122, b: 133 });

    // adonan
    lib.gelombangBunga(850, 285 + 5, 54, 6, 3,{ r: 155, g: 125, b: 70 });
    lib.flood_fill(850, 285 + 6, { r: 242, g: 228, b: 168 }); 

    ctx.putImageData(image_data, 0, 0);

    let xc = 350;
    let yc = 350;
    let radius_awal = 35;
    let radius_maksimal = 180 
    let adonan_x = 850;
    let adonan_y = 285;
    let adonan_r = 76;
    let timer = 0;

    canvas_handler.addEventListener("mousedown", function(e) {
        let rect = canvas_handler.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;

        let dx = mouseX - adonan_x;
        let dy = mouseY - adonan_y;

        if(dx*dx + dy*dy <= adonan_r*adonan_r){
            timer = setInterval(function() {
                if(radius_awal >= radius_maksimal){
                    clearInterval(timer);
                    return;
                }
                
                let tepi = {x: xc+radius_awal, y:yc};
                let skala = mat.create_fixedp_scale(xc,yc, 1.02, 1.02);
                let titik_baru = mat.transform_point(tepi, skala);
                radius_awal = Math.round(titik_baru.x - xc);

                lib.clearScreen(ctx, canvas_handler);
                drawBackground(canvas_handler);
                drawAdonan(canvas_handler);
                drawButter(canvas_handler);
                drawSyrup(canvas_handler);
                
                lib.image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);

                lib.polar_circle(xc,yc,radius_awal,{ r: 155, g: 125, b: 70 });
                lib.flood_fill(xc, yc, { r: 242, g: 228, b: 168 }); 
                ctx.putImageData(lib.image_data, 0, 0);
            },30)
        }
    });

    window.addEventListener("mouseup", function(e) {
        if (timer) {
            clearInterval(timer); 
        }
    });
}
