function config() {
    var ini = [
        {   // 1.
            name: 'default',
            img_width: 10013,
            img_height: 7957,
            img_depth: 75 * 6.0121,
            particle_size: 8000.0,
            // zThres: 1500.0,
            geneData: 'https://www.googleapis.com/storage/v1/b/dxn_temp/o/izzies_data/all_data/geneData.tsv',
            cellData: 'https://www.googleapis.com/storage/v1/b/dxn_temp/o/izzies_data/all_data/cellData.tsv',
        },
    ];
    return d3.map(ini, function (d) {return d.name;})
}

