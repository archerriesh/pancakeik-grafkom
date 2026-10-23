import drawBackground from "./modules/background.js";
import drawAdonan from "./modules/adonan.js";
import drawButter from "./modules/butter.js";

const canvas_handler = document.querySelector("#mycanvas");

drawBackground(canvas_handler);
drawAdonan(canvas_handler);
drawButter(canvas_handler);
