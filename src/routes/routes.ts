import {Request, Response, Router} from 'express';
import HTMLFetcher from '../utils/HTMLFetcher';
import ImagesFetcher from '../utils/ImagesFetcher';
import GIFMerger from '../utils/GIFMerger';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {

    let url = 'https://youtooz.com/products/neekolul';

    let html = await HTMLFetcher(url);
    let images = await ImagesFetcher(html);

    res.send(200);
});

export default router;