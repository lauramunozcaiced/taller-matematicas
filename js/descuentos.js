const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');

const listaDeCupones = [
    {codigo: 'todomuybarato' , porcentaje: 70  , isUsed: false },
    {codigo: 'todoamedioprecio' , porcentaje: 50  , isUsed: false },
    {codigo: 'pasabocasdescuento' , porcentaje: 20  , isUsed: false}
]

form1.addEventListener('submit', function(e){
    e.preventDefault();
    const inputs = form1.querySelectorAll('input');
    form1.querySelector('p').innerText = calcularDescuentoPrecio(inputs[0].value,inputs[1].value);
})

form2.addEventListener('submit', function(e){
    e.preventDefault();
    const inputs = form2.querySelectorAll('input');
    const cupon = verificarCupon(inputs[1].value);
    if(cupon){
        if(cupon.cuponEncontrado.isUsed == false) {
            form2.querySelector('p').innerText = calcularDescuentoPrecio(inputs[0].value, cupon.cuponEncontrado.porcentaje),
            listaDeCupones[cupon.cuponIndex].isUsed = true;
        }
        else{ 
            form2.querySelector('p').innerText = 'Este cupón ya fue usado';
        }
    }else{
        form2.querySelector('p').innerText = 'No se ha encontrado un cupon asociado a este código';
    }
})

function calcularDescuentoPrecio(precio,porcentaje){
    const descuento = (Number(precio) * Number(porcentaje)) / 100;
    return `El descuento es de $${descuento}, entonces el producto queda en $${precio - descuento}`;
}

function verificarCupon(codigo){
    const cuponIndex = listaDeCupones.findIndex(function(cupon){{ return cupon.codigo == codigo}});
    const cuponEncontrado = listaDeCupones.find(function(cupon){ return cupon.codigo == codigo});
    
    return (cuponEncontrado) ? {cuponEncontrado, cuponIndex} : false;
}