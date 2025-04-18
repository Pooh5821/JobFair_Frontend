import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path='/' element={<Login/>} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;