import {join, extname} from 'node:path';
import {stat, readdir, rename, readFile} from 'node:fs/promises';

import { formatDate, folderCreator } from '../helpers/format.date.helper.js';
import { tree } from '../helpers/state.helper.js';
import exifParser from 'exif-parser';


export async function renameAndMoveFiles(directory, archiveDir) {
    const files = await readdir(directory)

    for (const file of files) {
        const currentPath = join(directory, file)
        const stats = await stat(currentPath)
        
        if (stats.isFile())     {
            let fileDate = null
            if(currentPath.extname === 'jpg') {
                async function getDateTaken(filePath) {
                    try {
                      const data = await readFile(filePath);
                      const parser = exifParser.create(data);
                      const result = parser.parse();
                      return result.tags.DateTimeOriginal;
                    } catch (err) {
                      console.error('Error reading the file:', err);
                    }
                }
                fileDate = await getDateTaken(currentPath) 
            }else {
                const { birthtime, mtime} = stats
                fileDate = birthtime > mtime 
                    ? mtime 
                    : birthtime
            }

           
            const {year, month, day} = await formatDate(fileDate)
            const newfileName = `${year}-${month}-${day}_${stats.ino}${extname(file)}`
            console.log(newfileName)



            const { pathFolder } = await folderCreator(tree, fileDate, archiveDir)
            const newPath = join(pathFolder, newfileName)
            await rename(currentPath, newPath)

           
            
        } else await renameAndMoveFiles(currentPath, archiveDir)
    }
}
