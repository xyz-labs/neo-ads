export const getStackValue = (item) => {
    return item.value
}

export const getArrayValues = (array) => {
    return array.map((element) => {
        return getStackValue(element)
    })
}