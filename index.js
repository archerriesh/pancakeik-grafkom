import { graflib } from "./lib/libA.js";

const canvas_handler = document.querySelector("#mycanvas");
const ctx = canvas_handler.getContext("2d");
const ukuranKotak = 32;
const kotak = [
    { x: 0, y: 0 },
    { x: ukuranKotak, y: 0 },
    { x: ukuranKotak, y: ukuranKotak },
    { x: 0, y: ukuranKotak }
];

canvas_handler.width = window.innerWidth;
canvas_handler.height = window.innerHeight;

const image_data = ctx.createImageData(canvas_handler.width, canvas_handler.height);
const lib = new graflib(canvas_handler.width, image_data);
const jumlahKolom = Math.ceil(canvas_handler.width / ukuranKotak);
const jumlahBaris = Math.ceil(canvas_handler.height / ukuranKotak);
const warnaBatas = { r: 255, g: 249, b: 219 };

for (let baris = 0; baris < jumlahBaris; baris++) {
    for (let kolom = 0; kolom < jumlahKolom; kolom++) {
        const titik = lib.multiple_translate(kotak, {
            x: kolom * ukuranKotak,
            y: baris * ukuranKotak
        });
        lib.polygon(titik, warnaBatas);
    }
}

for (let baris = 0; baris < jumlahBaris; baris++) {
    for (let kolom = 0; kolom < jumlahKolom; kolom++) {
        const warna = (baris + kolom) % 2 === 0
            ? { r: 255, g: 245, b: 195 }
            : { r: 255, g: 253, b: 232 };

        lib.flood_fill(
            kolom * ukuranKotak + Math.floor(ukuranKotak / 2),
            baris * ukuranKotak + Math.floor(ukuranKotak / 2),
            warna
        );
    }
}

ctx.putImageData(image_data, 0, 0);