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
    // TODO
}

/**
 * Draws a cool colored sierpinski fractal.
 */
function drawColorSierpinski()
{
    const dim = parseInt(document.getElementById("colorSierpinskiDim").value,
        10);
    for (let i = 0; i < canvas.width; i++)
    {
        for (let j = 0; j < canvas.height; j++)
        {
            context.fillStyle = `rgb(${j^j-i^i}, ${(i - dim)^2 + (j - dim)^2}, ${i^i-j^j})`;
            context.fillRect(i, j, 1, 1);
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
