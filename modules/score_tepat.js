import library from "../lib/libA.js";

export default function score_tepat(canvas_handler) {
    let ctx = canvas_handler.getContext("2d");
    let image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
    let lib = new library(canvas_handler.width, image_data);

    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "#004C71";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Klik Butter untuk melelehkan mentega!", 1050, 560);

    let poinButter = 0;
    let poinAdonan = 0;
    let poinSyrup = 0;
    let poinMateng = 0;
    let langkah = 1;
    let kuncipoin = 0;

    // poin butter
    canvas_handler.addEventListener("click", (e) => {
        if (langkah == 1) {
            if (canvas_handler.butterDiklik) {
                langkah = 0;
                poinButter = 20; 

                kuncipoin = setInterval(() => {
                    image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
                    lib = new library(canvas_handler.width, image_data);
                    for (let y = 521; y < 600; y++) {
                        for (let x = 701; x < 1400; x++) {
                            lib.draw_dot(x, y, { r: 219, g: 240, b: 225 }); 
                        }
                    }
                    ctx.putImageData(image_data, 0, 0);

                    ctx.font = "bold 18px sans-serif";
                    ctx.fillStyle = "#004C71";
                    ctx.fillText("+ 20 poin ", 1050, 560);
                }, 500);

                setTimeout(() => {
                    clearInterval(kuncipoin);

                    image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
                    lib = new library(canvas_handler.width, image_data);
                    for (let y = 521; y < 600; y++) {
                        for (let x = 701; x < 1400; x++) {
                            lib.draw_dot(x, y, { r: 219, g: 240, b: 225 }); 
                        }
                    }
                    ctx.putImageData(image_data, 0, 0);

                    ctx.font = "bold 18px sans-serif";
                    ctx.fillStyle = "#004C71";
                    ctx.fillText("Klik dan tahan adonan untuk menuang adonan!", 1050, 560);

                    langkah = 2;
                }, 7500);
            }
        }
    });

    canvas_handler.addEventListener("mouseup", () => {
        clearInterval(kuncipoin);

        // poin adonan
        if(langkah==2){
            if(canvas_handler.radiusAdonan){
                langkah = 0;

                let statusAdonan = "";

                if(canvas_handler.radiusAdonan < 170){
                    poinAdonan = 20;
                    statusAdonan = "Yahh adonanmu kurang";
                }else if(canvas_handler.radiusAdonan <= 195){
                    poinAdonan = 40;
                    statusAdonan = "Keren! Adonan kamu pas!"
                }else if(canvas_handler.radiusAdonan > 195 && canvas_handler.radiusAdonan < 245){
                    poinAdonan = 10;
                    statusAdonan = "Adonan kamu terlalu banyak!"
                }else{
                    poinAdonan = 5;
                    statusAdonan = "Astaga adonannya luber!"
                }

                image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
                lib = new library(canvas_handler.width, image_data);
                for (let y = 521; y < 600; y++) {
                    for (let x = 701; x < 1400; x++) {
                        lib.draw_dot(x, y, { r: 219, g: 240, b: 225 }); 
                    }
                }
                ctx.putImageData(image_data, 0, 0);

                ctx.font = "bold 18px sans-serif";
                ctx.fillStyle = "#004C71";
                ctx.fillText(statusAdonan + " + " + poinAdonan + " poin", 1050, 560);

                setTimeout(() => {
                    image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
                    lib = new library(canvas_handler.width, image_data);
                    for (let y = 521; y < 600; y++) {
                        for (let x = 701; x < 1400; x++) {
                            lib.draw_dot(x, y, { r: 219, g: 240, b: 225 }); 
                        }
                    }
                    ctx.putImageData(image_data, 0, 0);

                    ctx.font = "bold 18px sans-serif";
                    ctx.fillStyle = "#004C71";
                    ctx.fillText("Putar cetekan kompor untuk menyalakan api!", 1050, 560);           
                    langkah = 3;
                }, 2000);
            }
        }
        // poin syrup
        if (langkah == 3) {
            if (canvas_handler.radiusSyrup) {
                let statusSyrup = "";
                if (canvas_handler.radiusSyrup < 110) {
                    poinSyrup = 20;
                    statusSyrup = "Syrup Terlalu Sedikit";
                } else if (canvas_handler.radiusSyrup <= 130) {
                    poinSyrup = 40;
                    statusSyrup = "Syrup Pas!";
                } else {
                    poinSyrup = 15;
                    statusSyrup = "Syrup Terlalu Banyak!";
                }
                // poin sisi 1
                let poinSisi1 = 0;
                if (canvas_handler.statusMatengSisi1 == "matang") {
                    poinSisi1 = 40;
                } else if (canvas_handler.statusMatengSisi1 == "mentah") {
                    poinSisi1 = -5;
                } else {
                    poinSisi1 = -30;
                }

                // poin pas udh dibalik
                let poinSisi2 = 0;
                if (canvas_handler.statusMatengSisi2 === "matang") {
                    poinSisi2 = 40;
                } else if (canvas_handler.statusMatengSisi2 === "mentah") {
                    poinSisi2 = -5;
                } else {
                    poinSisi2 = -30;
                }

                let poinMateng = poinSisi1 + poinSisi2;
                let total = poinButter + poinAdonan + poinMateng + poinSyrup;
                image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
                lib = new library(canvas_handler.width, image_data);
                for (let y = 521; y < 600; y++) {
                    for (let x = 701; x < 1400; x++) {
                        lib.draw_dot(x, y, { r: 219, g: 240, b: 225 }); 
                    }
                }
                ctx.putImageData(image_data, 0, 0);
                ctx.font = "bold 18px sans-serif";
                ctx.fillStyle = "#004C71";
                ctx.fillText(statusSyrup + " (+ " + poinSyrup + " poin)", 1050, 560);
                setTimeout(() => {
                    image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
                    lib = new library(canvas_handler.width, image_data);
                    for (let y = 521; y < 600; y++) {
                        for (let x = 701; x < 1400; x++) {
                            lib.draw_dot(x, y, { r: 219, g: 240, b: 225 }); 
                        }
                    }

                    ctx.putImageData(image_data, 0, 0);
                    ctx.font = "bold 18px sans-serif";
                    ctx.fillStyle = "#004C71";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("Skor kamu : " + total , 1050, 560);
                    langkah = 4;

                    setTimeout(() => {
                        image_data = ctx.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
                        lib = new library(canvas_handler.width, image_data);
                        for (let y = 521; y < 600; y++) {
                            for (let x = 701; x < 1400; x++) {
                                lib.draw_dot(x, y, { r: 219, g: 240, b: 225 }); 
                            }
                        }
                        ctx.putImageData(image_data, 0, 0);
                        ctx.font = "bold 18px sans-serif";
                        ctx.fillStyle = "#004C71";
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText("Permainan selesai! Klik RESTART untuk main lagi!", 1050, 560);
                        canvas_handler.permainanSelesai = true;
                    }, 2500);
                }, 2000);
            }
        }
    });
}
