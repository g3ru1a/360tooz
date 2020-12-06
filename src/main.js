import HTMLFetcher from './utils/HTMLFetcher.js';
import ImagesFetcher from './utils/ImagesFetcher.js';
import GIFMerger from './utils/GIFMerger.js';

import chalk from 'chalk';
import path from 'path';

export async function spintooz(options) {

    console.log(chalk.gray('Ready.'));

    let data = options;

    let url = data.url;

    let html = await HTMLFetcher(url);
    if(html == null) return res.status(500).send("Couldn't fetch URL.");

    let images = await ImagesFetcher(html, data.offset);

    if(images.length === 0 || images === undefined){
        console.log(chalk.red("Couldn't fetch images."));
        
        res.status(500).send("Couldn't fetch images.");
        return;
    }

    let gifName = Date.now()+'.gif';
    let gifPath = path.join(data.output, gifName);

    GIFMerger(gifPath, images, data.delay, data.quality)
}