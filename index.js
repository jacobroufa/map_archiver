'use strict';

/**
 * This script will compare and archive up-to-date versions of the maps from `maps.js`
 */

const fs = require('fs');
const path = require('path');

const request = require('request');

const maps = require('./maps.js');
const dataDir = path.join(process.cwd(), 'data');

try {
    console.log('ensuring our data directory exists');
    fs.statSync(dataDir);
} catch (err) {
    console.log('creating our data directory');
    fs.mkdirSync(dataDir);
}

maps.mapKeys.forEach((map) => {
    let url = 'https://data.illinois.gov/api/geospatial/' + maps.availableMaps[map] + '?method=export&format=GeoJSON';
    let filename = map + '.geojson';

    console.log('fetching data for our ' + map + ' map');
    let mapRequest = request.get(url);

    mapRequest.on('error', (err) => {
        console.log('uh oh, something bad happened with the ' + map + ' map...', err);
    });

    mapRequest.on('response', (res) => {
        if (res.statusCode === 200) {
            if (/* diff is ok */true) {
                let pathname = path.join(dataDir, filename)
                console.log('creating the GeoJSON file for our ' + map + ' map');
                mapRequest.pipe(fs.createWriteStream(pathname))
                console.log('GeoJSON file for our ' + map + ' map created at ' + pathname);
            } else {
                // TODO: create new version of map if diff shows changes
            }
        } else {
            console.log('got a different status code on the ' + map + ' map', res.statusCode);
        }
    });
});
