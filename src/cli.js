import arg from 'arg';
import chalk from 'chalk';
import inquirer from 'inquirer';
import {spintooz} from './main';

function parseArgumentsIntoOptions(rawArgs){
    let args = arg(
        {
            '--offset': Number,
            '--quality': Number,
            '--delay': Number,
            '--default': Boolean,
            '--output': String,
            '-O': '--output', 
            '-D': '--default',
            '-o': '--offset',
            '-q': '--quality',
            '-d': '--delay'
        },
        {
            argv: rawArgs.slice(2)
        }
    );
    return {
        url: args._[0] || undefined,
        offset: args['--offset'] || undefined,
        quality: args['--qulity'] || undefined,
        delay: args['--delay'] || undefined,
        output: args['--output'] || undefined,
        default: args['--default'] || false
    }
}

async function promptForMissingOptions(options) {
    
    if(!options.url){
        console.log(chalk.red("Missing URL. Use: ") +
            chalk.yellow("spintooz <url> [--default -D | --output -O | --offset -o | --quality -q | --delay -d]"));
        return;
    }

    if (options.default) {
      return {
        ...options,
        offset: 1,
        quality: 10,
        delay: 50,
        output: './'
      };
    }
   
    const questions = [];
    if (!options.offset) {
      questions.push({
        type: 'number',
        name: 'offset',
        message: 'How many frames to skip each step?',
        default: 1,
      });
    }

    if(!options.quality){
      questions.push({
        type: 'number',
        name: 'quality',
        message: 'GIF Quality (1-10)?',
        default: 10,
      });
    }
   
    if (!options.delay) {
      questions.push({
        type: 'number',
        name: 'delay',
        message: 'How much time does it take to switch frames (ms)?',
        default: 50,
      });
    }

    if (!options.output) {
        questions.push({
          type: 'string',
          name: 'output',
          message: 'Where to save the GIF?',
          default: './',
        });
      }
   
    const answers = await inquirer.prompt(questions);
    return {
      ...options,
      offset: options.offset || answers.offset,
      quality: options.quality || answers.quality,
      delay: options.delay || answers.delay,
      output: options.output || answers.output,
    };
   }

export async function cli(args){
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    if(options === undefined) return;
    await spintooz(options);
}