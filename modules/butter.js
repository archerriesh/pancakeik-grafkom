import library from "../lib/libA.js";

export default function drawButter(canvas_handler){
    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);

    let lib = new library(canvas_handler.width, image_data);

    let butter = [
        {x:100, y:60},
        {x:650, y:60},
        {x:650, y:600},
        {x:50, y:600}
    ]

    lib.polygon(butter, { r: 254, g: 226, b: 145 });
    ctx.putImageData(image_data, 0, 0);
}