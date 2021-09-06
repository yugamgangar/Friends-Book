import React, { useState, useEffect } from 'react'
import Input from '../../elements/Input'
import { isValidString, toTitleCase, getValue, checkIfExist, setLocalStorage } from '../../utils/helper'
import { useList } from '../../contexts/ListContext'
import './listpage.scss'
import Pagination from '../../elements/Pagination'

function ListPage() {

    const [list, setList] = useList([])
    const [suggestions, setSuggestions] = useState([])
    const [inputVal, setInputVal] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [currentPageNo, setCurrentPageNo] = useState(1)
    const [sorted, setSorted] = useState(false)

    useEffect(() => {
        setListFromLocalStorage()
    }, [])

    const setListFromLocalStorage = () => {
        const persistedList = localStorage.getItem('friendsBook')
        const parsedList = JSON.parse(persistedList)
        setList(parsedList)
    }

    const inputHandler = (e) => {
        const value = e.target.value
        setInputVal(value)

        const suggestions = []
        value.length > 0 && list.forEach(el => {
            if (el.name.toLowerCase().includes(value.toLowerCase()))
                suggestions.push(el.name)
        })
        setSuggestions(suggestions)


        if (value.trim().length > 0 && !isValidString(value.trim()))
            setErrorMessage('Invalid name')
        else
            setErrorMessage(null)
    }

    const addNewFriend = (name) => {
        if (name.trim().length === 0) {
            setErrorMessage("Type your friend's name to add to the list")
            setSuggestions([])
        }
        else if (checkIfExist(list, name)) {
            setErrorMessage(`${toTitleCase(name)} is already present in the list!`)
            setSuggestions([])
        }
        else if (isValidString(name.trim())) {
            let tempList = [...list]
            tempList.push({
                name: toTitleCase(name),
                value: getValue(name),
                favourite: false
            })
            setList(tempList)
            setInputVal('')
            setLocalStorage(tempList)

            const totalPages = Math.ceil(tempList.length / 4)
            currentPageNo !== totalPages && setCurrentPageNo(totalPages)
        }
    }

    const toggleSort = (e) => {
        if (e.target.checked) {
            const tempList = [...list]
            tempList.sort((obj1, obj2) => obj2.favourite - obj1.favourite)
            setList(tempList)
            setCurrentPageNo(1)
            setSorted(true)
        } else {
            setListFromLocalStorage()
            setSorted(false)
        }
    }

    return (
        <div className="list-page-wrapper">
            <div className="list-card">
                <h2>Friends List</h2>

                <Input type="text" value={inputVal} placeholder="Enter your friend's name" onChange={inputHandler} errorMessage={errorMessage} onEnter={addNewFriend} suggestions={suggestions} label="Friends Name" />

                <input type="checkbox" id="sort-btn" onChange={toggleSort} checked={sorted} />
                <label htmlFor="sort-btn" className={`sort-btn ${sorted ? 'active' : ''}`}>Sort By Favourites</label>

                <Pagination currentPageNo={currentPageNo} setCurrentPageNo={setCurrentPageNo} />
            </div>
        </div>
    )
}

export default ListPage
