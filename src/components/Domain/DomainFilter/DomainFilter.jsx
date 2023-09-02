import { useState } from 'react'
import { ReactComponent as CloseIcon } from '../../../assets/svg/close.svg'
import Checkbox from './Checkbox'
import s from './DomainFilter.module.scss'
import Range from './Range'

const DomainFilter = ({
    isFilterOpen,
    setIsFilterOpen,
    setIsSearch,
    categoryList,
    extensionList,
    dispatch,
    state,
}) => {
    const [categories, setCategories] = useState(categoryList)
    const [extensions, setExtensions] = useState(extensionList)

    // will add  new property "checked:true or false" in object, returns array of objects
    const addCheckedProperty = (array, obj) => {
        return array.map(item => (item.id === obj.id ? { ...obj, checked: !obj.checked } : item))
    }

    // returns array of objects with "checked: true"  proprety only
    const clearArray = (array, key, type) => {
        return array.map(el => el.checked && el[key]).filter(el => typeof el == type)
    }

    const onClose = () => {
        setIsFilterOpen()
    }

    const onBottomSearch = () => {
        setIsSearch(false)
        setIsFilterOpen()
    }

    const onSearch = e => {
        dispatch({ type: 'SEARCH', value: e.target.value })
    }

    const onExtension = obj => {
        const filtered = addCheckedProperty(extensions, obj)
        setExtensions(filtered)
        const filteredExtensions = clearArray(filtered, 'name', 'string')
        dispatch({ type: 'EXTENSION', value: filteredExtensions })
    }

    const onCategory = obj => {
        const filtered = addCheckedProperty(categories, obj)
        setCategories(filtered)
        const filteredCategories = clearArray(filtered, 'id', 'number')
        dispatch({ type: 'CATEGORY', value: filteredCategories })
    }

    const onLetters = array => {
        const [min, max] = array
        dispatch({ type: 'LETTERS', value: { min, max } })
    }

    const onPrice = array => {
        const [min, max] = array
        dispatch({ type: 'PRICE', value: { min, max } })
    }

    return (
        <div className={`${s.layout} ${isFilterOpen ? s.show : s.hide} `}>
            <div className={s.mainTitle}>
                დომენები მარკეტზე: <b>703</b>
            </div>
            <div className={s.close}>
                <h2>ფილტრი</h2>
                <button className={s.closeBtn} onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>
            <div className={s.domainFilter}>
                <div className={s.search}>
                    <input
                        type='text'
                        placeholder='სახელით ძიება'
                        onChange={onSearch}
                        value={state.search}
                    />
                </div>

                <div className={s.range}>
                    <h2 className={s.title}>ფასი</h2>
                    <Range onChange={onPrice} min={0} max={500} icon='₾' />
                </div>

                <div className={s.range}>
                    <h2 className={s.title}>სიმბოლოების რაოდონობა</h2>
                    <Range onChange={onLetters} min={0} max={26} />
                </div>

                <div className={s.filterBox}>
                    <h2 className={s.title}>კატეგორიები</h2>
                    {categories.map(obj => (
                        <Checkbox key={obj.id} obj={obj} onChange={onCategory} />
                    ))}
                </div>

                <div className={s.filterBox}>
                    <h2 className={s.title}>დომენის ზონა</h2>
                    {extensions.map(obj => (
                        <Checkbox key={obj.id} obj={obj} onChange={onExtension} />
                    ))}
                </div>
            </div>

            <div className={s.bottomSearch}>
                <button onClick={onBottomSearch}>ᲫᲘᲔᲑᲐ</button>
            </div>
        </div>
    )
}
export default DomainFilter
