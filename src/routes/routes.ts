import {Request, Response, Router} from 'express';
import HTMLFetcher from '../utils/HTMLFetcher';
import ImagesFetcher from '../utils/ImagesFetcher';
import GIFMerger from '../utils/GIFMerger';
// import FileUpload from '../utils/FileUpload';
import path from 'path';
import chalk from 'chalk';

const router: Router = Router();

export interface GIFRequestData {
    url: string,
    offset?: number,
    delay?: number,
    quality?: number
}

router.get('/', async (req: Request, res: Response) => {
    let data: GIFRequestData = {
        url: req.body.url,
        offset: parseInt(req.body.offset),
        delay: parseInt(req.body.delay),
        quality: parseInt(req.body.quality)
    }

    let url = data.url;

    let html = await HTMLFetcher(url);
    if(html == null) return res.status(500).send("Couldn't fetch URL.");

    let images: Buffer[] | undefined = await ImagesFetcher(html, data.offset);

    if(images?.length === 0 || images === undefined){
        console.log(chalk.red("Couldn't fetch images."));
        
        res.status(500).send("Couldn't fetch images.");
        return;
    }
    images = images!;

    let gifName = Date.now()+'.gif';
    let gifPath = path.join(__dirname, '../../public/'+gifName);
    await GIFMerger(gifPath, images!, data.delay, data.quality);

    // await FileUpload(gifPath, gifName);

    let gifLink = process.env.URL + '/public/' + gifName;
    res.send({link: gifLink});
});

export default router;