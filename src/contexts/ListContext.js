import React, { createContext, useState, useContext } from 'react'


const ListContext = createContext()

export function useList() {
    return useContext(ListContext)
}

export default function ListProvider({ children }) {

    const [list, setList] = useState([])

    return (
        <ListContext.Provider value={[list, setList]}>
            {children}
        </ListContext.Provider>
    )
}
