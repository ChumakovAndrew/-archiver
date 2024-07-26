if (!obj[year]) obj[year] = {}
if (obj[year][month]) obj[year][month] += 1;
else {
    obj[year][month] = 1;
    await mkdir(folderPath, { recursive: true });
}

if (obj[year]) {
    if(!obj[year][month]){
        obj[year][month] = true
        await mkdir(folderPath)
    } 
}
else {
    obj[year] = {[month]: true}
    await mkdir(folderPath, { recursive: true })
}
