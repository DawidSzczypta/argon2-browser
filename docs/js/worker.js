'use strict';

var calcHashArg;

self.onmessage = function (e) {
    self.postMessage('calc:' + e.data.calc);
    calcHashArg = e.data.arg;
    switch (e.data.calc) {
        case 'wasm':
            calcWasm();
            break;
        case 'simd':
            calcSimd();
            break;
    }
};

function clearLog() {}

function log(msg) {
    self.postMessage({ msg: msg });
}

function loadScript(script, callback, errorCallback) {
    try {
        importScripts(script);
    } catch (e) {
        console.error('Error loading script', script, e);
        errorCallback(e);
        return;
    }
    callback();
}

function getArg() {
    return calcHashArg;
}

if (navigator.userAgent.indexOf('Edge') >= 0) {
    importScripts('text-encoder-lite.min.js');
}
importScripts('calc.js');
self.postMessage({ msg: 'Worker started' });
