import express from 'express';
import dotenv, { parse } from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import routes from './routes/routes';
import chalk from 'chalk';

//Load .env data
dotenv.config();

const app = express();
const PORT: string = process.env.PORT || (3000).toString();

//Middleware
app.use('/public', express.static(path.join(__dirname,'../public')));
app.use(express.json());
app.use(cors());

//Routes
app.use('/api',routes);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

///EMPTY PUBLIC FOLDER JOB

const publicDir = path.join(__dirname, '../public');

setInterval(emptyPublicDirectory, parseInt(process.env.DIR_EMPTY_INTERVAL_SECONDS!) * 1000);

function emptyPublicDirectory(){
    // console.log(chalk.white.bgRed.bold("EMPTYING PUBLIC DIRECTORY"));
    
    fs.readdir(publicDir, (err, files) => {
        if(err) throw err;
        for(let file of files){
            let filePath = path.join(publicDir, file);
            var stats = fs.statSync(filePath);
            var mtime = stats.mtime.toUTCString();
            var msDiff = Date.now() - Date.parse(mtime);
            let minDiff = Math.floor(msDiff / (1000*60))
            if(minDiff >= parseInt(process.env.DIR_EMPTY_FILE_LIMIT!)){
                fs.unlink(filePath, err => {
                    if(err) throw err;
                });
            }
            
        }
    });
}