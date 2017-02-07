/**
 * Created by rebecca on 2/7/17.
 */

$('document').ready(function() {
    let canvas = document.getElementById('mandala-canvas');
    let context = canvas.getContext('2d');

    let width = canvas.getAttribute('width');
    console.log(width);
    let height = canvas.getAttribute('height');
    console.log(height);

    let gradient = context.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
    gradient.addColorStop(0, 'magenta');
    gradient.addColorStop(0.1, 'yellow');
    gradient.addColorStop(0.2, 'green');
    gradient.addColorStop(0.3, 'blue');
    gradient.addColorStop(0.4, 'purple');
    gradient.addColorStop(0.7, 'pink');


    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    context.font = 'bold 50px Times';
    context.textBaseLine = 'top';



    // put a lambda into an image so it can be manipulated
    let lambda = '\u03bb';
    //context.strokeText(lambda, 100, 100);
    let lambdaCanvas = document.createElement('canvas');

    lambdaCanvas.width = 50;
    lambdaCanvas.height = 50;


    let lambdaContext = lambdaCanvas.getContext('2d');
    lambdaContext.font = 'bold 35px Times';
    lambdaContext.textBaseLine = 'top';
    lambdaContext.translate(50/2, 50/2);
    lambdaContext.rotate(-Math.PI/4);
    lambdaContext.strokeText(lambda, 0, 0);
    let lambdaImage = new Image();
    lambdaImage.src = lambdaCanvas.toDataURL();

    context.drawImage(lambdaImage, 100, 100);

    // set center of rotation to center of canvas

    let N = 12;
    let angle = 2*Math.PI/N;
    let radiusOfRotation = width/8;

    for(j = 0; j < N; j++){

        context.save();

        context.translate(width/2, height/2);
        context.rotate(angle*(j));

        context.drawImage(lambdaImage, -radiusOfRotation, -radiusOfRotation);

        context.restore();
    }



});