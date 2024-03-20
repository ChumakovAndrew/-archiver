export const setState = (num, maxLimit, minLimit) => {
    let currentNum = num

    const incr = (limit = maxLimit) => {
        if(currentNum >= limit) return
        currentNum += 1
    }
    const decr = (limit = minLimit) =>{
        if(currentNum <= limit) return
        currentNum -= 1
    } 
    const getNum = () => currentNum

    return {incr, decr, getNum}
}