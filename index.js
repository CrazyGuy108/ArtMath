//Initialize how many lines wanted in Mondrian
var lineCount = 15;

//Initialize how many colored rectangles wanted in Mondrian
var rectangleCount = 15;

//Initialize Canvas
var canvas;

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
    //Get Canvas
    canvas = document.getElementById("canvas");
    //Reset Canvas
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    //Draw Lines
    drawLines();
    //Color Rectangles
    fillInRectangles();
}

//Draw Lines and Store Endpoints into a Var Array
function drawLines() {
    //Repeat (Var lineCount) amount of times
    for (i = 0; i < lineCount; i++) {
        //Initialize Canvas Drawing
        var ctx = canvas.getContext("2d");
        //Initialize whether line will be horizontal or vertical
        var horizontalVertical = horizontalOrVerticalLine();
        //Initialize where the line will be on a horizontal or vertical value
        var positionOfLine = createLinePosition(horizontalVertical);
        //Initialize Line
        ctx.beginPath();
        //Called if line is horizontal
        if (horizontalVertical == "Horizontal") {
            //Draw Line
            ctx.moveTo(positionOfLine, 0);
            ctx.lineTo(positionOfLine, canvas.width);
            //Save Line Endpoints for Rectangle Vertexes
            rectangleVertexX.push(positionOfLine);
        }
        //Called if line is vertical
        if (horizontalVertical == "Vertical"){
            //Draw Line
            ctx.moveTo(0, positionOfLine);
            ctx.lineTo(canvas.width, positionOfLine);
            //Save Line Endpoints for Rectangle Vertexes
            rectangleVertexY.push(positionOfLine);
        }
        //End Line
        ctx.stroke();
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
        var ctx = canvas.getContext("2d");
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
            ctx.fillStyle = RED;
            break;
        case 1:
            ctx.fillStyle = BLUE;
            break;
        case 2:
            ctx.fillStyle = YELLOW;
            break;
        case 3:
            ctx.fillStyle = BLACK;
            break;
        }
        //Fill in Rectangle with given parameters
        ctx.fillRect(pointX, pointY, distanceX, distanceY);
        //End rectangle
        ctx.stroke();
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