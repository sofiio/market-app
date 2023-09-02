import React, { useContext } from 'react'
import { StoreContext } from '../../../App'
import { ReactComponent as ArrowIcon } from '../../../assets/svg/arrow.svg'
import { ReactComponent as CartIcon } from '../../../assets/svg/cart-white.svg'
import { ReactComponent as SortIcon } from '../../../assets/svg/sort.svg'
import { ReactComponent as SuccessIcon } from '../../../assets/svg/success.svg'
import { ReactComponent as NotFoundIcon } from '../../../assets/svg/not-found.svg'
import s from './DomainList.module.scss'

const DomainList = ({ domains }) => {
    const { cartItemIds, setCartItemIds } = useContext(StoreContext)

    const addToCartHandler = id => {
        setCartItemIds(prevState => [...prevState, id])
    }

    return (
        <div className={s.container}>
            <ul className={s.sort}>
                <li className={s.sortTitle}>სორტირება:</li>
                <li className={s.active}>
                    დამატების თარიღით <SortIcon />
                </li>
                <li>ვადის ამოწურვით</li>
                <li>ფასით</li>
                <li>ანბანით</li>
                <li>როგორ გავყიდო დომენი?</li>
            </ul>

            {domains.length === 0 ? (
                <div className={s.notFound}>
                    <NotFoundIcon />
                    <div className={s.title}>დომენი ვერ მოიძებნა</div>
                    <div className={s.description}>
                        მითითებული პარამეტრებით დომენების მარკეტში შედეგები ვერ მოიძებნა, შეცვალეთ
                        ძიების პარამეტრები და ცადეთ თავიდან
                    </div>
                </div>
            ) : (
                <div className={s.domainList}>
                    {domains?.map((item, index) => (
                        <li key={index}>
                            <div className={s.item}>
                                <div className={s.left}>
                                    <button className={s.showMore}>
                                        <ArrowIcon />
                                    </button>
                                    <div className={s.title}>
                                        {item.domainName}
                                        {item.domainExtension}
                                    </div>
                                </div>

                                <div className={s.right}>
                                    {cartItemIds?.includes(item.id) ? (
                                        <div className={s.inCart}>
                                            <SuccessIcon />
                                            <span>კალათშია</span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className={s.price}>
                                                <div className={s.lari}>
                                                    {item.price} <p>₾</p>
                                                </div>
                                                <label>14 285.7 $</label>
                                            </div>
                                            <button
                                                className={s.addToCart}
                                                onClick={() => addToCartHandler(item.id)}>
                                                <span className={s.hide}>დამატება</span>
                                                <CartIcon />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className={s.border}></div>
                        </li>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DomainList
