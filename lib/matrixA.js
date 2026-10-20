export default class MatrixClass{
    constructor(){

    }
    
    multiply(matA, matB){
        let hasil = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];

        for (let i=0; i<3;i++){
            for (let j=0;j<3;j++){
                for (let k=0;k<3;k++){
                    hasil [i][k] += matA[i][j] * matB[j][k];
                }
            }
        }

        return hasil;
    }

    transform_point(point, matT){
        let xn = matT[0][0]*point.x + matT[0][1] *point.y + matT[0][2]*1;
        let yn = matT[1][0]*point.x + matT[1][1] *point.y + matT[1][2]*1;

        return {x: xn, y: yn};
    }

    transform_points(points, matT){
        let hasil = [];
        
        for (let i=0; i<points.length;i++){
            let titik_hasil = this.transform_point(points[i], matT);
            hasil.push(titik_hasil);
        }

        return hasil;
    }

    create_identity(){
        return [
            [1,0,0],
            [0,1,0],
            [0,0,1],
        ]
    }

    create_translation(tx,ty){
        return [
            [1,0,tx],
            [0,1,ty],
            [0,0,1],
        ]
    }

    create_scale(sx,sy){
        return [
            [sx,0,0],
            [0,sy,0],
            [0,0,1],
        ]
    }

    create_rotation(degree){
        return [
            [Math.cos(degree), -Math.sin(degree),0],
            [Math.sin(degree), Math.cos(degree),0],
            [0,0,1]
        ]
    }

    create_fixedp_rotation(xc,yc,degree){
        let m1 = this.create_translation(-xc,-yc);
        let m2 = this.create_rotation(degree);
        let m3 = this.create_translation(xc,yc);

        let hasil;
        hasil = this.multiply(m3,m2);
        hasil = this.multiply(hasil,m1);
        return hasil
    }

    create_fixedp_scale(xc,yc,sx,sy){
        let m1 = this.create_translation(-xc,-yc);
        let m2 = this.create_scale(sx,sy);
        let m3 = this.create_translation(xy,yc);

        let hasil;
        hasil = this.multiply(m3,m2);
        hasil = this.multiply(hasil,m1);
        return hasil
    }
}