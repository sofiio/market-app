import React, { useContext } from 'react'
import { StoreContext } from '../../App'
import { ReactComponent as ArrowDownIcon } from '../../assets/svg/arrow-down.svg'
import { ReactComponent as BellIcon } from '../../assets/svg/bell.svg'
import { ReactComponent as CartIcon } from '../../assets/svg/cart.svg'
import { ReactComponent as FlagIcon } from '../../assets/svg/flag.svg'
import { ReactComponent as LogoIcon } from '../../assets/svg/logo.svg'
import { ReactComponent as UserIcon } from '../../assets/svg/user.svg'
import { ReactComponent as MenuIcon } from '../../assets/svg/menu.svg'
import s from './HeaderTop.module.scss'

const HeaderTop = () => {
    const { cartItemIds } = useContext(StoreContext)
    return (
        <div className={s.headerTop}>
            <div className={s.container}>
                <div className={s.left}>
                    <div className={s.menu}>
                        <MenuIcon />
                    </div>
                    <LogoIcon />
                </div>
                <div className={s.right}>
                    <div className={s.icon}>
                        <BellIcon />
                    </div>
                    <div className={s.icon}>
                        <CartIcon />
                        {cartItemIds.length !== 0 && (
                            <div className={s.itemsCount}>{cartItemIds.length}</div>
                        )}
                    </div>
                    <div className={s.user}>
                        <UserIcon />
                        <span>Kancha Co.</span>
                        <div className={s.arrowDown}>
                            <ArrowDownIcon />
                        </div>
                    </div>
                    <div className={s.flag}>
                        <FlagIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HeaderTop
