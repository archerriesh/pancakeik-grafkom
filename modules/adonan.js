import library from "../lib/libA.js";
import matrix from "../lib/matrixA.js";

export default function drawAdonan(canvas_handler, onSelesai) {
    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
    let lib = new library(canvas_handler.width, image_data);
    let mat = new matrix(canvas_handler.width, image_data);

    // mangkok luar
    lib.polar_circle(850, 320, 76, { r: 60, g: 35, b: 15 }); 
    lib.flood_fill(850, 320, { r: 197, g: 160, b: 169 });     

    // mangkok dalem
    lib.polar_circle(850, 320 - 2, 71, { r: 75, g: 45, b: 20 });
    lib.flood_fill(850, 320 - 2, { r: 163, g: 122, b: 133 });

    // adonan
    lib.gelombangBunga(850, 320 + 5, 54, 6, 3,{ r: 155, g: 125, b: 70 });
    lib.flood_fill(850, 320 + 6, { r: 242, g: 228, b: 168 }); 

    ctx.putImageData(image_data, 0, 0);

    let xc = 350;
    let yc = 330;
    let radius_awal = 35;
    let radius_maksimal = 245; 
    let adonan_x = 850;
    let adonan_y = 285;
    let adonan_r = 76;
    let timer = 0;

    // klik adonan
    canvas_handler.addEventListener("mousedown", function(e) {
        let rect = canvas_handler.getBoundingClientRect();
        let mouseX = (e.clientX - rect.left) * (canvas_handler.width / rect.width);
        let mouseY = (e.clientY - rect.top) * (canvas_handler.height / rect.height);

        let dx = mouseX - adonan_x;
        let dy = mouseY - adonan_y;

        if(dx*dx + dy*dy <= adonan_r*adonan_r){
            let canvas_awal = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);

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
                ctx.putImageData(canvas_awal, 0, 0);
                lib.image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);

                for (let i = 0; i <= radius_awal; i++) {
                    lib.polar_circle(xc, yc, i, { r: 242, g: 228, b: 168 });
                }
                lib.polar_circle(xc,yc,radius_awal,{ r: 242, g: 228, b: 168 });
                ctx.putImageData(lib.image_data, 0, 0);
            },30)
        }
    });

    // pas mouse dilepas
    window.addEventListener("mouseup", function(e) {
        if (timer) {
            clearInterval(timer); 
            window.radiusAdonan = radius_awal;
            onSelesai();
        }
    });

    
    // tulisan
    ctx.font = "bold 23px sans-serif";
    ctx.fillStyle = "#FF86A7";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Adonan", 855, 420);

    let adonanDibalik = false;
    let balikAdonan = false;

    function adonanMatang(){
        balikAdonan = true;
        adonanDibalik = true;
    
        for (let i = 0; i <= radius_awal; i++) {
            lib.polar_circle(xc, yc, i, { r: 198, g: 137, b: 88 }); 
        }
    
        ctx.putImageData(lib.image_data, 0, 0, 100, 100, 500, 500);
    
        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "#005a5b";
        ctx.textAlign = "center";
        ctx.fillText("Klik pancake untuk membalikkan adonan!", 1050, 560);
    
    }

    canvas_handler.addEventListener("click", function(e) {
        if (balikAdonan == true){
            if (adonanDibalik == true){
                let rect = canvas_handler.getBoundingClientRect();

                let mouseX = (e.clientX - rect.left) * (canvas_handler.width / rect.width);
                let mouseY = (e.clientY - rect.top) * (canvas_handler.height / rect.height);

                let dx = mouseX - xc;
                let dy = mouseY - yc;

                if (((dx * dx) + (dy * dy)) <= (radius_awal * radius_awal)) {
                    balikAdonan = false;
                    
                    lib.image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);

                    for (let i = 0; i <= radius_awal; i++) {
                        lib.polar_circle(xc, yc, i, { r: 242, g: 228, b: 168 });
                    }
                    ctx.putImageData(lib.image_data, 0, 0, 100, 100, 500, 500);
                }
            }
        }
    });

    return adonanMatang;
    
}
