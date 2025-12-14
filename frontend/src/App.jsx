import Index from '@/pages/index/Index.jsx'
import Plugins from '@/pages/plugins/Plugins'
import Account from '@/pages/account/Account'
import Terms from '@/pages/terms/Terms'
import Rules from '@/pages/rules/Rules'
import Prices from '@/pages/prices/Prices'
import Activate from '@/pages/activate/Activate'
import Auth from '@/pages/auth/Auth'
import ProtectedRoute from './global-components/ProtectedRoute/ProtectedRoute'
import Whitelist from './pages/whitelist/Whitelist'
import { BrowserRouter, Routes, Route } from "react-router"
import { useContext, useEffect } from 'react'
import { Context } from '@/main'
import { observer } from 'mobx-react-lite'
import NotFound from './pages/notFound/notFound'

const App = () => {
    const { store } = useContext(Context)

    useEffect(() => {
        const checkAuth = async () => {
            await store.checkAuth()
        }

        checkAuth()
    }, [store])

    const savedTheme = localStorage.getItem('theme')

    if (savedTheme === null) {
        localStorage.setItem('theme', 'light')
    }

    document.documentElement.setAttribute('theme', savedTheme === 'dark' ? 'dark' : 'light')

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/plugins' element={<Plugins />} />
                <Route path='/account' element={
                    <ProtectedRoute redirect='/auth'>
                        <Account />
                    </ProtectedRoute>
                } />
                <Route path='/terms' element={<Terms />} />
                <Route path='/rules' element={<Rules />} />
                <Route path='/prices' element={<Prices />} />
                <Route path='/activate' element={<Activate />} />
                <Route path='/auth' element={
                    <ProtectedRoute redirect='/account' access='not-auth'>
                        <Auth />
                    </ProtectedRoute>
                } />
                <Route path='/whitelist' element={
                    <ProtectedRoute redirect='/auth' access='has-not-nick'>
                        <Whitelist />
                    </ProtectedRoute>
                } />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default observer(App)