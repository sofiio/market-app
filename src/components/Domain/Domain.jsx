import _ from 'lodash'
import React, { useEffect, useReducer, useState } from 'react'
import { ReactComponent as SortArrowIcon } from '../../assets/svg/sort-arrow.svg'
import { ReactComponent as SortIcon } from '../../assets/svg/sort-small.svg'
import s from './Domain.module.scss'
import DomainFilter from './DomainFilter/DomainFilter'
import DomainList from './DomainList/DomainList'

const initialState = {
    search: '',
    extension: [],
    category: [],
    price: { min: 0, max: 0 },
    letters: { min: 0, max: 0 },
    isFilterOpen: false,
    isSearch: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SEARCH':
            return {
                ...state,
                search: action.value,
            }
        case 'EXTENSION':
            return {
                ...state,
                extension: action.value,
            }
        case 'CATEGORY':
            return {
                ...state,
                category: action.value,
            }
        case 'LETTERS':
            return {
                ...state,
                letters: action.value,
            }
        case 'PRICE':
            return {
                ...state,
                price: action.value,
            }
        case 'IS-FILTER-OPEN':
            return {
                ...state,
                isFilterOpen: action.value,
            }
        case 'IS-SEARCH':
            return {
                ...state,
                isSearch: action.value,
            }
        default:
            return state
    }
}

const Domain = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [filteredDomains, setFilteredDomains] = useState(domainList)

    let filterExtensions = [...new Set(domainList.map(item => item.domainExtension))]
    let domainExtensions = filterExtensions.map((item, index) => {
        return {
            name: item,
            id: index,
        }
    })

    const setIsFilterOpen = () => {
        dispatch({ type: 'IS-FILTER-OPEN', value: !state.isFilterOpen })
    }

    const setIsSearch = value => {
        dispatch({ type: 'IS-SEARCH', value: value })
    }

    const filterHandler = () => {
        setIsFilterOpen()
        dispatch({ type: 'IS-SEARCH', value: !state.isFilterOpen })
    }

    const filterBySearch = result => {
        return _.filter(result, domain =>
            _.includes(JSON.stringify(domain.domainName), state.search.toLowerCase())
        )
    }

    const filterByExtension = result => {
        if (state.extension.length === 0) return result

        let filteredArray = []
        for (let i = 0; i < state.extension.length; i++) {
            for (let j = 0; j < result.length; j++) {
                if (state.extension[i] == result[j].domainExtension) {
                    filteredArray.push(result[j])
                }
            }
        }
        return filteredArray
    }

    const filterByCategory = result => {
        if (state.category.length === 0) return result

        let filteredArray = []
        for (let i = 0; i < state.category.length; i++) {
            for (let j = 0; j < result.length; j++) {
                if (result[j].categories.includes(state.category[i])) {
                    filteredArray.push(result[j])
                }
            }
        }
        const unique = (x, i, a) => a.indexOf(x) == i
        return filteredArray.filter(unique)
    }

    const filterByLetters = result => {
        const { min, max } = state.letters
        if (min === 0 && max === 0) return result
        let filteredArray = []

        result.forEach(item => {
            if (min <= item.domainName.length && max >= item.domainName.length) {
                filteredArray.push(item)
            }
        })
        return filteredArray
    }

    const filterByPrice = result => {
        const { min, max } = state.price
        if (min === 0 && max === 0) return result

        let filteredArray = []
        result.forEach(item => {
            if (min <= item.price && max >= item.price) {
                filteredArray.push(item)
            }
        })
        return filteredArray
    }

    useEffect(() => {
        let result = domainList
        result = filterByExtension(result)
        result = filterBySearch(result)
        result = filterByCategory(result)
        result = filterByLetters(result)
        result = filterByPrice(result)

        // Search on button click on small screens.
        if (!state.isSearch) {
            setFilteredDomains(result)
        }
    }, [state])

    return (
        <div className={s.container}>
            <div className={s.sortContainer}>
                <button className={s.sortBtn} onClick={filterHandler}>
                    <span>სორტირება</span>
                    <SortIcon />
                </button>
                <button className={s.sortBtn}>
                    <span>სორტირება</span>
                    <SortArrowIcon />
                </button>
            </div>

            <DomainFilter
                isFilterOpen={state.isFilterOpen}
                setIsSearch={setIsSearch}
                setIsFilterOpen={setIsFilterOpen}
                extensionList={domainExtensions}
                categoryList={categories}
                state={state}
                dispatch={dispatch}
            />
            <DomainList categories={categories} domains={filteredDomains} />
        </div>
    )
}

export default Domain

const categories = [
    {
        name: 'უძრავი ქონება',
        id: 1,
    },
    {
        name: 'ბიზნესი',
        id: 2,
    },
    {
        name: 'მედია',
        id: 3,
    },
]

const domainList = [
    {
        id: 1,
        domainName: 'example1',
        domainExtension: '.ge',
        price: 299,
        categories: [1, 2],
    },
    {
        id: 2,
        domainName: 'example2',
        domainExtension: '.com.ge',
        price: 299,
        categories: [2, 3],
    },
    {
        id: 3,
        domainName: 'example3',
        domainExtension: '.edu.ge',
        price: 299,
        categories: [2],
    },
    {
        id: 4,
        domainName: 'example4',
        domainExtension: '.ge',
        price: 299,
        categories: [3],
    },
    {
        id: 5,
        domainName: 'example5',
        domainExtension: '.org.ge',
        price: 299,
        categories: [1, 3],
    },
]
