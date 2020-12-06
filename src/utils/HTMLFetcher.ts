import axios from 'axios';
import chalk from 'chalk';
import readline from 'readline';

export default async (url: string): Promise<any | null> => {
    // process.stdout.write(chalk.bold.yellow('Fetching HTML ...'));
    try {
        const { data } = await axios.get(url);

        // readline.clearLine(process.stdout, -1);
        // readline.cursorTo(process.stdout, 0);
        // process.stdout.write(chalk.gray(`Fetched ${url}.`) + "\n");
        return data;
    } catch {
        // readline.clearLine(process.stdout, -1);
        // readline.cursorTo(process.stdout, 0);
        // process.stdout.write(chalk.red(`Could not fetch ${url}.`) + "\n");
        return null;
    }

}