const csv = require('csv-parser');
const fs = require('fs');

const results = [];
let val = 0;
let sum1 = 0;
let sum2 = 0;
let c1 = [];
let c2 = [];
let c3 = [];
let a = [];
let b = [];
let c1Min = 0;
let c2Min = 0;
let c3Min = 0;
let cMinArr = [];
let cMin = 0;
let c1Final = [];
let c2Final = [];
let c3Final = [];
let table = [
    [],
    [],
    []
];
let c = [];
let u = [];
let v = [];
let d = [
    [],
    [],
    []
];
let cNew = [];
u[0] = 0;
let c1New = [];
let c2New = [];
let c3New = [];


let matrica = [
    [],
    []
]


const summa = (arr, arr2) => {
    val = 0;
    for(let i=0; i < arr.length; i++) {
        for(let j=0; j < arr[i].length; j++) {
            let pere = parseInt(arr[i][j], 10);
            if(!(isNaN(pere))) {
                val += (pere * arr2[i][j]);
            }
        }
    }
}

const sortArrays = (arr) => {
    arr.sort((a, b) => {
        return a['index'] - b['index'];
    });
}

const createBetterArr = (arr) => {
    for(let i=0; i<3; i++) {
        for(let j=0; j<5; j++) {
            arr[i][j] = '';
        }
    }
}

const createTable = (arr, betterArr, line) => {
    arr.map((item) => {
        betterArr[line][item['index']] = item['value'];
    });
}

const terminatorSwitch = (lineNum, index, item) => {
    switch (lineNum) {
        case 1:
            pushValues(c1Final, index, item);
            break;
        case 2:
            pushValues(c2Final, index, item);
            break;
        case 3:
            pushValues(c3Final, index, item);
            break;
    }
}


const pushValues = (arr, index, value) => {
    arr.push({index: index, value: value});
}


const findMinIteration = () => {
    c1Min = findMin(c[0]);
    c2Min = findMin(c[1]);
    c3Min = findMin(c[2]);
    cMinArr = [...c1Min, ...c2Min, ...c3Min];
    cMin = findMin(cMinArr);
    if(typeof cMin !== 'undefined' && cMin.length > 0) {
        findNum(...cMin);
    }
}


const lineEdit = (lineNum) => {
    switch (lineNum) {
        case 1:
            c[0] = c[0].map((item) => {
                item = 'x';
                return item
            });
            return c[0];
        case 2:
            c[1] = c[1].map((item) => {
                item = 'x';
                return item
            });
            return c[1];
        case 3:
            c[2] = c[2].map((item) => {
                item = 'x';
                return item
            });
            return c[2];
    }
}

const rowEdit = (index) => {
    for (let i=0; i<3; i++) {
        c[i][index] = 'x';
    }
}

const findD = (arr) => {
    for (let i=0; i<arr.length;i++) {
        for (let j=0; j<arr[i].length;j++) {
            if(arr[i][j] > 0) {
                matrica[0][0] = arr[i].indexOf(arr[i][j]);
            }
        }
    }
}


const findNum = (num) => {
    if (c[0].indexOf(num) !== -1) {
        let item1 = [c[0].indexOf(num), 1];
        terminator(a, b, item1);
    } else if (c[1].indexOf(num) !== -1) {
        let item2 = [c[1].indexOf(num), 2];
        terminator(a, b, item2);
    } else {
        let item3 = [c[2].indexOf(num), 3];
        terminator(a, b, item3);
    }
}


const terminator = (a, b, item) => {
    let [index, lineNum] = item;
    if (a[lineNum - 1] > b[index]) {
        rowEdit(index);
        a[lineNum - 1] = (a[lineNum - 1] - b[index]);
        terminatorSwitch(lineNum, index, b[index]);
        b[index] = 0;
        findMinIteration();
    } else if (a[lineNum - 1] < b[index]) {
        lineEdit(lineNum);
        b[index] = (b[index] - a[lineNum - 1]);
        terminatorSwitch(lineNum, index, a[lineNum - 1]);
        a[lineNum - 1] = 0;
        findMinIteration();
    } else {
        lineEdit(lineNum);
        rowEdit(index);
        terminatorSwitch(lineNum, index, b[index]);
        b[index] = 0;
        a[lineNum - 1] = 0;
        findMinIteration();
    }
}

const final = (table) => {
    table[0][0] = table[0][0] - table[2][3];
    table[2][0] += table[2][3];
    table[0][3] += table[2][3];
    table[2][3] = 0;
}

const isNum = (arr) => {
    return arr.filter((item) => (!(isNaN(item))));
}

const findMin = (arr) => {
    let newArr = isNum(arr);
    if(typeof newArr !== 'undefined' && newArr.length > 0) {
        return newArr.reduce((a, b) => (b < a) ? b : a);
    } else {
        return [];
    }
}


const createA = () => {
    for (let i = 1; i < results.length; i++) {
        a.push(results[i]['0']);
    }
}


const createB = () => {
    b = Object.values(results[0]);
    b.shift();
}

const createC = (c, i) => {
    return Object.values(results[i]);
}


const clientReq = () => {
    for(let prop in results[0]) {
        sum1 += parseInt(results[0][prop], 10);
    }
    return sum1;
}


const supplierReq = () => {
    for (let i = 1; i < results.length; i++) {
        sum2 += parseInt(results[i]['0'],10);
    }
    return sum1;
}


async function log() {
    fs.createReadStream('file.csv')
        .pipe(csv(['']))
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
            clientReq();
            supplierReq();
            if(sum1 === sum2) {
                console.log('Zadacha zakritaja');
            }
            c1 = createC(c1, 1);
            c1.shift();
            c2 = createC(c2, 2);
            c2.shift();
            c3 = createC(c3, 3);
            c3.shift();
            c1New = c1.slice();
            c2New = c2.slice();
            c3New = c3.slice();
            cNew = [c1New, c2New, c3New];
            c = [c1, c2, c3];
            createA();
            createB();
            console.log(a);
            console.log(b);
            console.log(c);
            v[0] = cNew[0][0] - u[0];
            v[1] = cNew[0][1] - u[0];
            u[1] = cNew[1][1] - v[1];
            v[2] = cNew[1][2] - u[1];
            v[4] = cNew[0][4] - u[0];
            u[2] = cNew[2][4] - v[4];
            v[3] = cNew[2][3] - u[2];
            d[0][2] = v[2] + u[0] - c[0][2];
            d[0][3] = v[3] + u[0] - c[0][3];
            d[1][0] = v[0] + u[1] - c[1][0];
            d[1][3] = v[3] + u[1] - c[1][3];
            d[1][4] = v[4] + u[1] - c[1][4];
            d[2][0] = v[0] + u[2] - c[2][0];
            d[2][1] = v[1] + u[2] - c[2][1];
            d[2][2] = v[2] + u[2] - c[2][2];
            findD(d);
            findMinIteration();
            sortArrays(c1Final);
            sortArrays(c2Final);
            sortArrays(c3Final);
            createBetterArr(table);
            createTable(c1Final, table, 0);
            createTable(c2Final, table, 1);
            createTable(c3Final, table, 2);
            summa(table, cNew);
            console.log(val);
            console.log(table);
            console.log(u);
            console.log(v);
            console.log(d);
            console.log(matrica);
            final(table);
            console.log(table);
            summa(table, cNew);
            console.log(val);
        });
}

console.log(log());