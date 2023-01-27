const form = document.querySelector('form');
const inputs = form.querySelectorAll('input');

inputs.forEach(function(elem){
    elem.addEventListener('keyup',function(){
        const temp = quitarComasA(elem.value, "");
        elem.value = Number(temp).toLocaleString();
    })
})



form.addEventListener('submit',function(e){
    e.preventDefault();
    const p = form.querySelector('p');
    const ingresos = quitarComasA(inputs[0].value,"");
    const gastos = quitarComasA(inputs[1].value,"");



    if(Number(gastos) >= Number(ingresos)){
        p.innerText = 'No te puedes endeudar si tus gastos son mayores o iguales a tus ingresos';
    }else{
        p.innerText = `Tu capacidad de endeudamiento es de $${calcularCapacidadEndeudamiento(ingresos,gastos).toLocaleString()}`;
    }
})

function quitarComasA(num,ele){
    return num.replace(/,/g, ele);
}

function calcularCapacidadEndeudamiento(ingresos,gastos){
    return Math.floor((Number(ingresos) - Number(gastos))* 0.35);
}