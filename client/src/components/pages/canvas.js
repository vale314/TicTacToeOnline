import React, { useEffect, Fragment } from 'react';


const Canvas = () => {

    useEffect(() => {

        var canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

            ctx.lineWidth = 9;

            //ala
            ctx.beginPath();
            ctx.moveTo(200, 348);
            ctx.lineTo(561, 442);
            ctx.lineTo(506, 633);
            ctx.lineTo(503, 634);
            ctx.closePath();
            ctx.stroke();

            //cuerpo
            ctx.beginPath();
            ctx.moveTo(506, 631);
            ctx.lineTo(535, 611);
            ctx.lineTo(693, 432);
            ctx.lineTo(659, 378);
            ctx.lineTo(593, 368);
            ctx.lineTo(491, 421);
            ctx.stroke();
            ctx.closePath();



            ctx.beginPath();
            ctx.moveTo(409, 400);
            ctx.lineTo(370, 282);
            ctx.lineTo(518, 409);
            ctx.stroke();
            ctx.closePath();


            //cuerpo Atras bajo
            ctx.beginPath();
            ctx.moveTo(358, 495);
            ctx.lineTo(218, 567);
            ctx.lineTo(354, 625);
            ctx.lineTo(451, 636);
            ctx.lineTo(504, 630);
            ctx.stroke();
            ctx.closePath();

            //pajaro Colita
            ctx.beginPath();
            ctx.moveTo(218, 567);
            ctx.lineTo(132, 532);
            ctx.moveTo(149, 538);
            ctx.lineTo(305, 521);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(693, 432);
            ctx.lineTo(737, 441);
            ctx.lineTo(673, 454);
            ctx.stroke();
            ctx.closePath();

            ctx.lineWidth = 6;

            //dentro Ala
            ctx.beginPath();
            ctx.moveTo(561, 442);
            ctx.lineTo(430, 469);
            ctx.lineTo(222, 367);
            ctx.moveTo(430, 469);
            ctx.lineTo(506, 628);
            ctx.stroke();
            ctx.closePath();

            //dento atras pajaro
            ctx.beginPath();
            ctx.moveTo(451, 636);
            ctx.lineTo(404, 539);
            ctx.moveTo(351, 625);
            ctx.lineTo(404, 539);
            ctx.moveTo(220, 567);
            ctx.lineTo(404, 539);
            ctx.stroke();
            ctx.closePath();

            //dentro Ala
            ctx.beginPath();
            ctx.moveTo(450, 415);
            ctx.lineTo(452, 389);
            ctx.lineTo(515, 407);
            ctx.moveTo(452, 389);
            ctx.lineTo(375, 296);
            ctx.stroke();
            ctx.closePath();


            //cuerpo dentro
            ctx.beginPath();
            ctx.moveTo(561, 442);
            ctx.lineTo(613, 428);
            ctx.lineTo(593, 368);
            ctx.moveTo(613, 428);
            ctx.lineTo(659, 378);
            ctx.moveTo(613, 428);
            ctx.lineTo(634, 456);
            ctx.lineTo(535, 610);
            ctx.moveTo(634, 456);
            ctx.lineTo(692, 431);
            ctx.stroke();
            ctx.closePath();

            //dentro de colita
            ctx.beginPath();
            ctx.moveTo(239, 558);
            ctx.lineTo(132, 532);

            ctx.moveTo(164, 538);
            ctx.lineTo(180, 540);

            ctx.stroke();
            ctx.closePath();

        }
    }, []);

    return (
        <Fragment style={{margin:'0px'}}>
            
            <canvas id="tutorial" width="844" height="932"></canvas>
            
            <img alt="" src="https://images-na.ssl-images-amazon.com/images/I/61fNgnLxTAL._SL1200_.jpg" />
        </Fragment>
    );
};

export default Canvas;
