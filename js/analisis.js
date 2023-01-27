
const form1 = document.querySelectorAll('form')[0];
const form2 = document.querySelectorAll('form')[1];
document.getElementById('medianaGeneral').innerHTML = `La mediana de salarios en el pueblo es de $${medianaGeneral()}`;  

form1.addEventListener('submit',function(e){
    e.preventDefault();
    const name = form1.querySelector('input').value;
    const persona = encontrarPersona(name);
    const div = form1.querySelector('div');

    if(persona){
        div.innerHTML = `<h4>Análisis Salarial de <span>${name}</span></h4>`;
        div.innerHTML += `<p>La mediana de sus salarios es <b>$${medianaPorPersona(name)}<b></p>`;
        div.innerHTML += `<p><span>${name}</span> debería estar ganando el próximo año aproximadamente <b>$${proyeccionPorPersona(name)}</b></p>`;


    }else{
        div.innerHTML = `<p>No existe el usuario llamado <span>${name}</span></p>`
    }
})

form2.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form2.querySelector('input').value;
    const annio = form2.querySelector('select').value;
    const empresa = encontrarEmpresa(name);
    const annioOp = (empresa)? encontrarAnnio(name,annio): false;
    const div = form2.querySelector('div');

    if(empresa && annioOp){
        div.innerHTML = `<h4>Análisis Salarial de <span>${name}</span></h4>`;
        div.innerHTML += `<p> La mediana de sus salarios para el año ${annio} es de <b>$${medianaEmpresaPorAnnio(name,annio)}<b></p>`;
       div.innerHTML += `<p> <span>${name}</span> debería estar pagando el próximo año aproximadamente <b>$${proyeccionPorEmpresa(name)}</b></p>`;
    }else if(empresa){
        div.innerHTML = `<h4>Análisis Salarial de <span>${name}</span></h4>`;
        div.innerHTML += `<p> - <span>${name}</span> debería estar pagando el próximo año aproximadamente <b>$${proyeccionPorEmpresa(name)}</b></p>`;
        div.innerHTML += `<p><b>OJO:</b> No existe el año <b>${annio}</b> para la empresa llamado <span>${name}</span></p>`;
    }else{
        div.innerHTML = `<p>No existe la empresa llamado <span>${name}</span></p>`;
    }
})

function capitalize(str){
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}


function encontrarPersona(persona){
    return salarios.find(function(elem){
        return elem.name.toLowerCase() == persona.toLowerCase();
    })
}

function medianaPorPersona(persona){
    let salarios = encontrarPersona(persona).trabajos.map(function(elemento){
        return elemento.salario;
    })
    return PlatziMath.calcularMediana(salarios);
}

function proyeccionPorPersona(persona){
    const trabajos = encontrarPersona(persona).trabajos;
    let porcentajesCrecimiento = [];

    for(let i = 1; i < trabajos.length; i++){
        const salarioActual = trabajos[i].salario;
        const salarioAnterior = trabajos[i-1].salario;
        const crecimiento = salarioActual - salarioAnterior;
        const porcentajeCrecimiento = crecimiento / salarioAnterior;
        porcentajesCrecimiento.push(porcentajeCrecimiento);
    }

    const ultimoSalario = trabajos[trabajos.length - 1].salario;
    const aumento = ultimoSalario * PlatziMath.calcularMediana(porcentajesCrecimiento);

    return Math.floor(ultimoSalario + aumento);
}


function encontrarEmpresa(empresa){ 
    return empresas.find(function(elem){
        return elem.name.toLowerCase() == empresa.toLowerCase();
    })
}

function encontrarAnnio(empresa,annio){
    return encontrarEmpresa(empresa).nomina.find(function(elem){
        return elem.annio == annio;
    })
    
}
function medianaEmpresaPorAnnio(empresa,annio){
    return PlatziMath.calcularMediana(encontrarAnnio(empresa,annio).salarios);
}

function proyeccionConMediana(medianas){
    let porcentajesCrecimiento = [];

    for(let i = 1; i < medianas.length; i++){
        const medianaActual = medianas[i];
        const medianaAnterior = medianas[i-1];
        const crecimiento = medianaActual - medianaAnterior;
        const porcentajeCrecimiento = crecimiento / medianaAnterior;
        porcentajesCrecimiento.push(porcentajeCrecimiento);
    }

    const ultimaMediana = medianas[medianas.length - 1];
    const aumento = ultimaMediana * PlatziMath.calcularMediana(porcentajesCrecimiento);

    return Math.floor(ultimaMediana + aumento);
}

function proyeccionPorEmpresa(empresa){
    let medianas = []
    encontrarEmpresa(empresa).nomina.forEach(element => {
        medianas.push(medianaEmpresaPorAnnio(empresa,element.annio));
    });
    
    return proyeccionConMediana(medianas);
}

function medianaGeneral(){
    const medianas= salarios.map(function(elem){
         return medianaPorPersona(elem.name);
    })
    return PlatziMath.calcularMediana(medianas);
}

function proyeccionGeneral(){
    const medianas= salarios.map(function(elem){
        return medianaPorPersona(elem.name);
   })

   return proyeccionConMediana(medianas);
}
