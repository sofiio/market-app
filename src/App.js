import React from 'react'
import Banner from './components/Banner/Banner'
import Domain from './components/Domain/Domain'
import Header from './components/Header/Header'
import './style/style.scss'

export const StoreContext = React.createContext(null)

const App = () => {
    const [cartItemIds, setCartItemIds] = React.useState([])

    return (
        <StoreContext.Provider value={{ cartItemIds, setCartItemIds }}>
            <Header />
            <div className='container'>
                <Banner />
                <Domain />
            </div>
        </StoreContext.Provider>
    )
}
export default App
