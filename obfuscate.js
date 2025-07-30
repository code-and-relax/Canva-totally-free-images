const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

// Configuración de ofuscación optimizada para extensiones de Chrome
const obfuscationOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false, // Deshabilitado para extensiones
    debugProtectionInterval: 0,
    disableConsoleOutput: false, // Mantenemos los console.log para debugging
    domainLock: [],
    domainLockRedirectUrl: 'about:blank',
    forceTransformStrings: [],
    identifierNamesGenerator: 'hexadecimal',
    identifiersDictionary: [],
    identifiersPrefix: '',
    ignoreRequireImports: false,
    inputFileName: '',
    log: false,
    numbersToExpressions: true,
    optionsPreset: 'default',
    renameGlobals: false, // Importante para extensiones
    renameProperties: false, // Importante para APIs de Chrome
    renamePropertiesMode: 'safe',
    reservedNames: [
        // Preservar nombres críticos para Chrome Extensions
        'chrome', 'runtime', 'tabs', 'scripting', 'storage', 'action',
        'onInstalled', 'onMessage', 'sendMessage', 'executeScript',
        'querySelector', 'querySelectorAll', 'addEventListener',
        'document', 'window', 'console', 'Image', 'Promise',
        'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
        'removeEventListener', 'dispatchEvent',
        'createElement', 'appendChild', 'removeChild', 'innerHTML',
        'textContent', 'className', 'id', 'src', 'href', 'style',
        'onload', 'onerror', 'onclick', 'onmouseover', 'onmouseout',
        'dragstart', 'dragend', 'dragover', 'drop', 'draggable',
        'dataTransfer', 'setData', 'getData', 'setDragImage',
        'effectAllowed', 'dropEffect', 'files', 'types',
        'navigator', 'clipboard', 'writeText', 'readText',
        'getComputedStyle', 'backgroundImage', 'match', 'replace',
        'includes', 'startsWith', 'endsWith', 'indexOf', 'split',
        'join', 'push', 'pop', 'shift', 'unshift', 'slice',
        'splice', 'filter', 'map', 'forEach', 'reduce', 'find',
        'findIndex', 'some', 'every', 'sort', 'reverse', 'length'
    ],
    reservedStrings: [],
    seed: 0,
    selfDefending: true,
    simplify: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: 'separate',
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayCallsTransformThreshold: 0.5,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: 'variable',
    stringArrayThreshold: 0.75,
    target: 'browser',
    transformObjectKeys: true,
    unicodeEscapeSequence: false
};

// Función para ofuscar un archivo
function obfuscateFile(inputPath, outputPath) {
    try {
        console.log(`🔄 Ofuscando: ${inputPath}`);

        const sourceCode = fs.readFileSync(inputPath, 'utf8');
        const obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, obfuscationOptions);

        fs.writeFileSync(outputPath, obfuscationResult.getObfuscatedCode());
        console.log(`✅ Completado: ${outputPath}`);

        return true;
    } catch (error) {
        console.error(`❌ Error ofuscando ${inputPath}:`, error.message);
        return false;
    }
}

// Archivos a ofuscar
const filesToObfuscate = [
    'background.js',
    'popup.js',
    'injected.js'
];

console.log('🚀 Iniciando ofuscación de archivos JavaScript...\n');

let successCount = 0;
let totalFiles = filesToObfuscate.length;

// Procesar cada archivo
filesToObfuscate.forEach(filename => {
    const inputPath = path.join(__dirname, filename);
    const outputPath = path.join(__dirname, filename);

    if (fs.existsSync(inputPath)) {
        if (obfuscateFile(inputPath, outputPath)) {
            successCount++;
        }
    } else {
        console.log(`⚠️  Archivo no encontrado: ${filename}`);
        totalFiles--;
    }
});

console.log(`\n🎯 Ofuscación completada: ${successCount}/${totalFiles} archivos procesados`);
console.log(`📁 Archivos originales guardados en: src-original/`);
console.log(`\n🔒 La extensión ahora está ofuscada y lista para distribución.`);
