const results = [];
results[0] = 0;
const results2 = [];
const c = [
    [ '150', 250, '', '', '100' ],
    [ '', 100, '200', '', '' ],
    [ '', '', '', '100', 0 ]
];


for (let i=0; i<3; i++) {
    for (let j=0; j<5; j++) {
        if(!(isNaN(c[i][j]))) {
            if(!(results[i])) {
                await equals(i, j);
            } else if(!(results2[j])) {
                await equals2(i, j);
            }
        }


    }
}

const equals = (i, j) => {
    return new Promise((resolve, reject) => {
        results[i] = c[i][j] - results2[j];
        resolve(results[i]);
    })
}

const equals2 = (i, j) => {
    return new Promise((resolve, reject) => {
        results2[j] = c[i][j] - results[i];
        resolve(results[j]);
    })
}
