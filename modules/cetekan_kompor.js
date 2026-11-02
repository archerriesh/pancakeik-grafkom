import library from "../lib/libA.js";
import matrix from "../lib/matrixA.js";

export default function cetekan_kompor(canvas_handler) {
    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
    let lib = new library(canvas_handler.width, image_data);
    let mat = new matrix();

    let xc = 580;
    let yc = 550;
    let radius = 15;
    let garis = [
        { x: 580, y: 540 },
        { x: 580, y: 560 }
    ];
    let isRotated = false;

    function gambarKnob(titikGaris) {
        image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
        lib = new library(canvas_handler.width, image_data);

        lib.polar_circle(xc, yc, radius, { r: 209, g: 10, b: 91 });
        lib.flood_fill(xc, yc, { r: 255, g: 102, b: 169 });

        lib.dda_line(
            Math.round(titikGaris[0].x),
            Math.round(titikGaris[0].y),
            Math.round(titikGaris[1].x),
            Math.round(titikGaris[1].y),
            { r: 209, g: 10, b: 91 }
        );

        ctx.putImageData(image_data, 0, 0);
    }

    canvas_handler.gambarKnob = function() {
        gambarKnob(garis);
    };

    function updateNotifikasi(teks) {
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
        ctx.fillText(teks, 1050, 560);
    }

    gambarKnob(garis);

    canvas_handler.addEventListener("click", function (e) {
        if (canvas_handler.isPiring) return;

        let rect = canvas_handler.getBoundingClientRect();
        let mouseX = (e.clientX - rect.left) * (canvas_handler.width / rect.width);
        let mouseY = (e.clientY - rect.top) * (canvas_handler.height / rect.height);

        let dx = mouseX - xc;
        let dy = mouseY - yc;

        if (dx * dx + dy * dy <= 20 * 20) {
            if (!isRotated) {
                if (!canvas_handler.radiusAdonan) {
                    return;
                }

                let sudut = 90 * (Math.PI / 180);
                let matRot = mat.create_fixedp_rotation(xc, yc, sudut);
                garis = mat.transform_points(garis, matRot);

                gambarKnob(garis);
                isRotated = true;
                canvas_handler.komporMenyala = true;

                if (canvas_handler.startTimer) {
                    canvas_handler.startTimer();
                }

                updateNotifikasi("Kompor menyala! Tunggu hingga pancake matang...");
            } else {
                if (!canvas_handler.sudahDibalik) {
                    return;
                }

                let sudut = -90 * (Math.PI / 180);
                let matRot = mat.create_fixedp_rotation(xc, yc, sudut);
                garis = mat.transform_points(garis, matRot);

                gambarKnob(garis);
                isRotated = false;
                canvas_handler.komporMenyala = false;
                canvas_handler.siapMatiinKompor = false;
                canvas_handler.bisaAngkatPancake = true;

                if (canvas_handler.stopTimer) {
                    canvas_handler.stopTimer();
                }
                updateNotifikasi("Ketuk untuk mengangkat adonan!");
            }
        }
    });
}
