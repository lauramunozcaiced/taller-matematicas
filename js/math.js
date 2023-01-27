const ladoCuadrado = 5;
const perimetroCuadrado = ladoCuadrado * 4;
const areaCuadrado = ladoCuadrado * ladoCuadrado;
const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
const form3 = document.getElementById('form3');
const form4 = document.getElementById('form4');


form1.addEventListener('submit',function(e){
    e.preventDefault();
    const data = calcularCuadrado(form1.querySelector('input').value);
    form1.querySelector('p').innerText = `El perímetro del cuadrado es ${data.perimetro} y el área es ${data.area}`;
})

form2.addEventListener('submit', function(e){
    e.preventDefault();
    const inputs = form2.querySelectorAll('input'); 
    const data = calcularTriangulo(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);
    form2.querySelector('p').innerText = `El perímetro del triángulo es ${data.perimetro} y el área es ${data.area}`;
})

form3.addEventListener('submit', function(e){
    e.preventDefault();
    const inputs = form3.querySelectorAll('input');
    const altura = calcularAlturaTrianguloIsosceles(inputs[0].value,inputs[1].value);
    form3.querySelector('p').innerText = (altura!= false) ? `La altura del triángulo isósceles es ${altura}`: 'Los valores no son de un triángulo isóseles';
})

form4.addEventListener('submit',function(){
    e.preventDefault();
    const inputs= form4.querySelectorAll('input');
    const altura = calcularAlturaTrianguloEscaleno(inputs[0].value, inputs[1].value, inputs[2].value);
    form4.querySelector('p').innerText = (altura != false) ? `La altura del triángulo escaleno es ${altura}` : 'Los valores no son de un triángulo escaleno';

})

console.group('Cuadrado');
console.log({
    ladoCuadrado,
    perimetroCuadrado,
    areaCuadrado
});
console.groupEnd('Cuadrado');


const ladoTriangulo1 = 6;
const ladoTriangulo2 = 6;
const ladoTrianguloBase = 4;
const alturaTriangulo = 5.5;


const perimetroTriangulo = ladoTriangulo1 + ladoTriangulo2 + ladoTrianguloBase;
const areaTriangulo = (ladoTrianguloBase* alturaTriangulo) / 2;

console.group('Triangulo');
console.log({
    ladoTriangulo1 ,
    ladoTriangulo2 ,
    ladoTrianguloBase ,
    alturaTriangulo ,
    perimetroTriangulo,
    areaTriangulo
});
console.groupEnd('Triangulo');

console.group('Circle');
const radio = 3;
const diametro = radio * 2;
const pi = 3.1415;

const circunferencia = diametro * pi;
const areaCirculo = (radio ** 2) * pi;

console.log({
    radio,
    diametro,
    circunferencia,
    areaCirculo
});

console.groupEnd('Circle');



function calcularCuadrado(lado){
    return {
        perimetro: lado * 4,
        area: lado * lado
    }
}

function calcularTriangulo(lado1,lado2,base,altura){
    return {
        perimetro: lado1 + lado2 + base,
        area: (base * altura) / 2
    }
}

function calcularCirculo(radio){
    return{
        circunferencia: (radio * 2) * Math.PI,
        area: Math.pow(radio,2) * Math.PI
    }
}

function calcularAlturaTrianguloIsosceles(lado,base){
    if(lado == base){
       return false;
    }else{
        return Math.sqrt((lado**2)-((base**2)/4));   
    } 
}

function calcularAlturaTrianguloEscaleno(a,b,c){
    if(a != b && a != c && c != a){
        const lados = [a,b,c];
        var base = Math.max(...lados);
        lados.splice(lados.indexOf(base),1);
        console.log(base,lados[0],lados[1])
        return Number((Math.sqrt((lados[1]**2)-((((lados[1]**2)+(base**2)-(lados[0]**2))/ (2*base))**2))).toFixed(0));
    }else{
        return false;
    }
}