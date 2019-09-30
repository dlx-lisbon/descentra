const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const watch = require('node-watch');
const { execSync } = require('child_process');

const network = 'development';

// eslint-disable-next-line no-console
console.log('watching file changes...');
watch(path.join(process.cwd(), 'contracts'), { recursive: true }, (evt, name) => {
    // eslint-disable-next-line no-console
    console.log('%s changed.', name);
    const cwd = path.resolve(name, '../..');
    // push new code into local blockchain
    try {
        execSync(`zos push --network ${network} --no-interactive`, { cwd });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error('The "zos push" command failed with the error');
        // eslint-disable-next-line no-console
        console.log(e);
    }

    const extension = path.extname(name);
    const contractName = path.basename(name, extension);
    // upgrade proxy contract
    try {
        execSync(`zos upgrade ${contractName} --network ${network} --no-interactive`, { cwd });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log('The "zos upgrade" command failed with');
        // eslint-disable-next-line no-console
        console.log(e);
    }
});
