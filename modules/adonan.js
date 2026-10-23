import library from "../lib/libA.js";

export default function drawAdonan(canvas_handler) {
    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
    let lib = new library(canvas_handler.width, image_data);

    // mangkok luar
    lib.polar_circle(850, 300, 76, { r: 60, g: 35, b: 15 }); 
    lib.flood_fill(850, 300, { r: 197, g: 160, b: 169 });     

    // mangkok dalem
    lib.polar_circle(850, 300 - 2, 71, { r: 75, g: 45, b: 20 });
    lib.flood_fill(850, 300 - 2, { r: 163, g: 122, b: 133 });

    // adonan
    lib.gelombangBunga(850, 300 + 5, 54, 6, 3,{ r: 155, g: 125, b: 70 });
    lib.flood_fill(850, 300 + 6, { r: 242, g: 228, b: 168 }); 

    ctx.putImageData(image_data, 0, 0);
}
