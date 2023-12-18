/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const SVGSpriter = require('svg-sprite');


const spriter = new SVGSpriter({
    dest: '../images/sprite',
    shape: {
        spacing: { // Spacing related options
            padding: 0, // Padding around all shapes
            box: 'content' // Padding strategy (similar to CSS `box-sizing`)
        },
        transform: ['svgo']
    },
    mode: {
        defs: {
            inline: true
        }
    },
    svg: { // General options for created SVG files
        xmlDeclaration: true, // Add XML declaration to SVG sprite
        doctypeDeclaration: false, // Add DOCTYPE declaration to SVG sprite
        dimensionAttributes: false // Width and height attributes on the sprite
    },
});
const cwd = path.resolve(__dirname, '../images/svg');
const svgFiles = fs.readdirSync(cwd);

for (file of svgFiles) {
    spriter.add(path.resolve(cwd, file), null, fs.readFileSync(path.resolve(cwd, file), 'utf-8'));
}

spriter.compile((error, result) => {
    for (const mode in result) {
        for (const resource in result[mode]) {
            fs.mkdirSync(cwd, { recursive: true });
            fs.writeFileSync(path.resolve(cwd, 'sprite.svg'), result[mode][resource].contents);
        }
    }
});