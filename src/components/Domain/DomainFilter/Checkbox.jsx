import s from './DomainFilter.module.scss'

const Checkbox = ({ obj, onChange }) => {
    return (
        <div className={s.container}>
            <input
                type='checkbox'
                id={`checkbox-${obj.id}`}
                value={obj.checked}
                onChange={e => onChange(obj, e)}
            />
            <label htmlFor={obj.id}>{obj.name}</label>
        </div>
    )
}

export default Checkbox
