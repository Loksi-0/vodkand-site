import Index from '@/pages/index/Index.jsx'
import Plugins from '@/pages/plugins/Plugins'
import Account from '@/pages/account/Account'
import Terms from '@/pages/terms/Terms'
import Rules from '@/pages/rules/Rules'
import Prices from '@/pages/prices/Prices'
import Activate from '@/pages/activate/Activate'
import Auth from '@/pages/auth/Auth'
import { BrowserRouter, Routes, Route } from "react-router"
import { useContext, useEffect } from 'react'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import ProtectedRoute from './global-components/ProtectedRoute/ProtectedRoute'

const App = () => {
    const { store } = useContext(Context)

    if (localStorage.getItem('token')) {
        store.checkAuth()
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/plugins' element={<Plugins />} />
                <Route path='/account' element={
                    <ProtectedRoute redirect='/'>
                        <Account />
                    </ProtectedRoute>
                } />
                <Route path='/terms' element={<Terms />} />
                <Route path='/rules' element={<Rules />} />
                <Route path='/prices' element={<Prices />} />
                <Route path='/activate' element={<Activate />} />
                <Route path='/auth' element={
                    <ProtectedRoute redirect='/account' reversed>
                        <Auth />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default observer(App)