const DIM = 1024;
var fractals =
{
    oc: {
        r:(i, j) => j^j-i^i,
        g: (i,j) => (i-DIM)^2+(j-DIM)^2,
        b: (i,j) => i^i-j^j
    }
};

window.onload = function ()
{
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    document.getElementById("draw").addEventListener("click", function()
    {
        draw(500, 500);
    });

    var f = fractals.oc;

    function draw(width, height)
    {
        for (let i = 0; i < width; i++)
        {
            for (let j = 0; j < height; j++)
            {
                ctx.fillStyle = `rgb(${f.r(i, j)}, ${f.g(i, j)}, ${f.b(i, j)})`;
                ctx.fillRect(i, j, 1, 1);
            }
        }
    }
}