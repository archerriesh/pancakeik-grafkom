import library from "../lib/libA.js"

export default function drawBackground(canvas_handler) {
    canvas_handler.width = window.innerWidth;
    canvas_handler.height = window.innerHeight;

    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);

    let lib = new library(canvas_handler.width, image_data);

    lib.flood_fill(100,100,{r:255, g:255, b:255});

    const ukuranKotak = 32;
    const kotak = [
        { x: 0, y: 0 },
        { x: ukuranKotak, y: 0 },
        { x: ukuranKotak, y: ukuranKotak },
        { x: 0, y: ukuranKotak }
    ];

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

    //rgb(255, 134, 167) warna kompor
    // rgb(255, 251, 248) warna bg buat mapple syrup,dll
    //rgb(255, 201, 149) warna kotak sebelahnya lah itulah
    let titik_kompor = [
        {x:50, y:60},
        {x:650, y:60},
        {x:650, y:600},
        {x:50, y:600}
    ]

    let titik_kotak = [
        {x: 700, y:60},
        {x: 1400, y:60},
        {x: 1400, y:500},
        {x: 700, y:500}
    ]

    let titik_kotak2 = [
        {x: 750, y:200},
        {x: 1350, y:200},
        {x: 1350, y:450},
        {x: 750, y:450}
    ]

    let titik_kotak3 =  [
        {x: 700, y:520},
        {x: 1400, y:520},
        {x: 1400, y:600},
        {x: 700, y:600}
    ]

    let timer = [
        {x: 750, y:90},
        {x: 1350, y:90},
        {x: 1350, y:180},
        {x: 750, y:180}
    ]
    
    for (let y = 61; y < 600; y++) {
        for (let x = 51; x < 650; x++) {
            lib.draw_dot(x, y, {r:255, g:134, b:167});
        }
    }

    for (let y = 61; y < 500; y++) {
        for (let x = 701; x < 1400; x++) {
            lib.draw_dot(x, y, {r:255, g:223, b:176}); 
        }
    }

    for (let y = 521; y < 600; y++) {
        for (let x = 701; x < 1400; x++) {
            lib.draw_dot(x, y, {r:219, g:240, b:225}); 
        }
    }
    
    lib.polygon(titik_kompor, { r: 255, g: 134, b: 167 });
    lib.polygon(titik_kotak, { r: 255, g: 201, b: 149 });
    lib.polygon(titik_kotak2, { r: 255, g: 201, b: 149 });
    lib.flood_fill(1050,325, {r:255, g:251, b:248});
    lib.polygon(titik_kotak3, {r:176, g:222, b: 210});
    lib.polygon(timer, {r:250, g:190, b:182});
    lib.flood_fill(1050, 135, {r:254, g:229, b:225});
    
    lib.polar_circle(350, 330, 250, { r: 112, g: 128, b: 144 });
    lib.flood_fill(350, 330, { r: 112, g: 128, b: 144 });

    ctx.putImageData(image_data, 0, 0);
}
