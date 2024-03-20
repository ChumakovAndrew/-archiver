import {stat, readdir, rename, mkdir} from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import {join} from 'node:path';

import chalk from "chalk";
import recursiveReaddir from 'recursive-readdir';

import { getArgs } from "./helpers/args.helper.js";
import { setState } from './helpers/state.helper.js';


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

    const totalFileCount = await recursiveReaddir(path).then(files => files.length)
    const {getNum: currentFileCount, incr} = setState(0, totalFileCount, 0)

    async function countFiles(directory) {
        const files = await readdir(directory)

        for (const file of files) {
            const filePath = join(directory, file)
            const stats = await stat(filePath)
            const {birthtime} = stats

            if (stats.isDirectory()) await countFiles(filePath) // Рекурсивный вызов для вложенной директории
            // const newName = join(directory, birthtime.getDate)
            // await rename(filePath)

            console.log(birthtime)

            incr(); // Увеличиваем счетчик для файла
        }
    }
    await countFiles(path)

}

main();












