
let swimmers = [
    { team: 'Brasil', meters: 0 },
    { team: 'Austrália', meters: 0 },
    { team: 'Estados Unidos', meters: 0 },
    { team: 'Africa do Sul', meters: 0 },
    { team: 'China', meters: 0 },
    { team: 'Canadá', meters: 0 },
    { team: 'Japão', meters: 0 },
    { team: 'Rússia', meters: 0 },
];

let swimmers_final = []

let medals = [
    { type: 'Ouro' },
    { type: 'Prata' },
    { type: 'Bronze' }
];

async function swimming() {
    let positions = 0, lock = true, count = 0;

    while (lock) {
        count++;

        console.log('::::::::: PARCIAIS :::::::::')

        for (const swimmer of swimmers) {
            swimmer['meters'] += Math.floor(Math.random() * 10) + 1;
        }

        swimmers.sort((a, b) => (a['meters'] < b['meters']) ? 1 : ((b['meters'] < a['meters']) ? -1 : 0))

        // Finalizados
        positions = 0;
        for (const swimmer of swimmers_final) {
            positions++;
            console.log(positions + 'º - ' + swimmer['team'] + ', ' + swimmer['meters'] + 'm' + ' - (FINALIZADO)');
        }

        // Em andamento
        let position_aux = 0;
        for (const swimmer of swimmers) {
            positions++;
            position_aux++;
            console.log(positions + 'º - ' + swimmer['team'] + ', ' + swimmer['meters'] + 'm');

            if (swimmer['meters'] >= 50) {
                swimmers_final.push({
                    team: swimmer['team'],
                    meters: swimmer['meters'],
                    seconds: count * 2.8 + (0, 2 - swimmer['meters'] / 100)
                });

                let indice_count = 0;
                let indice = 0;

                swimmers.map(obj => {
                    if (String(obj['team']) === String(swimmer['team'])) {
                        indice = indice_count;
                    }
                    indice_count++;
                });

                swimmers.splice(indice, 1);
            }

        }

        console.log('\nAguarde ...\n')
        
        await timeout(2500);

        if (swimmers.length <= 0) {
            lock = false;
        }
    }

    // Medalhas
    console.log('\n::::::::: RESULTADO FINAL :::::::::\n');

    positions = 0;
    for (const swimmer of swimmers_final) {

        positions++;

        let type = medals[positions - 1] !== undefined ? medals[positions - 1]['type'] : positions + 'º'

        console.log(type + ' - ' + swimmer['team'] + ' em ' + swimmer['seconds'] + 's');
    }

    console.log('\n\n')

}

async function timeout(milliseconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, milliseconds);
    });
}

console.log('\n::::::::: NATAÇÃO 50m NADO LIVRE :::::::::\n');
swimming();
