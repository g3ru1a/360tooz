import Canvas from 'canvas';
import GIFEncoder from 'gifencoder';
import sizeOf from 'image-size';
import fs from 'fs';

export default async (path: string, images: Buffer[], delay: number = 50, quality: number = 10) => {
    let size = sizeOf(images[0]);
    if(size === undefined) return console.error("Couldn't calculate buffer size.");
    
    let encoder = new GIFEncoder(size.width!, size.height!);

    encoder.createReadStream().pipe(fs.createWriteStream(path));

    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(delay);
    encoder.setQuality(quality);

    let canvas = Canvas.createCanvas(size.width!, size.height!);
    let ctx = canvas.getContext('2d');

    for(let i = 0; i < images.length; i++){
        let img = new Canvas.Image;
        img.src = images[i];
    
        ctx.drawImage(img,0, 0, size.width!, size.height!);
        encoder.addFrame(ctx);
    }

    encoder.finish();
}