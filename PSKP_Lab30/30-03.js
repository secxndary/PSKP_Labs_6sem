const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 5000;

let wasmCode = fs.readFileSync('public/p.wasm');
let wasmImports = {};
let wasmModule = new WebAssembly.Module(wasmCode);
let wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);


app.get('/', (req, res) => {
    res
        .type('html')
        .send(
            `sum(10, 3) = ${wasmInstance.exports.sum(10, 3)}<br/>` +
            `sub(10, 3) = ${wasmInstance.exports.sub(10, 3)}<br/>` +
            `mul(10, 3) = ${wasmInstance.exports.mul(10, 3)}<br/>`
        );
});


app.listen(PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));