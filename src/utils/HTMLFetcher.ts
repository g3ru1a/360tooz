import axios from 'axios';
import chalk from 'chalk';

export default async (url: string): Promise<any | null> => {
    process.stdout.write(chalk.bold.yellow('Fetching HTML ...'));
    try {
        const { data } = await axios.get(url);

        process.stdout.clearLine(-1);
        process.stdout.cursorTo(0);
        process.stdout.write(chalk.gray(`Fetched ${url}.`) + "\n");
        return data;
    } catch {
        process.stdout.clearLine(-1);
        process.stdout.cursorTo(0);
        process.stdout.write(chalk.red(`Could not fetch ${url}.`) + "\n");
        return null;
    }

}