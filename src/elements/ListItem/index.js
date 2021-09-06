import React from 'react'
import Icon from '../../utils/Icon'
import './listitem.scss'
import { useList } from '../../contexts/ListContext'
import { getValue, setLocalStorage } from '../../utils/helper'


function ListItem({ children, isFavourite, id }) {

    const [list, setList] = useList()

    const toggleFavourite = (val) => {
        const idx = list.findIndex(el => el.value === val)
        const tempList = [...list]

        tempList[idx]['favourite'] = !list[idx]['favourite']
        setList(tempList)
        setLocalStorage(tempList)
    }

    const deleteItem = (name) => {
        const id = getValue(name)

        const conf = window.confirm(`Do you want to remove "${name}" from your friends list?`)
        if (conf) {
            let tempList = list.filter(el => el.value !== id)
            setList(tempList)
            setLocalStorage(tempList)
        }
    }

    return (
        <div className="item-wrapper">
            <div className="text">
                <p className="friend-name">{children}</p>
                <span>is your friend</span>
            </div>
            <button className="favourite-btn" onClick={() => toggleFavourite(id)}><Icon icon={isFavourite ? "ICON_STAR_FILLED" : "ICON_STAR"} /></button>
            <button className="delete-btn" onClick={() => deleteItem(children)}><Icon icon="ICON_BIN" /></button>
        </div>
    )
}

export default ListItem
