import drawBackground from "./modules/background.js";
import drawAdonan from "./modules/adonan.js";
import drawButter from "./modules/butter.js";
import drawSyrup from "./modules/syrup.js";
import score_tepat from "./modules/score_tepat.js";
import timer from "./modules/timer.js";

const canvas_handler = document.querySelector("#mycanvas");

drawBackground(canvas_handler);
drawAdonan(canvas_handler);
drawButter(canvas_handler);
drawSyrup(canvas_handler);
score_tepat(canvas_handler);
timer(canvas_handler);