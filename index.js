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

// siret service -> [siret tutelle 1, siret tutelle 2, ...]

const service = services.find(s => s.siren === siren);
if (!service) {
    console.error(`Service with SIREN ${siren} not found.`);
    process.exit(1);
}

const pathFromRoot = hierarchy(services, service);
var line = service.siren + " ; " + service.nom + " ; ";
for (var i = 2; i < 4; i++) {
    const parent = pathFromRoot[i];
    if (!parent) break;
    line += parent.nom + " ; ";
};
console.log(line);