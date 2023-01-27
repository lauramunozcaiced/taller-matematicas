const form1 = document.getElementById('form1');

form1.addEventListener('submit',function(e){
    e.preventDefault();
    const num = form1.querySelector('input').value;
    form1.querySelector('p').innerText = (PlatziMath.esPar(num)) ? `Es Correcto ${num} es un número par`: `Lo siento, ${num} no es un número par`;
})
