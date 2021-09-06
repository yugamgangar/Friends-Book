
export const getuid = () => '_' + Math.random().toString(36).substr(2, 9);

export const isValidString = (value) => value.length !== 0 && /^[a-z\s]{0,255}$/i.test(value)

export const getValue = name => name.trim().toLowerCase().replace(/[|, /:?-]+/g, "-").replace(/$|^/g, '')

export const toTitleCase = text => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()

export const checkIfExist = (list, name) => {
    const value = getValue(name)
    const index = list.findIndex(el => el.value === value)
    return index !== -1 ? true : false
}

export const setLocalStorage = (data) => {
    localStorage.setItem('friendsBook', JSON.stringify(data))
}
