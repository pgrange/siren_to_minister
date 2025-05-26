// const siren = "180092538";

const siren = process.argv[2];

const data = require('./dila_refOrga_admin_Etat_fr_20250526.json');
const services = data.service;


function hierarchy(services, service) {
    const id = service.id;
    const parent = services.find(s => 
        s.hierarchie.find(h => h.service === id)
    );
    if (parent) {
        const result = hierarchy(services, parent)
        result.push(service);
        return result;
    } else {
        return [service];
    }
}


const service = services.find(s => s.siren === siren);

const rootService = hierarchy(services, service);
console.log(rootService[2].nom);