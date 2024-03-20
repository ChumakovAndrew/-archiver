import {stat, readdir} from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import chalk from "chalk";

import { getArgs } from "./helpers/args.js";


async function main() {
    const rl = readline.createInterface({ input, output});
    const {path} = getArgs(process.argv)

    if(typeof(path) === 'boolean'){
        console.error(chalk.red('путь не указан'))
        process.exit()
    }
    
    await stat(path)
    .then(async () => {
        await rl.question('Are you sure that you want to continue? (yes / no) ').then(answer => {
            if(answer.toLowerCase() === 'no') process.exit()
        })
        rl.close()
    })
    .catch(err => {
        console.error(chalk.red(err.message))
        process.exit()
    })

}

main();












