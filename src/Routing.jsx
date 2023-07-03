import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import NavbarLanding from './components/NavbarLanding'
import LandingPage from './pages/LandingPage'
import TeamPage from './pages/TeamPage'
import RulesPage from './pages/RulesPage'
import MainPage from './pages/MainPage'
import Game from './pages/Game'
import Board from './pages/Board'
import Login from './profile/Login'
import UserCheck from './protected/UserCheck'
import Signup from './profile/Signup'


function Routing(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/navbar'} element={<Navbar/>}/>
                <Route path={'/navbarlanding'} element={<NavbarLanding/>}/>
                <Route path={'/teampage'} element={<TeamPage/>}/>
                <Route path={'/rulespage'} element={<RulesPage/>}/>
                <Route path={'/app'} element={<MainPage/>}/>
                <Route path={'/'} element={<LandingPage/>}/>
                <Route path={'/game'} element={<Game/>}/>
                <Route path={'/board'} element={<Board/>}/>

                <Route path={'/signup'} element={<Signup/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/usercheck'} element={<UserCheck/>}/>

            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing