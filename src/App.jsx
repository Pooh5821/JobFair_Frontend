import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path='/' element={<Login/>} />
                        <Route path='/bookings' element={<Dashboard/>} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;