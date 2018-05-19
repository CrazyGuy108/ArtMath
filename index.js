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

// options from dropdown menu
const artOptions = {};

/**
 * Updates the art type options.
 *
 * @param {HTMLElement} dropdown Dropdown menu for art type.
 */
function updateOptions(dropdown)
{
    const options = dropdown.nextElementSibling;
    const artType = dropdown.value;
    artOptions.type = artType;

    // hide all options except the current art type's options
    for (optionGroup of options.children)
    {
        if (optionGroup.id == `${artType}Options` ||
            optionGroup.id == `${artType}Type`)
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
 * Updates the fractal type options.
 *
 * @param {HTMLElement} dropdown Dropdown menu for fractal type.
 */
function updateFractalOptions(dropdown)
{
    const options = dropdown.nextElementSibling;
    const fractalType = dropdown.value;
    artOptions.fractalType = fractalType;

    // hide all options except the current fractal type's options
    for (let optionGroup of options.children)
    {
        if (optionGroup.id == `${fractalType}Options`)
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
    context.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draws the selected art type on the canvas.
 */
function drawArt()
{
    // make sure the canvas is blank first
    clearCanvas(canvas, context);

    switch (artOptions.type)
    {
        case "fractal":
            drawFractal(canvas, context);
            break;
    }
}

/**
 * Draws the selected fractal type on the canvas.
 */
function drawFractal()
{
    switch (artOptions.fractalType)
    {
        case "tree":
            drawTreeFractal(canvas, context);
            break;
    }
}

/**
 * Draws a tree fractal on the canvas.
 */
function drawTreeFractal()
{
    // get options from the DOM
    const depth = parseFloat(document.getElementById("treeDepth").value);
    const angle1 = parseFloat(document.getElementById("treeAngle1").value);
    const angle2 = parseFloat(document.getElementById("treeAngle2").value);
    // TODO
    drawTree(350,600,120,0);
}

function drawColorSierpinski()
{
    const DIM = 1024;
    var fractals =
    {
        oc:
        {
            r: (i, j) => j^j-i^i,
            g: (i, j) => (i-DIM)^2+(j-DIM)^2,
            b: (i, j) => i^i-j^j
        }
    };
    var f = fractals.oc;

    for (let i = 0; i < canvas.width; i++)
    {
        for (let j = 0; j < canvas.height; j++)
        {
            context.fillStyle = `rgb(${f.r(i, j)}, ${f.g(i, j)}, ${f.b(i, j)})`;
            context.fillRect(i, j, 1, 1);
        }
    }
}

function drawTree(startX, startY, len, angle)
{
    context.beginPath();
    context.save();

    context.translate(startX, startY);
    context.rotate(angle * Math.PI/180);
    context.moveTo(0, 0);
    context.lineTo(0, -len);
    context.stroke();

    if(len < 10) {
        context.restore();
        return;
    }

    draw(0, -len, len*0.8, -15);
    draw(0, -len, len*0.8, 15);

    context.restore();
}