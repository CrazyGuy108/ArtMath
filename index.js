window.onload = init;

/**
 * Canvas element.
 * @type {HTMLElement}
 */
let canvas;

/**
 * Canvas context.
 * @type {CanvasRenderingContext2D}
 */
let context;

/**
 * Does all initialization steps.
 */
function init()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
}

/**
 * Type of art to make.
 * @type {string}
 */
let artType = "none";

/**
 * Updates the art type options.
 *
 * @param {HTMLElement} dropdown Dropdown menu for art type.
 */
function updateOptions(dropdown)
{
    const options = dropdown.nextElementSibling;
    artType = dropdown.value;

    // hide all options except the current art type's options
    for (optionGroup of options.children)
    {
        if (optionGroup.id == `${artType}Options`)
        {
            if (optionGroup.classList.contains("hidden"))
            {
                optionGroup.classList.remove("hidden");
            }
        }
        else if (!optionGroup.classList.contains("hidden"))
        {
            optionGroup.classList.add("hidden");
        }
    }
}

/**
 * Clears the canvas.
 */
function clearCanvas()
{
    // reset the transformation matrix
    context.setTransform(1, 0, 0, 1, 0, 0);

    // clear everything
    context.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draws the selected art type on the canvas.
 */
function drawArt()
{
    // make sure the canvas is blank first
    clearCanvas();

    switch (artType)
    {
        case "tree":
            drawTree();
            break;
        case "colorSierpinski":
            drawColorSierpinski();
            break;
        case "stretchedSierpinski":
            drawStretchedSierpinski();
            break;
        case "mondrian":
            drawMondrian();
            break;
    }
}

/**
 * @name Art types
 * @{
 */

/**
 * Draws a tree fractal on the canvas.
 */
function drawTree()
{
    // get options from the DOM
    const depth = parseFloat(document.getElementById("treeDepth").value);
    const angle1 = parseFloat(document.getElementById("treeAngle1").value);
    const angle2 = parseFloat(document.getElementById("treeAngle2").value);

    // setup linear color interpolation from brown to green
    const startColor = { r: 139, g: 69, b: 19 };
    const endColor = { r: 0, g: 255, b: 0 };
    const dr = (endColor.r - startColor.r) / depth;
    const dg = (endColor.g - startColor.g) / depth;
    const db = (endColor.b - startColor.b) / depth;

    /**
     * Tree recursive draw function.
     *
     * @param {number} depth Maximum level of recursion.
     * @param {number} startX X coordinate of branch.
     * @param {number} startY Y coordinate of branch.
     * @param {number} len Length of branch.
     * @param {number} angle Angle offset of branch.
     * @param {Color} color Color of branch.
     */
    function draw(depth, startX, startY, len, angle, color)
    {
        // save current context settings
        context.beginPath();
        context.save();

        // create a single branch
        context.translate(startX, startY);
        context.rotate(angle * Math.PI/180);
        context.moveTo(0, 0);
        context.lineTo(0, -len);
        context.strokeStyle = `rgb(${color.r|0},${color.g|0},${color.b|0})`;
        context.stroke();

        // exit condition: hit depth limit
        if (depth > 0)
        {
            // tree recursion
            color = { r: color.r + dr, g: color.g + dg, b: color.b + db };
            draw(depth - 1, 0, -len, len * 0.8, angle1, color);
            draw(depth - 1, 0, -len, len * 0.8, angle2, color);
        }

        // restore previous context settings
        context.restore();
    }

    draw(depth, canvas.width / 2, canvas.height, canvas.height / 5, 0, startColor);
}

/**
 * Draws a cool colored sierpinski fractal.
 */
function drawColorSierpinski()
{
    const zoomOut = parseFloat(document.getElementById(
            "colorSierpinskiZoomOut").value);
    const dim = parseInt(document.getElementById("colorSierpinskiDim").value,
        10);

    for (let i = 0; i < canvas.width * zoomOut; i += zoomOut)
    {
        for (let j = 0; j < canvas.height * zoomOut; j += zoomOut)
        {
            context.fillStyle = `rgb(${j^j-i^i}, ${(i - dim)^2 + (j - dim)^2}, ${i^i-j^j})`;
            context.fillRect(i / zoomOut, j / zoomOut, 1, 1);
        }
    }
}

/**
 * Draws a 3d stretched sierpinski fractal.
 */
function drawStretchedSierpinski()
{
    const zoomOut = parseFloat(document.getElementById(
            "stretchedSierpinskiZoomOut").value);

    for (let i = 0; i < canvas.width * zoomOut; i += zoomOut)
    {
        for (let j = 0; j < canvas.height * zoomOut; j += zoomOut)
        {
            context.fillStyle = `rgb(${i && j ? (i % j) & (j % i) : 0}, ` +
                    `${i && j ?(i % j) + (j % i) : 0}, ` +
                    `${i && j ? (i % j) | (j % i) : 0})`;
            context.fillRect(i / zoomOut, j / zoomOut, 1, 1);
        }
    }
}

/** @} */

//Initialize how many lines wanted in Mondrian
var lineCount;

//Initialize how many colored rectangles wanted in Mondrian
var rectangleCount;

//These var are to avoid replications with lines and rectangles
//This is for function avoidReplications(alreadyUsed)
var alreadyUsedHorizontal = [];
var alreadyUsedVertical = [];
var alreadyUsedRectanglesX = [];
var alreadyUsedRectanglesY = [];

//Var to store intersections values for rectangles vertexes
var rectangleVertexX;
var rectangleVertexY;

//Initialize colors
var YELLOW = "#FFFF00";
var BLUE = "#0000FF";
var RED = "#FF0000";
var BLACK = "#000000";

//Called in HTML and Draw Mondrian
function drawMondrian() {
    //Reset Variables
    alreadyUsedHorizontal = [];
    alreadyUsedVertical = [];
    alreadyUsedRectangles = [];
    rectangleVertexX = [0];
    rectangleVertexY = [0];
    lineCount = parseInt(document.getElementById("mondrianLines").value, 10);
    rectangleCount = parseInt(document.getElementById("mondrianRectangles").value, 10);
    //Get Canvas
    canvas = document.getElementById("canvas");
    //Reset Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    //Draw Lines
    drawLines();
    //Color Rectangles
    fillInRectangles();
}

//Draw Lines and Store Endpoints into a Var Array
function drawLines() {
    //Repeat (Var lineCount) amount of times
    for (i = 0; i < lineCount; i++) {
        //Initialize whether line will be horizontal or vertical
        var horizontalVertical = horizontalOrVerticalLine();
        //Initialize where the line will be on a horizontal or vertical value
        var positionOfLine = createLinePosition(horizontalVertical);
        //Initialize Line
        context.beginPath();
        //Called if line is horizontal
        if (horizontalVertical == "Horizontal") {
            //Draw Line
            context.moveTo(positionOfLine, 0);
            context.lineTo(positionOfLine, canvas.width);
            //Save Line Endpoints for Rectangle Vertexes
            rectangleVertexX.push(positionOfLine);
        }
        //Called if line is vertical
        if (horizontalVertical == "Vertical"){
            //Draw Line
            context.moveTo(0, positionOfLine);
            context.lineTo(canvas.width, positionOfLine);
            //Save Line Endpoints for Rectangle Vertexes
            rectangleVertexY.push(positionOfLine);
        }
        //End Line
        context.stroke();
    }
}

//This decides where each line is from 1 to (width of canvas - 1)
//It also calls function avoidReplications()
function createLinePosition(horizontalVertical) {
    var alreadyUsedValues;
    if (horizontalVertical == "Horizontal"){
        alreadyUsedValues = alreadyUsedHorizontal;
    }
    if (horizontalVertical == "Vertical") {
        alreadyUsedValues = alreadyUsedVertical;
    }
    var randomNum = avoidReplications(canvas.width - 1, alreadyUsedValues);
    if (horizontalVertical == "Horizontal"){
        alreadyUsedHorizontal.push(randomNum);
    }
    if (horizontalVertical == "Vertical") {
        alreadyUsedVertical.push(randomNum);
    }
    return randomNum;
}

//This fuction determines whether each line is horizontal or vertical in the mondrian by random
//Returns horizontal or vertical
function horizontalOrVerticalLine() {
    var randomNum = Math.floor(Math.random() * 2);
    if (randomNum == 0) {
        return "Horizontal";
    }
    if (randomNum == 1) {
        return "Vertical";
    }
}

//Fill in Rectangles
function fillInRectangles(){
    //Repeat (Var rectangleCount) amount of times
    for (i = 0; i < rectangleCount; i++) {
        //Initialize drawing
        var context = canvas.getContext("2d");
        //Initialize Vertex 1 Rectangle
        var vertexX1 = initializeVertex1X(rectangleVertexX);
        var vertexY1 = initializeVertex1Y(rectangleVertexY);
        //Initialize Vertex 2 Rectangle
        var vertexX2 = 300;
        for (i = 0; i < rectangleVertexX.length; i++){
            var vertexX = rectangleVertexX[i];
            if (vertexX > vertexX1 && vertexX < vertexX2){
                vertexX2 = vertexX;
            }
        }
        var vertexY2 = 300;
        for (i = 0; i < rectangleVertexY.length; i++){
            var vertexY = rectangleVertexY[i];
            if (vertexY > vertexY1 && vertexY < vertexY2){
                vertexY2 = vertexY;
            }
        }
        //Use Vertexes to figure out needed parameters to draw rectangle
        //Var pointX and point Y is the vertex closest to the left top corner
        //Var distanceX and distance Y is length of rectangle sides
        var pointX = vertexX1;
        var distanceX = vertexX2 - vertexX1;
        var pointY = vertexY1;
        var distanceY = vertexY2 - vertexY1;
        //Choose Random Color
        var randomNum = Math.floor(Math.random() * 4);
        switch(randomNum) {
        case 0:
            context.fillStyle = RED;
            break;
        case 1:
            context.fillStyle = BLUE;
            break;
        case 2:
            context.fillStyle = YELLOW;
            break;
        case 3:
            context.fillStyle = BLACK;
            break;
        }
        //Fill in Rectangle with given parameters
        context.fillRect(pointX, pointY, distanceX, distanceY);
        //End rectangle
        context.stroke();
    }
}

//Initialize Vertex 1 Rectangle
//It also calls function avoidReplications()
function initializeVertex1X(vertexArray) {
    var randomNum = avoidReplications(vertexArray.length, alreadyUsedRectanglesX);
    alreadyUsedRectanglesX.push(randomNum);
    return vertexArray[randomNum];
}
function initializeVertex1Y(vertexArray) {
    var randomNum = avoidReplications(vertexArray.length, alreadyUsedRectanglesY);
    alreadyUsedRectanglesY.push(randomNum);
    return vertexArray[randomNum];
}

//Avoid replications
function avoidReplications(randomNumRange, alreadyUsed) {
    //Creating a random number
    //Range of randomNum: 0 to (randomNumRange - 1 - alreadyUsed)
    //alreadyUsed is to eliminate all of the chances of getting a replicated number
    var randomNum = Math.floor(Math.random() * (randomNumRange - alreadyUsed.length));
    //Sees if one of the numbers that were pulled are already used
    //If a number is already used, it will bump the number up by however many numbers are used <= that number
    //When a number gets used and eliminated, it will bump the index down by one number for the numbers higher
    for (i = 1; i <= alreadyUsed.length; i++) {
        if (randomNum >= alreadyUsed[i]) {
            randomNum += i;
        }
    }
    return randomNum;
}
