import {Request, Response, Router} from 'express';
import HTMLFetcher from '../utils/HTMLFetcher';
import ImagesFetcher from '../utils/ImagesFetcher';
import GIFMerger from '../utils/GIFMerger';
import path from 'path';

const router: Router = Router();

export interface GIFRequestData {
    url: string,
    offset?: number,
    delay?: number,
    quality?: number
}

router.get('/', async (req: Request, res: Response) => {
    console.clear();
    let data: GIFRequestData = {
        url: req.body.url,
        offset: parseInt(req.body.offset),
        delay: parseInt(req.body.delay),
        quality: parseInt(req.body.quality)
    }
    console.log(data);
    

    let url = data.url;

    let html = await HTMLFetcher(url);
    let images: Buffer[] | undefined = await ImagesFetcher(html, data.offset);

    if(images === undefined) res.status(403).send("Couldn't fetch images.");
    images = images!;

    let gifPath = path.join(__dirname, '../../public/'+Date.now()+'.gif');
    await GIFMerger(gifPath, images, data.delay, data.quality);

    console.log('GIF Successfully generated!');
    res.send(200);
    
});

export default router;