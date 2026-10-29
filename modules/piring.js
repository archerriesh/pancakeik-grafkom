import library from "../lib/libA.js";

export default function drawPiring(canvas_handler) {
    canvas_handler.isPiring = true;

    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
    let lib = new library(canvas_handler.width, image_data);

    // kita hempas kompor ciao bella murka
    if (canvas_handler.taplakKompor) {
        for (let y = 60; y <= 600; y++) {
            for (let x = 50; x <= 650; x++) {
                let index = 4 * (x + y * canvas_handler.width);
                image_data.data[index] = canvas_handler.taplakKompor[index];
                image_data.data[index + 1] = canvas_handler.taplakKompor[index + 1];
                image_data.data[index + 2] = canvas_handler.taplakKompor[index + 2];
                image_data.data[index + 3] = canvas_handler.taplakKompor[index + 3];
            }
        }
    }

    // anchor piring
    let xc = 350;
    let yc = 330;

    // gambar piring
    for (let r = 0; r <= 248; r++) {
        lib.polar_circle(xc, yc, r, { r: 255, g: 255, b: 255 });
    }

    lib.polar_circle(xc, yc, 250, { r: 200, g: 200, b: 200 });
    lib.polar_circle(xc, yc, 249, { r: 220, g: 220, b: 220 });
    lib.polar_circle(xc, yc, 248, { r: 255, g: 255, b: 255 });
    lib.flood_fill(xc, yc, { r: 255, g: 255, b: 255 });

    lib.polar_circle(xc, yc, 220, { r: 230, g: 230, b: 230 });
    lib.flood_fill(xc, yc, { r: 245, g: 245, b: 245 });

    lib.polar_circle(xc, yc, 180, { r: 230, g: 230, b: 230 });
    lib.flood_fill(xc, yc, { r: 255, g: 255, b: 255 });

    // gambar pankeik
    let rPancake = canvas_handler.radiusAdonan || 180;
    for (let i = 0; i <= rPancake; i++) {
        lib.polar_circle(xc, yc, i, { r: 242, g: 228, b: 168 });
    }
    lib.polar_circle(xc, yc, rPancake, { r: 215, g: 175, b: 120 });

    ctx.putImageData(image_data, 0, 0);

    // update instruksi bawah
    image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
    lib = new library(canvas_handler.width, image_data);
    for (let y = 521; y < 600; y++) {
        for (let x = 701; x < 1400; x++) {
            lib.draw_dot(x, y, { r: 219, g: 240, b: 225 }); 
        }
    }
    ctx.putImageData(image_data, 0, 0, 701, 521, 699, 79);

    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "#004C71";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Pancake matang! Tuangkan maple syrup!", 1050, 560);
}
