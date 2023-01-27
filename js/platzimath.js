const PlatziMath = {};

PlatziMath.calcularPromedio = function calcularPromedio (array){
    let suma = 0;
    array.forEach(element => {
        suma += element;
    });
    
    return suma / array.length;
}

PlatziMath.calcularPromedioReduce = function calcularPromedioReduce(array){
    const suma = array.reduce(function(acumulado,nuevo){
        return acumulado + nuevo;
    }) 
    
    return suma / array.length;
}

PlatziMath.esPar = function esPar(num){
    return !(num % 2);
}

PlatziMath.calcularMediana = function calcularMediana(array){
    const listaEsPar = PlatziMath.esPar(array.length);
    array.sort(function(a,b){
        return a-b;
    });
    if(listaEsPar){
        let i = Math.floor(array.length /2);
        let mitades = [array[i--], array[i]]
        return PlatziMath.calcularPromedio(mitades);

    }else{
        let i= Math.floor(array.length / 2);
        return array[i];
    }
}

PlatziMath.ordenarLista = function ordenarLista(listaDesordenada){
    return listaDesordenada.sort(function(a,b){
        a[1] - b[1];
    });
 
}

PlatziMath.calcularModa = function calcularModa(lista){
    const listaCount = {};
    lista.forEach(function(elemento){
        (listaCount[elemento]) ? listaCount[elemento]++ : listaCount[elemento] = 1;
    })
    let array = Object.entries(listaCount);
    array.sort(function(a,b){
        a[1] - b[1];
    });
    return array[0];
}

PlatziMath.calcularPromedioPonderado = function calcularPromedioPonderado(notas){
    let creditosTotales = 0 , sumaParcial = 0;
    notas.forEach(function(elem){
        sumaParcial +=  elem.creditos * elem.nota;
        creditosTotales += elem.creditos;
    })
    return sumaParcial / creditosTotales;
}