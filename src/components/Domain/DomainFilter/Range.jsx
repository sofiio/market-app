import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useEffect } from 'react'
import { useState } from 'react'
import s from './Range.module.scss'

const Range = ({ onChange, min, max, icon }) => {
    const [state, setState] = useState({
        value: [min, max],
    })
    const [lowerBound, upperBound] = state.value

    const onLowerBoundChange = e => {
        setState(prevState => ({
            ...prevState,
            value: [Number(e.target.value), upperBound],
        }))
    }

    const onUpperBoundChange = e => {
        setState(prevState => ({
            ...prevState,
            value: [lowerBound, Number(e.target.value)],
        }))
    }

    const onSliderChange = value => {
        setState(prevState => ({
            ...prevState,
            value,
        }))
    }

    useEffect(() => {
        onChange(state.value)
    }, [state])
    return (
        <div className={s.rangeContainer}>
            <div className={s.inputs}>
                {icon ? (
                    <>
                        <div className={s.inputContainer}>
                            <label>{icon}</label>
                            <input type='number' value={lowerBound} onChange={onLowerBoundChange} />
                        </div>
                        <div className={s.inputContainer}>
                            <label>{icon}</label>
                            <input type='number' value={upperBound} onChange={onUpperBoundChange} />
                        </div>
                    </>
                ) : (
                    <>
                        <input type='number' value={lowerBound} onChange={onLowerBoundChange} />
                        <input type='number' value={upperBound} onChange={onUpperBoundChange} />
                    </>
                )}
            </div>
            <div className={s.slider}>
                <Slider
                    range
                    min={min}
                    max={max}
                    allowCross={false}
                    value={state.value}
                    onChange={onSliderChange}
                    trackStyle={{ backgroundColor: '#99CC66', height: 2 }}
                    handleStyle={{
                        borderColor: '#99CC66',
                        height: 25,
                        width: 25,
                        marginTop: -12,
                        backgroundColor: 'white',
                        opacity: 1,
                        boxShadow: 'none',
                    }}
                    railStyle={{ backgroundColor: '#E5E5ED', height: 2 }}
                />
            </div>
        </div>
    )
}

export default Range
