import {mkdir} from 'node:fs/promises';
import {join} from 'node:path';

export const formatDate = async (date) => {
    const year = await date.getFullYear()
    const month = (await date.getMonth() + 1).toString().padStart(2, '0')
    const day = await date.getDate().toString().padStart(2, '0')
    return {year, month, day}
}

export const folderCreator = async (obj, date, archiveFolder) => {
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    // const yearFolder = join(archiveFolder, year)
    const pathFolder = join(archiveFolder, year, month)

    if (!obj[year]) obj[year] = {}
    if (obj[year][month]) obj[year][month] += 1;
    else {
        obj[year][month] = 1;
        await mkdir(pathFolder, { recursive: true });
    }

    return { pathFolder }
}