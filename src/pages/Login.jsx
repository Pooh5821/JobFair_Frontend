import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { login,reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {token, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
            setFormData({
                email: '',
                password: ''
            })
        }
        else if(isSuccess){
            navigate('/bookings')
        }
        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }

        dispatch(login(data))
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt />Login
                </h1>
                <p>Please login to view bookings</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input type='email' name='email' value={email} onChange={onChange} placeholder="Enter your email" required />
                    </div>

                    <div className='form-group'>
                        <input type='password' name='password' value={password} onChange={onChange} placeholder="Enter your password" required />
                    </div>

                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;