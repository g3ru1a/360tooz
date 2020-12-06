import Canvas from 'canvas';
import GIFEncoder from 'gifencoder';
import sizeOf from 'image-size';
import fs from 'fs';
import chalk from 'chalk';
import readline from 'readline';

export default async (path: string, images: Buffer[], delay: number = 50, quality: number = 10) => {
    // process.stdout.write(chalk.bold.yellow('Computing GIF Size ...'));
    
    if(isNaN(delay)) delay = 50;
    if(isNaN(quality)) quality = 10;
    
    let size = sizeOf(images[0]);
    // if(size === undefined) return console.error("Couldn't calculate buffer size.");
    if(size === undefined) return;
    
    // readline.clearLine(process.stdout, -1);
    // readline.cursorTo(process.stdout, 0);
    // process.stdout.write(chalk.gray(`GIF Size ${size.width}x${size.height}.`) + "\n");

    // process.stdout.write(chalk.bold.yellow('Initializing Encoder ...'));
    
    let encoder = new GIFEncoder(size.width!, size.height!);

    encoder.createReadStream().pipe(fs.createWriteStream(path));

    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(delay);
    encoder.setQuality(quality);

    // readline.clearLine(process.stdout, -1);
    // readline.cursorTo(process.stdout, 0);
    // process.stdout.write(chalk.gray('Encoder Ready.') + "\n");

    let canvas = Canvas.createCanvas(size.width!, size.height!);
    let ctx = canvas.getContext('2d');

    process.stdout.write(chalk.bold.yellow('Adding Images ...'));

    for(let i = 0; i < images.length; i++){
    //     readline.clearLine(process.stdout, -1);
    // readline.cursorTo(process.stdout, 0);
    //     process.stdout.write(chalk.bold.yellow(`Adding Image ${i}/${images.length} ...`));

        let img = new Canvas.Image;
        img.src = images[i];
    
        ctx.drawImage(img,0, 0, size.width!, size.height!);
        encoder.addFrame(ctx);
    }
    // readline.clearLine(process.stdout, -1);
    // readline.cursorTo(process.stdout, 0);
    // process.stdout.write(chalk.gray(`${images.length} Images Added.`) + "\n");
    
    encoder.finish();

    // console.log(chalk.greenBright(`Saved GIF to `) + chalk.yellowBright(path) + chalk.greenBright(`.`));
}