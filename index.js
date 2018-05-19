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

    switch (artOptions.type)
    {
        case "fractal":
            drawFractal();
            break;
    }
}

/**
 * @name Art types
 * @{
 */

/**
 * Draws the selected fractal type on the canvas.
 */
function drawFractal()
{
    switch (artOptions.fractalType)
    {
        case "tree":
            drawTree();
            break;
        case "colorSierpinski":
            drawColorSierpinski();
            break;
    }
}

/**
 * @}
 * @name Fractals
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
    var fractals =
    {
        oc:
        {
            r: (i, j) => j^j-i^i,
            g: (i, j) => (i-dim)^2+(j-dim)^2,
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

/** @} */
