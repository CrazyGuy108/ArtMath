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
 * Draws the selected art type on the canvas.
 */
function drawArt()
{
    clearCanvas();
    switch (artOptions.type)
    {
        case "fractal":
            drawFractal();
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
            drawTreeFractal();
            break;
    }
}

/**
 * Draws a tree fractal on the canvas.
 */
function drawTreeFractal(treeOptions)
{
    // get options from the DOM
    const depth = parseFloat(document.getElementById("treeDepth").value);
    const angle1 = parseFloat(document.getElementById("treeAngle1").value);
    const angle2 = parseFloat(document.getElementById("treeAngle2").value);
    // TODO
}
