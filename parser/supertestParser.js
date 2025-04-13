const fs = require('fs');
const path = require('path');

function getAllTestFiles(dirPath, suffix = '.test.js', allFiles = []) {
    const entries = fs.readdirSync(dirPath);

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            getAllTestFiles(fullPath, suffix, allFiles);
        } else if (fullPath.endsWith(suffix)) {
            allFiles.push(fullPath);
        }
    }

    return allFiles;
}


function extractSupertestCalls(content) {
    const regex = /request\s*\([^)]*\)\s*\.\s*(get|post|put|delete|patch)\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/gi;
    const matches = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
        matches.push({
            method: match[1].toUpperCase(),
            path: match[2],
        });
    }

    return matches;
}

function parseTests(testDir, suffix = '.test.js') {
    const testFiles = getAllTestFiles(testDir, suffix);
    const endpoints = [];

    for (const file of testFiles) {
        const content = fs.readFileSync(file, 'utf8');
        const calls = extractSupertestCalls(content);
        endpoints.push(...calls);
    }

    return endpoints;
}

module.exports = { parseTests };