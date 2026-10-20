export default class graflib {
    // constructor
    constructor(canvas_width, image_data) {
        this.canvas_width = canvas_width;
        this.image_data = image_data;
    }
    
    //gambar titik
    draw_dot(x, y, color) {
        let index = 4*(x + (y * this.image_data.width));
        this.image_data.data[index] = color.r;
        this.image_data.data[index + 1] = color.g;
        this.image_data.data[index + 2] = color.b;
        this.image_data.data[index + 3] = 255;
    }
    
    //ambil warna pixel
    get_dot(x, y) {
        let index = 4*(x + (y * this.image_data.width));
        let r = this.image_data.data[index];
        let g = this.image_data.data[index + 1];
        let b = this.image_data.data[index + 2];
        return {
            r:r,
            g:g,
            b:b
        }
    }

    //garis
    dda_line(x1, y1, x2, y2, color) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        let steps = Math.max(Math.abs(dx), Math.abs(dy));
    
        if (steps === 0) {
            this.draw_dot(Math.round(x1), Math.round(y1), color);
            return;
        }
    
        let x_increment = dx / steps;
        let y_increment = dy / steps;
        let x = x1;
        let y = y1;
    
        for (let i = 0; i <= steps; i++) {
            this.draw_dot(Math.round(x), Math.round(y), color);
            x += x_increment;
            y += y_increment;
        }
    }
    
    // lingkaran
    polar_circle(xc, yc, radius, color) {
        for (let theta = 0; theta < 2 * Math.PI; theta += 0.001) { //2 * Math.PI = 360 derajat, theta += makin kecil angkanya makin padet titiknya
            let x = xc + radius * Math.cos(theta);
            let y = yc + radius * Math.sin(theta);
            this.draw_dot(Math.round(x), Math.round(y), color);
        }
        console.log("polar_circle done");
    }
    
    //garis
    polygon (array_titik, color) {
        for (let i = 0; i < array_titik.length; i++) {
            let titik_awal = array_titik[i];
            let titik_akhir = array_titik[(i + 1) % array_titik.length]; // kalau gak pake modulus, nanti pas i = array_titik.length-1, titik_akhir bakal undefined. Jadi pake modulus biar balik ke titik awal lagi
            this.dda_line(
                titik_awal.x,
                titik_awal.y,
                titik_akhir.x,
                titik_akhir.y,
                color
            );
        }
    }
    
    check_warna(warna1, warna2) {
        if (warna1.r == warna2.r && warna1.g == warna2.g && warna1.b == warna2.b) {
            return 0;
        } else {
            return 1;
        }
    }
    
    //ngisi warna
    boundary_fill(x, y, warna_stop, warna_yang_dimau) {
        const stack = [{ x, y }];

        while (stack.length > 0) {
            const current = stack.pop();
            if (
                current.x < 0 ||
                current.x >= this.image_data.width ||
                current.y < 0 ||
                current.y >= this.image_data.height
            ) {
                continue;
            }

            const warna_sekarang = this.get_dot(current.x, current.y);
            if (
                this.check_warna(warna_sekarang, warna_stop) === 0 ||
                this.check_warna(warna_sekarang, warna_yang_dimau) === 0
            ) {
                continue;
            }

            this.draw_dot(current.x, current.y, warna_yang_dimau);
            stack.push(
                { x: current.x + 1, y: current.y },
                { x: current.x - 1, y: current.y },
                { x: current.x, y: current.y + 1 },
                { x: current.x, y: current.y - 1 }
            );
        }
    }
    
    flood_fill(x, y, warna_yang_dimau) {
        const warna_awal = this.get_dot(x, y);
        if (this.check_warna(warna_awal, warna_yang_dimau) === 0) {
            return;
        }

        const stack = [{ x, y }];

        while (stack.length > 0) {
            const current = stack.pop();

            if (
                current.x < 0 ||
                current.x >= this.image_data.width ||
                current.y < 0 ||
                current.y >= this.image_data.height
            ) {
                continue;
            }

            const warna_sekarang = this.get_dot(current.x, current.y);
            if (this.check_warna(warna_sekarang, warna_awal) !== 0) {
                continue;
            }

            this.draw_dot(current.x, current.y, warna_yang_dimau);
            stack.push({ x: current.x + 1, y: current.y });
            stack.push({ x: current.x - 1, y: current.y });
            stack.push({ x: current.x, y: current.y + 1 });
            stack.push({ x: current.x, y: current.y - 1 });
        }
    }


    //translasi
    translate(point, translatation) { //geser satu titik
        return {
            x: point.x + translatation.x,
            y: point.y + translatation.y
        };
    }

    multiple_translate(points, translatation) {
        let results = [];
        for (let i = 0; i < points.length; i++) {
            results[i] = this.translate(points[i], translatation); 
        }
        return results;
    }

    //skala
    scale(point, scale_factor) {
        return {
            x: point.x * scale_factor.x,
            y: point.y * scale_factor.y
        };
    }

    multiple_scale(points, scale_factor) {
        let results = [];
        for (let i = 0; i < points.length; i++) {
            results[i] = this.scale(points[i], scale_factor);
        }
        return results;
    }

    //rotasi
    rotate(point, angle) {
        let radian = angle * (Math.PI / 180);
        return {
            x: point.x * Math.cos(radian) - point.y * Math.sin(radian),
            y: point.x * Math.sin(radian) + point.y * Math.cos(radian)
        };
    }

    multiple_rotate(points, angle) {
        let results = [];
        for (let i = 0; i < points.length; i++) {
            results[i] = this.rotate(points[i], angle);
        }
        return results;
    }

    clearScreen(context, canvas_handler){
        context.clearRect(0,0, canvas_handler.width, canvas_handler.height);

        this.image_data = context.getImageData(0,0,canvas_handler.width, canvas_handler.height)
    }
}