import cheerio from 'cheerio';
import axios from 'axios';
import chalk from 'chalk';
import readline from 'readline';

async function getBuffer(url){
    let buffer = null;

    await axios.get(url, {responseType: 'arraybuffer'})
        .then(res => {
            buffer = res.data;
        }).catch(err => buffer = null);
    return buffer;
}

function getURLStart(url) {
    let args = url.split('/');
    let ind = args[args.length - 1].split('.')[0];
    return url.replace(ind, '01');
}

export default async (html, offset = 1) => {
    process.stdout.write(chalk.bold.yellow("Fetching Images ..."));

    let $ = cheerio.load(html);
    let url = $('.ProductGallery_thumbs_item').first().children().first().attr('href');

    if(url === undefined){
        console.log(chalk.black.bgRed.bold("Image URL Not found."));
        return undefined;
    }

    let startURL = getURLStart(url);
    
    let images = [];
    let index = 1;
    let buffer = await getBuffer(startURL);

    while(buffer != null){
        index += offset;
        let wInd = ((index < 10) ? "0"+index : index).toString();
        buffer = await getBuffer(startURL.replace("01", wInd));
        if(buffer !== null) images.push(buffer);

        readline.clearLine(process.stdout, -1);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(chalk.bold.yellow(`Fetching Image ${wInd} ...`));
    }

    readline.clearLine(process.stdout, -1);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(chalk.gray(`Fetched ${images.length} Images.`)+"\n");

    return images;
}