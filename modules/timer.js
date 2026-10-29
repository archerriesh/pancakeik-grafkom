import library from "../lib/libA.js";
import matrix from "../lib/matrixA.js";
import drawPiring from "./piring.js";

export default function timer(canvas_handler) {
    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);

    let lib = new library(canvas_handler.width, image_data);
    let mat = new matrix(canvas_handler.width, image_data);

    let kotakTimer = [
        // atas
        {x:840,y:115},
        {x:1275,y:115},

        // kanan (+15 px)
        {x:1280,y:116},
        {x:1285,y:118},
        {x:1289,y:121},
        {x:1292,y:125},
        {x:1294,y:130},
        {x:1295,y:135},
        {x:1294,y:140},
        {x:1292,y:145},
        {x:1289,y:149},
        {x:1285,y:152},
        {x:1280,y:154},
        {x:1275,y:155},

        // bawah
        {x:840,y:155},

        // kiri
        {x:835,y:154},
        {x:830,y:152},
        {x:826,y:149},
        {x:823,y:145},
        {x:821,y:140},
        {x:820,y:135},
        {x:821,y:130},
        {x:823,y:125},
        {x:826,y:121},
        {x:830,y:118},
        {x:835,y:116}
    ];

    let kotakTimerDalam = [
        // atas
        {x:845,y:120},
        {x:1270,y:120},
        
        // kanan
        {x:1274,y:121},
        {x:1278,y:123},
        {x:1282,y:126},
        {x:1284,y:130},
        {x:1285,y:135},
        {x:1284,y:140},
        {x:1282,y:144},
        {x:1278,y:147},
        {x:1274,y:149},
        {x:1270,y:150},

        // bawah
        {x:845,y:150},

        // kiri
        {x:841,y:149},
        {x:837,y:147},
        {x:833,y:144},
        {x:831,y:140},
        {x:830,y:135},
        {x:831,y:130},
        {x:833,y:126},
        {x:837,y:123},
        {x:841,y:121}
    ];


    lib.polygon(kotakTimer, {r:255, g:134, b:167});
    lib.flood_fill(1057, 138, {r:255, g:134, b:167});

    lib.polygon(kotakTimerDalam, {r:255, g:213, b:79});
    lib.flood_fill(1050, 135, {r:255, g:213, b:79});

    ctx.putImageData(image_data, 0, 0);

    let kotakDalamKanan = 1270;
    let timerInterval = null;

    function drawTimer(){

        kotakDalamKanan -= 2;

        for (let y = 120; y <= 150; y++) {
            lib.dda_line(830, y, 1285, y, {r:255, g:134, b:167});
        }

        if (kotakDalamKanan > 845) {
            let batasWaktu = [
                // atas
                {x:845, y:120},
                {x:kotakDalamKanan, y:120},

                // kanan
                {x:kotakDalamKanan + 4, y:121},
                {x:kotakDalamKanan + 8, y:123},
                {x:kotakDalamKanan + 12, y:126},
                {x:kotakDalamKanan + 14, y:130},
                {x:kotakDalamKanan + 15, y:135},
                {x:kotakDalamKanan + 14, y:140},
                {x:kotakDalamKanan + 12, y:144},
                {x:kotakDalamKanan + 8, y:147},
                {x:kotakDalamKanan + 4, y:149},
                {x:kotakDalamKanan, y:150},

                // bawah
                {x:845, y:150},

                // kiri
                {x:841, y:149},
                {x:837, y:147},
                {x:833, y:144},
                {x:831, y:140},
                {x:830, y:135},
                {x:831, y:130},
                {x:833, y:126},
                {x:837, y:123},
                {x:841, y:121}
            ];

            if (kotakDalamKanan <= 1025) {
                lib.polygon(batasWaktu, {r:205, g:60, b:105});
                lib.flood_fill(845, 135, {r:205, g:60, b:105});
            } else {
                lib.polygon(batasWaktu, {r: 255, g: 213, b: 79});
                lib.flood_fill(845, 135, {r: 255, g: 213, b: 79});
            }
        } else {
            // Ketika timer habis / mati
            clearInterval(timerInterval);
            ctx.putImageData(image_data, 0, 0, 820, 115, 476, 41);
            drawPiring(canvas_handler);
            return;
        }

        for (let y = 110; y <= 160; y++) {
            lib.dda_line(1025, y, 1032, y, {r:205, g:60, b:105});
        }

        ctx.putImageData(image_data, 0, 0, 820, 115, 476, 41);
    }

    timerInterval = setInterval(drawTimer, 150);
}
