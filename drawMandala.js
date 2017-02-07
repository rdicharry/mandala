/**
 * Created by rebecca on 2/7/17.
 */

/**
 * todo:
 * - make user configurable: user can enter desired characters, number of repeats, placement
 *   |-> need to size the character image better to the input string so the rotation looks better and doesn't get truncated for longer strings
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

    let lambdaImage = makeAngledImage(lambda);
    //context.drawImage(lambdaImage, 100, 100);
    rotateImage(lambdaImage, 16, width/4.9, context, width, height);

    let code = "<\\>";
    let codeImage = makeAngledImage(code);
    //context.drawImage(codeImage, 100, 100);

    rotateImage(codeImage, 13, width/6, context, width, height);

    let brackets = "\{\}";
    let bracketImage = makeAngledImage(brackets);
    //context.drawImage(bracketImage, 100, 100);

    rotateImage(bracketImage, 8, width/8, context, width, height);


    let dot = ".";
    let dotImage = makeAngledImage(dot);
    rotateImage(dotImage, 6, width/9, context, width, height);

    let plus = "+=";
    let plusImage = makeAngledImage("+=");
    rotateImage(plusImage, 18, width/4, context, width, height);

    let intImage = makeAngledImage("\u222b");
    rotateImage(intImage, 20, width/3.4, context, width, height);

});

/**
 * Draw an image, rotated n times around the center of the drawing context
 * @param image an image to rotate around the center. Note that the image itself should contain a rotation of -PI/4 radians in order to be "upright" when rotated around the ceneter for proper display
 * @param n the number of repeats of the image around the center
 * @param radius the radius from the center at which the image should be placed
 * @param context the drawin context
 * @param w the width of the image (canvas) in pixels
 * @param h the height of the image (canvas) in pixels
 */
function rotateImage(image, n, radius, context, w, h){

    let angle = 2*Math.PI/n;
// set center of rotation to center of canvas
    let j = 0;
    for(j = 0; j < n; j++){
        context.save();
        context.translate(w/2, h/2);
        context.rotate(angle*j);
        context.drawImage(image, -radius, -radius);
        context.restore();
    }

}

/**
 * turn a string into an image object, also rotating it by -PI/4 radians around its center
 * @param string
 * @returns {*} an object representing the rotated image
 */
function makeAngledImage(string){
    let newCanvas = document.createElement('canvas');
    let size = 70;
    newCanvas.width = size;
    newCanvas.height = size;

    let context = newCanvas.getContext('2d');
    context.font = 'bold 28px Times';
    context.textBaseLine = 'middle';
    context.testAlign = 'center';
    context.translate(size/2, size/2);
    context.rotate(-Math.PI/4);
    context.strokeText(string, 0, 0);

    let image = new Image();
    image.src = newCanvas.toDataURL();

    return image;
}