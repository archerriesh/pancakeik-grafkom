import library from "../lib/libA.js";

export default function drawSyrup(canvas_handler) {
    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);

    let lib = new library(canvas_handler.width, image_data);

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
    lib.boundary_fill(1250, 327, { r: 90, g: 35, b: 10 }, { r: 215, g: 95, b: 10 });

    ctx.putImageData(image_data, 0, 0);

    ctx.font = "bold 23px sans-serif";
    ctx.fillStyle = "#FF86A7";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("maple syrup", 1250, 430);
}