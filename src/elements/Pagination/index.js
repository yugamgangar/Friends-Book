import React, { useEffect, useState } from 'react'
import './pagination.scss'
import { useList } from '../../contexts/ListContext'
import ListItem from '../../elements/ListItem'

const perPageEntries = 4;

const Pagination = ({ currentPageNo, setCurrentPageNo }) => {

    const [list] = useList()
    const [totalPages, setTotalPages] = useState(Math.ceil(list.length / perPageEntries))

    useEffect(() => {
        setTotalPages(Math.ceil(list.length / perPageEntries))
    }, [list])

    const goPrevPage = () => setCurrentPageNo((page) => page - 1);

    const goNextPage = () => setCurrentPageNo((page) => page + 1);

    const clickHandler = (e) => {
        e.stopPropagation()
        const { id, textContent } = e.target
        switch (id) {
            case 'prev':
                goPrevPage()
                break;
            case 'next':
                goNextPage()
                break;
            case 'page':
                setCurrentPageNo(Number(textContent))
                break;
            default: break;
        }
    }

    const getPaginatedData = () => {
        const startIndex = currentPageNo * perPageEntries - perPageEntries;
        const endIndex = startIndex + perPageEntries;
        return list.length > 0 ? list.slice(startIndex, endIndex) : [];
    };

    const getPaginationButtons = () => {
        let start = Math.ceil(currentPageNo / perPageEntries), buttons = []
        for (let i = 1; i <= perPageEntries && start <= totalPages; i++, start++) {
            buttons.push(<button id={`page`} className={start === currentPageNo ? 'active' : undefined} key={`page_${start}`}>{start}</button>)
        }
        return buttons
    }

    return (
        <>
            <div className="list-wrapper">
                {getPaginatedData().map((el, idx) => {
                    return <ListItem
                        isFavourite={el.favourite}
                        key={`${el.name}_${idx}`}
                        id={el.value}
                    >{el.name}</ListItem>
                })}
            </div>

            {list.length > perPageEntries && (
                <div className="pagination-bar" onClick={clickHandler}>
                    <button id="prev" disabled={currentPageNo === 1}>Prev</button>
                    {getPaginationButtons()}
                    <button id="next" disabled={currentPageNo === totalPages}>Next</button>
                </div>
            )}
        </>
    )
}

export default Pagination;
