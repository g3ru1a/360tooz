import cheerio from 'cheerio';
import axios from 'axios';

async function getBuffer(url: string): Promise<Buffer | null>{
    let buffer: Buffer | null = null;

    await axios.get(url, {responseType: 'arraybuffer'})
        .then(res => {
            buffer = res.data;
        }).catch(err => buffer = null);
    return buffer;
}

function getURLStart(url: string): string {
    let args: string[] = url.split('/');
    let ind: string = args[args.length - 1].split('.')[0];
    return url.replace(ind, '01');
}

export default async (html: string, offset: number = 1): Promise<void | Buffer[]> => {

    let $: cheerio.Root = cheerio.load(html);
    let url: string | undefined = $('.ProductGallery_thumbs_item').first().children().first().attr('href');

    if(url === undefined) return console.log("Image URL Not found.");

    let startURL: string = getURLStart(url!);
    let images: Buffer[] = [];
    let index = 1;
    let buffer: Buffer | null = await getBuffer(startURL);

    while(buffer != null){
        index += offset;
        let wInd: string = ((index < 10) ? "0"+index : index).toString();
        buffer = await getBuffer(startURL.replace("01", wInd));
        if(buffer !== null) images.push(buffer);
        console.clear();
        console.log(`Fetching image ${wInd} ...`);
    }

    return images;
}