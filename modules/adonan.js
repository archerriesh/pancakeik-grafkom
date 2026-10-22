import library from "../lib/libA.js";

export default function drawAdonan(canvas_handler) {
    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
    let lib = new library(canvas_handler.width, image_data);

    let warna_biru  = { r: 207, g: 238, b: 245 }; 
    let gagang       = { r: 248, g: 187, b: 208 }; 
    let warna_kuning = { r: 255, g: 235, b: 59 };  

    // kepala
    for (let theta = 0; theta < 2 * Math.PI; theta += 0.001) {
        let x = Math.round(855 + 60 * Math.cos(theta));
        let y = Math.round(240 + 30 * Math.sin(theta));
        lib.draw_dot(x, y, warna_biru);
    }
    lib.polygon([{ x: 803, y: 224 },{ x: 768, y: 242 },{ x: 803, y: 256 }], warna_biru);

    // badan gelas + alas
    lib.dda_line(768, 242, 790, 266, warna_biru);
    lib.dda_line(790, 266, 790, 360, warna_biru);
    lib.dda_line(915, 240, 915, 360, warna_biru);

    for (let theta = 0; theta <= Math.PI; theta += 0.001) {
        let x = Math.round(853 + 63 * Math.cos(theta));
        let y = Math.round(360 + 20 * Math.sin(theta));
        lib.draw_dot(x, y, warna_biru);
    }

    // adonan
    let xc_adonan = 853;  
    let yc_adonan = 295;  
    let rx_adonan = 56;   
    let ry_adonan = 18;

    let x_kiri_adonan  = xc_adonan - rx_adonan; 
    let x_kanan_adonan = xc_adonan + rx_adonan; 

    lib.dda_line(x_kiri_adonan, yc_adonan, x_kiri_adonan, 355, warna_biru);
    lib.dda_line(x_kanan_adonan, yc_adonan, x_kanan_adonan, 355, warna_biru);

    // atas
    for (let theta = 0; theta < 2 * Math.PI; theta += 0.001) {
        let x = Math.round(xc_adonan + rx_adonan * Math.cos(theta));
        let y = Math.round(yc_adonan + ry_adonan * Math.sin(theta));
        lib.draw_dot(x, y, warna_biru);
    }

    // bawah
    for (let theta = 0; theta <= Math.PI; theta += 0.001) {
        let x = Math.round(xc_adonan + rx_adonan * Math.cos(theta));
        let y = Math.round(355 + ry_adonan * Math.sin(theta));
        lib.draw_dot(x, y, warna_biru);
    }

    // gagang
    for (let theta = -Math.PI / 2; theta <= Math.PI / 2; theta += 0.001) {
        let x = Math.round(915 + 28 * Math.cos(theta));
        let y = Math.round(300 + 45 * Math.sin(theta));
        lib.draw_dot(x, y, warna_biru);
    }

    for (let theta = -Math.PI / 2; theta <= Math.PI / 2; theta += 0.001) {
        let x = Math.round(915 + 18 * Math.cos(theta));
        let y = Math.round(300 + 35 * Math.sin(theta));
        lib.draw_dot(x, y, warna_biru);
    }

    // kepala gelas
    lib.boundary_fill(855, 240, warna_biru, warna_biru);
    lib.boundary_fill(785, 242, warna_biru, warna_biru);
    lib.boundary_fill(799, 242, warna_biru, warna_biru);

    // adonan
    lib.boundary_fill(xc_adonan, 330, warna_biru, warna_kuning);       // Badan
    lib.boundary_fill(xc_adonan, yc_adonan, warna_biru, warna_kuning);  // atas
    lib.boundary_fill(xc_adonan, 360, warna_biru, warna_kuning);       // bawah

    // badan gelas
    lib.boundary_fill(820, 272, warna_biru, warna_biru);               // atas
    lib.boundary_fill(793, 330, warna_biru, warna_biru);               // kiri
    lib.boundary_fill(912, 330, warna_biru, warna_biru);               // kanan

    // gagang
    lib.boundary_fill(935, 300, warna_biru, gagang);

    ctx.putImageData(image_data, 0, 0);
}