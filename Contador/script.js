let total_homem = 0;
let total_mulher = 0;
function resultado()
{
    document.getElementById("resultado_homem").innerText = "Total: " + total_homem;
    document.getElementById("resultado_mulher").innerText = "Total: " + total_mulher;
    document.getElementById("soma_geral").innerText = "Total: " + (total_homem + total_mulher); 
}

function somarHomem()
{
    total_homem++;
    resultado();
} 
function somaMulher()
{
    total_mulher++;
    resultado();
}
function removeHomem()
{
    if (total_homem > 0)
    {
        total_homem--;
        resultado();
    }
}
function removeMulher()
{
    if (total_mulher > 0)
    {
        total_mulher--;
        resultado(); 
    }
}
function resetar()
{
    total_homem = 0;
    total_mulher = 0;
    resultado();
}