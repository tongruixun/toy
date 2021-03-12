import React, {useEffect} from 'react';
import styles from './index.less'

function RainCanvas() {

    useEffect(()=> {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');


        let stgw = 1280;
        let stgh = 720;


        let loffset = 0;
        let toffset = 0;

        function _pexresize() {
            let cw = window.innerWidth*0.1;
            let ch = window.innerHeight*0.1;
            if (cw<=ch*stgw/stgh) {
                loffset = 0;
                toffset = Math.floor(ch-(cw*stgh/stgw))/2;
                canvas.style.width = cw + "px";
                canvas.style.height = Math.floor(cw*stgh/stgw) + "px";
            } else {
                loffset = Math.floor(cw-(ch*stgw/stgh))/2;
                toffset = 0;
                canvas.style.height = ch + "px";
                canvas.style.width = Math.floor(ch*stgw/stgh) + "px";
            }
            canvas.style.marginLeft = loffset +"px";
            canvas.style.marginTop = toffset +"px";
        }
        _pexresize();

        let count = 100;
        let lcount = 6;

        let layer = [];
        let layery = [];

        ctx.fillStyle = "rgba(255,255,255,0.5)";
        for (let l=0;l<lcount;l++) {
            ctx.clearRect(0,0,stgw,stgh);
            for (let i=0;i<count*(lcount-l)/1.5;i++) {
                let myx = Math.floor(Math.random()*stgw);
                let myy = Math.floor(Math.random()*stgh);
                let myh = l*6+8;
                let myw = myh/10;
                ctx.beginPath();
                ctx.moveTo(myx,myy);
                ctx.lineTo(myx+myw,myy+myh);
                ctx.arc(myx, myy+myh, myw, 0, Math.PI);
                ctx.lineTo(myx-myw,myy+myh);
                ctx.closePath();
                ctx.fill();
            }
            layer[l] = new Image();
            layer[l].src = canvas.toDataURL("image/png");
            layery[l] = 0;
        }



        let stt = 0;
        let str = Date.now()+Math.random()*4000;
        let stact = false;
        let ex = 1;

        function animate() {
            ctx.clearRect(0,0,stgw,stgh);

            for (let l=0;l<lcount;l++) {
                layery[l] += (l+1.5)*5;
                if (layery[l]>stgh) {

                    layery[l] =layery[l]-stgh;
                }
                ctx.drawImage(layer[l],0,layery[l]);
                ctx.drawImage(layer[l],0,layery[l]-stgh);
            }
            if (Date.now()>str) {
                stact = true;
            }
            if (stact) {
                stt++;
                if (stt<5+Math.random()*10) {
                    ex = stt/30;
                } else {
                    ex = (stt-10)/30;
                }
                if (stt>20) {
                    stt = 0;
                    stact = false;
                    str = Date.now()+Math.random()*8000+2000;
                    ex = 1;
                }

                ctx.fillStyle = "rgba(255,255,255,"+ex+")";
                ctx.fillRect(0,0,stgw,stgh);
            }
            window.requestAnimationFrame(animate);
        }

        animate();
    }, [])
    return <canvas className={styles.canvas} id='canvas' width='1280' height='720'>canvas</canvas>
}

export default RainCanvas;