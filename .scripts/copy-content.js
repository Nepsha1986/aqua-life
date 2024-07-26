const fs = require('fs').promises;
const path = require('path');

const srcDir = path.resolve(__dirname, '../node_modules/handbook-freshwater-fish');
const destDir = path.resolve(__dirname, '../src/posts');

async function copy(src, dest) {
    const stat = await fs.stat(src);

    if (stat.isDirectory()) {
        await fs.mkdir(dest, { recursive: true });
        const entries = await fs.readdir(src);
        for (const entry of entries) {
            const srcPath = path.join(src, entry);
            const destPath = path.join(dest, entry);
            await copy(srcPath, destPath);
        }
    } else {
        await fs.copyFile(src, dest);
    }
}

// Start the copying process
copy(srcDir, destDir)
    .then(() => console.log(`Copied folder from ${srcDir} to ${destDir}`))
    .catch(err => console.error('Error during copy:', err));
