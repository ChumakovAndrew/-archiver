import {stat, mkdir} from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import {join} from 'node:path';

import chalk from "chalk";
import recursiveReaddir from 'recursive-readdir';

import { getArgs } from "./helpers/args.helper.js";
import { setState } from './helpers/state.helper.js';
import { renameAndMoveFiles } from './utils/renameAndMoveFiles.js';


async function main() {
    const write = (s) => process.stdout.write(s)
    const rl = readline.createInterface({ input, output});
    const { path } = getArgs(process.argv)
    let totalFileCount = 0
    const {getNum: currentFileCount, incr} = setState(0, totalFileCount, 0)
    const archiveDir = join(path, 'archive')

    if(typeof(path) === 'boolean'){
        console.error(chalk.red('путь не указан'))
        process.exit()
    }
    
    await stat(path)
    .then(async () => {
        await rl.question('Are you sure that you want to continue? (yes / no) ').then(async answer => {
            if(answer.toLowerCase() === 'no') process.exit()
            totalFileCount = recursiveReaddir(path).then(files => files.length)
            await mkdir(archiveDir)
            await renameAndMoveFiles(path, archiveDir)
        })
        rl.close()
    })
    .catch(err => {
        console.error(chalk.red(err.message))
        process.exit()
    })
    
            

    
    
}

main();
