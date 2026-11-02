import library from "../lib/libA.js";

export default function drawRestart(canvas_handler) {
    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
    let lib = new library(canvas_handler.width, image_data);

    let tombolRestart = [
        { x: 50, y: 15 },
        { x: 170, y: 15 },
        { x: 170, y: 48 },
        { x: 50, y: 48 }
    ];

    lib.polygon(tombolRestart, { r: 209, g: 10, b: 91 });

    lib.boundary_fill(110, 30, { r: 209, g: 10, b: 91 }, { r: 255, g: 134, b: 167 });

    ctx.putImageData(image_data, 0, 0);
    ctx.font = "bold 15px sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("↺ RESTART", 110, 31);

    canvas_handler.addEventListener("click", function (e) {
        let rect = canvas_handler.getBoundingClientRect();
        let mouseX = (e.clientX - rect.left) * (canvas_handler.width / rect.width);
        let mouseY = (e.clientY - rect.top) * (canvas_handler.height / rect.height);

        if (mouseX >= 50 && mouseX <= 170 && mouseY >= 15 && mouseY <= 48) {
            window.location.reload();
        }
    });
}
