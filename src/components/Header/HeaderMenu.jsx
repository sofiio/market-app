import React from 'react'
import s from './HeaderMenu.module.scss'

const HeaderMenu = () => {
    return (
        <div className={s.headerMenu}>
            <div className={s.container}>
                <ul className={s.left}>
                    <li>დომენი</li>
                    <li>ტრანსფერი</li>
                    <li>ჰოსტინგი</li>
                    <li>Gmail</li>
                    <li>ვებგვერდი</li>
                    <li>დომენის მარკეტი</li>
                </ul>
                <ul className={s.right}>
                    <li>ჩვენს შესახებ</li>
                    <li>ფასები</li>
                    <li>ბლოგი</li>
                    <li>დახმარება</li>
                </ul>
            </div>
        </div>
    )
}

export default HeaderMenu
