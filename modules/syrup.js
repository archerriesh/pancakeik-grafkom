import library from "../lib/libA.js";

export default function drawSyrup(canvas_handler) {
    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);

    let lib = new library(canvas_handler.width, image_data);

    let daunMaple = [
        // tutup kanan
        {x:1250, y:206},
        {x:1254, y:207},
        {x:1257, y:209},
        {x:1258, y:213},
        {x:1257, y:217},

        // leher botol
        {x:1256, y:224},
        {x:1256, y:234},
        {x:1257, y:242},

        // bahu kanan
        {x:1259, y:247},
        {x:1262, y:251},
        {x:1266, y:254},
        {x:1270, y:253},
        {x:1274, y:247},

        // kanan botol
        {x:1292, y:239},
        {x:1283, y:254},
        {x:1313, y:260},
        {x:1322, y:274},
        {x:1308, y:287},
        {x:1315, y:298},
        {x:1287, y:308},
        {x:1297, y:322},
        {x:1276, y:330},
        {x:1265, y:338},

        // kaki kanan
        {x:1276, y:344},
        {x:1277, y:354},
        {x:1268, y:359},
        {x:1250, y:360},

        // kaki kiri
        {x:1232, y:359},
        {x:1223, y:354},
        {x:1224, y:344},

        // kiri botol
        {x:1235, y:338},
        {x:1224, y:330},
        {x:1203, y:322},
        {x:1213, y:308},
        {x:1185, y:298},
        {x:1192, y:287},
        {x:1178, y:274},
        {x:1187, y:260},
        {x:1217, y:254},
        {x:1208, y:239},

        // bahu kiri
        {x:1226, y:247},
        {x:1230, y:253},
        {x:1234, y:254},
        {x:1238, y:251},
        {x:1241, y:247},

        // leher kiri
        {x:1243, y:242},
        {x:1244, y:234},
        {x:1244, y:224},

        // tutup kiri
        {x:1243, y:217},
        {x:1242, y:213},
        {x:1243, y:209},
        {x:1246, y:207}
    ];

    lib.polygon(daunMaple, { r: 90, g: 35, b: 10 });
    lib.boundary_fill(1250, 290, { r: 90, g: 35, b: 10 }, { r: 215, g: 95, b: 10 });

    // Simpan gambar pixel kembali ke canvas
    ctx.putImageData(image_data, 0, 0);
}