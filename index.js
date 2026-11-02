import drawBackground from "./modules/background.js";
import drawAdonan from "./modules/adonan.js";
import drawButter from "./modules/butter.js";
import drawSyrup from "./modules/syrup.js";
import score_tepat from "./modules/score_tepat.js";
import timer from "./modules/timer.js";
import cetekan_kompor from "./modules/cetekan_kompor.js";
import drawRestart from "./modules/restart.js";

const canvas_handler = document.querySelector("#mycanvas");

drawBackground(canvas_handler);
cetekan_kompor(canvas_handler);
timer(canvas_handler);
drawAdonan(canvas_handler, function() {
    // Adonan selesai dituang
});
drawButter(canvas_handler);
drawSyrup(canvas_handler);
score_tepat(canvas_handler);
drawRestart(canvas_handler);
