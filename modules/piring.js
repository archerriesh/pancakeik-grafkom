import library from "../lib/libA.js";

export default function drawPiring(canvas_handler) {
    canvas_handler.isPiring = true;

    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
    let lib = new library(canvas_handler.width, image_data);

    // kita hempas kompor ciao bella murka dengan menggambar ulang taplak meja
    const ukuranKotak = 32;
    const warnaBatas = { r: 255, g: 249, b: 219 };
    const warnaBase = { r: 255, g: 253, b: 232 };
    const warnaStripe = { r: 255, g: 241, b: 182 };
    const warnaOverlap = { r: 255, g: 234, b: 150 };

    for (let y = 60; y <= 600; y++) {
        for (let x = 50; x <= 650; x++) {
            if (x % ukuranKotak === 0 || y % ukuranKotak === 0) {
                lib.draw_dot(x, y, warnaBatas);
            } else {
                let kolom = Math.floor(x / ukuranKotak);
                let baris = Math.floor(y / ukuranKotak);
                let isH = (baris % 2 === 1);
                let isV = (kolom % 2 === 1);

                if (isH && isV) {
                    lib.draw_dot(x, y, warnaOverlap);
                } else if (isH || isV) {
                    lib.draw_dot(x, y, warnaStripe);
                } else {
                    lib.draw_dot(x, y, warnaBase);
                }
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

    // warna peinkek
    let warnaPancake = { r: 198, g: 137, b: 88 }; // mateng
    let warnaBorder = { r: 165, g: 110, b: 65 };
    if (canvas_handler.statusMateng == "mentah") {
        warnaPancake = { r: 242, g: 228, b: 168 }; // mentah
        warnaBorder = { r: 215, g: 175, b: 120 };
    } else if (canvas_handler.statusMateng == "gosong") {
        warnaPancake = { r: 0, g: 0, b: 0 }; // gosong
        warnaBorder = { r: 0, g: 0, b: 0 };
    } else {
        warnaPancake = { r: 198, g: 137, b: 88 }; // mateng
        warnaBorder = { r: 165, g: 110, b: 65 };
    }

    // gambar pankeik
    let rPancake = canvas_handler.radiusAdonan || 180;
    for (let i = 0; i <= rPancake; i++) {
        lib.polar_circle(xc, yc, i, warnaPancake);
    }
    lib.polar_circle(xc, yc, rPancake, warnaBorder);

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

    let teksKematangan = "";
    if (canvas_handler.statusMateng == "matang") {
        teksKematangan = "Kematangan adonan kamu pas! +40";
    } else if (canvas_handler.statusMateng == "mentah") {
        teksKematangan = "Adonan belum Matang! -5";
    } else {
        teksKematangan = "Adonan kamu gosong! -30";
    }

    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "#004C71";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(teksKematangan, 1050, 545);

    setTimeout(() => {
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
        ctx.fillText("Tuangkan maple syrup!", 1050, 560);
    },2500);
};
