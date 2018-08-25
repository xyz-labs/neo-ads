export const getStackArrayValues = (array) => {
    return array.map((element) => {
        return element.value
    })
}

export const getStartOfDay = (date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date
}

export const getStartOfMonth = (date) => {
    date = getStartOfDay(date)
    date.setDate(1)

    return date
}