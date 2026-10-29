import library from "../lib/libA.js";
import matrix from "../lib/matrixA.js";

export default function drawSyrup(canvas_handler) {
    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);

    let lib = new library(canvas_handler.width, image_data);
    let mat = new matrix(canvas_handler.width, image_data);

    let daunMaple = [
        // tutup kanan
        {x:1250, y:243},
        {x:1254, y:244},
        {x:1257, y:246},
        {x:1258, y:250},
        {x:1257, y:254},

        // leher botol
        {x:1256, y:261},
        {x:1256, y:271},
        {x:1257, y:279},

        // bahu kanan
        {x:1259, y:284},
        {x:1262, y:288},
        {x:1266, y:291},
        {x:1270, y:290},
        {x:1274, y:284},

        // kanan botol
        {x:1292, y:276},
        {x:1283, y:291},
        {x:1313, y:297},
        {x:1322, y:311},
        {x:1308, y:324},
        {x:1315, y:335},
        {x:1287, y:345},
        {x:1297, y:359},
        {x:1276, y:367},
        {x:1265, y:375},

        // kaki kanan
        {x:1276, y:381},
        {x:1277, y:391},
        {x:1268, y:396},
        {x:1250, y:397},

        // kaki kiri
        {x:1232, y:396},
        {x:1223, y:391},
        {x:1224, y:381},

        // kiri botol
        {x:1235, y:375},
        {x:1224, y:367},
        {x:1203, y:359},
        {x:1213, y:345},
        {x:1185, y:335},
        {x:1192, y:324},
        {x:1178, y:311},
        {x:1187, y:297},
        {x:1217, y:291},
        {x:1208, y:276},

        // bahu kiri
        {x:1226, y:284},
        {x:1230, y:290},
        {x:1234, y:291},
        {x:1238, y:288},
        {x:1241, y:284},

        // leher kiri
        {x:1243, y:279},
        {x:1244, y:271},
        {x:1244, y:261},

        // tutup kiri
        {x:1243, y:254},
        {x:1242, y:250},
        {x:1243, y:246},
        {x:1246, y:244}
    ];

    lib.polygon(daunMaple, { r: 90, g: 35, b: 10 });
    lib.flood_fill(1250, 327, { r: 215, g: 95, b: 10 });

    ctx.putImageData(image_data, 0, 0);

    ctx.font = "bold 23px sans-serif";
    ctx.fillStyle = "#FF86A7";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Maple syrup", 1250, 420);

    let xc = 350;
    let yc = 330;
    let radius_awal = 35;
    let radius_maksimal = 245; 
    let radius_batas = 120;
    let syrup_x = 1250;
    let syrup_y = 320;
    let syrup_r = 80;
    let timer = 0;
    let warna_batas = { r: 90, g: 35, b: 10 };
    let warna_maple = { r: 180, g: 75, b: 15 };
    let opacity_maple = 0.55;

    let adonan_x = 850;
    let adonan_y = 285;
    let adonan_r = 76;
    let adonanDitekan = false;
    let canvas_adonan = null;
    let lib_adonan = null;

    function blendColor(c1, c2, alpha) {
        return {
            r: Math.round(c1.r * (1 - alpha) + c2.r * alpha),
            g: Math.round(c1.g * (1 - alpha) + c2.g * alpha),
            b: Math.round(c1.b * (1 - alpha) + c2.b * alpha)
        };
    }

    // klik adonan / syrup
    canvas_handler.addEventListener("mousedown", function(e) {
        let rect = canvas_handler.getBoundingClientRect();
        let mouseX = (e.clientX - rect.left) * (canvas_handler.width / rect.width);
        let mouseY = (e.clientY - rect.top) * (canvas_handler.height / rect.height);

        let dx_adonan = mouseX - adonan_x;
        let dy_adonan = mouseY - adonan_y;
        if(dx_adonan*dx_adonan + dy_adonan*dy_adonan <= adonan_r*adonan_r){
            adonanDitekan = true;
        }

        let dx = mouseX - syrup_x;
        let dy = mouseY - syrup_y;

        if(canvas_adonan && (dx*dx + dy*dy <= syrup_r*syrup_r)){
            canvas_adonan = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
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
                ctx.putImageData(canvas_adonan, 0, 0);
                lib.image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);

                lib.gelombangBunga(xc, yc, radius_awal, 5, radius_awal * 0.18, warna_maple);
                lib.boundary_fill(xc, yc, warna_maple, warna_maple);

                let max_r = Math.ceil(radius_awal * 1.25);
                let min_x = Math.max(0, xc - max_r);
                let max_x = Math.min(canvas_handler.width - 1, xc + max_r);
                let min_y = Math.max(0, yc - max_r);
                let max_y = Math.min(canvas_handler.height - 1, yc + max_r);

                for (let y = min_y; y <= max_y; y++) {
                    for (let x = min_x; x <= max_x; x++) {
                        let warna_sekarang = lib.get_dot(x, y);
                        if (lib.check_warna(warna_sekarang, warna_maple) === 0) {
                            let warna_dasar = lib_adonan.get_dot(x, y);
                            let warna_campur = blendColor(warna_dasar, warna_maple, opacity_maple);
                            lib.draw_dot(x, y, warna_campur);
                        }
                    }
                }

                lib.gelombangBunga(xc, yc, radius_batas, 5, radius_batas * 0.18, warna_batas);
                ctx.putImageData(lib.image_data, 0, 0);
            }, 30);
        }
    });

    // pas mouse dilepas
    canvas_handler.addEventListener("mouseup", function(e) {
        if (timer) {
            clearInterval(timer); 
            canvas_handler.radiusSyrup = radius_awal;
        }

        // ini aku komenin dulu ya -orel
        // if (adonanDitekan) {
        //     adonanDitekan = false;
        //     canvas_adonan = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
        //     lib_adonan = new library(canvas_handler.width, canvas_adonan);

        //     lib.image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
        //     lib.gelombangBunga(xc, yc, radius_batas, 5, radius_batas * 0.18, warna_batas);
        //     ctx.putImageData(lib.image_data, 0, 0);
        // }
    });
}



