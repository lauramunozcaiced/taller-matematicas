const empresas = [];
const trabajos = []
let temp = salarios.map(function(elem){
    return elem.trabajos;
});
for(let i = 0; i < temp.length; i++){
    for(let j = 0; j < temp[i].length; j++){
        trabajos.push(temp[i][j]);
    }
}

for(trabajo of trabajos){
    let elem; 
    (empresas == []) ? elem = -1 : elem = empresas.findIndex(elem => elem.name == trabajo.empresa);
    if(elem!= -1){
        let an; 
        (empresas[elem].nomina == []) ? an = -1 : an = empresas[elem].nomina.findIndex(elem => elem.annio == trabajo.year);
        (an != -1) ? empresas[elem].nomina[an].salarios.push(trabajo.salario) : empresas[elem].nomina.push({annio: trabajo.year, salarios: [trabajo.salario]});
        
    }else{
        const newElem = {
            name: trabajo.empresa,
            nomina: [
                {annio: trabajo.year , salarios: [trabajo.salario]}
            ]
        }
        empresas.push(newElem);
    }
}

