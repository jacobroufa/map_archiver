# City of Rockford Map Data Archival Utility

This application is intended to read from the City of Rockford's data portal's mappable datasets. They should not need to be updated often, but the option should be available to do so once the initial map data has been stored. If a change comes across we should be able to detect it, archive the previous map to an older revision, and update the map to use the latest data.

## Mappable Datasets

* [Rockford Police Department Districts](https://data.illinois.gov/Municipality/Rockford-Police-Department-Districts/fwiz-44cq)
* [Wards](https://data.illinois.gov/Municipality/Wards/whmi-gmnb)

## Instructions

Run `npm install`. Map data comes in GeoJSON format and (after being compared to existing data) is archived in the `/data` directory of this repository. As these can be considered source files for the purpose of this endeavor and not generated files, they should be committed to the repository.

## Files

* maps.js exports an `mapKeys` array as well as an object containing the unique IDs of the available maps at `availableMaps`.
* index.js uses the maps.js file as a guide of the maps available to archive.
