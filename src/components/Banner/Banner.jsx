import React from 'react'
import s from './Banner.module.scss'
import BannerBigImg from '../../assets/images/banner-big.png'
import BannerMediumImg from '../../assets/images/banner-medium.png'
import BannerSmallImg from '../../assets/images/banner-small.png'

const Banner = () => {
    return (
        <div className={s.banner}>
            <div className={s.bg}></div>
            <h1>გაყიდე და იყიდე დომენი მარტივად</h1>
            <img className={`${s.img}, ${s.big}`}src={BannerBigImg} alt='Banner ' />
            <img className={`${s.img}, ${s.medium}`} src={BannerMediumImg} alt='Banner ' />
            <img className={`${s.img}, ${s.small} `} src={BannerSmallImg} alt='Banner ' />
        </div>
    )
}

export default Banner
