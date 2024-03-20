function getArgs(args) {
    const res = {};
    const [executor, file, ...rest] = args

    rest.forEach((item, index, arr) => {
        let nextItem = arr[index + 1]
        if(item.charAt(0) == "-"){
            let arg = item.substring(1)

            if(index == arr.length - 1) res[arg] = true
            else if(nextItem.charAt(0) != "-") res[arg] = nextItem
            else res[arg] = true
        }
    });

    return res
};




export { getArgs };