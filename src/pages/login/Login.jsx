import { useForm } from 'react-hook-form'
import background from '../../assets/backgroundLogin.jpg'
import './Login.css'
import { authService } from '../../services/auth.services'
import useAuthStore from '../../store/useAuthStore'
import { Navigate, useNavigate } from 'react-router'

const Form = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    return (
        <form className='formLogin' onSubmit={handleSubmit(onSubmit)}>
            <h1 className='title'>Bienvenido</h1>
            <p className='text'>Ingresa tus datos</p>
            <div className='containerForm'>
                <div>
                    <label className='label' htmlFor='email'>
                        Correo
                    </label>
                    <input
                        {...register('email', {
                            required: {
                                value: true,
                                message: '*Este campo es obligatorio',
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: '*Ingresa un correo válido',
                            },
                        })}
                        className='input'
                        id='email'
                        type='email'
                        placeholder='Ingresa tu correo'
                    />
                    {errors.email && <span className='errorText'>{errors.email.message}</span>}
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <label className='label' htmlFor='password'>
                        Contraseña
                    </label>
                    <input
                        {...register('password', {
                            required: {
                                value: true,
                                message: '*Este campo es obligatorio',
                            },
                        })}
                        className='input'
                        id='password'
                        type='password'
                        placeholder='Ingresa tu contraseña'
                    />
                    {errors.password && (
                        <span className='errorText'>{errors.password.message}</span>
                    )}
                </div>
                <div className='containerForgotPassword'>
                    <button className='btnForgotPassword'>Olvidé mi contraseña</button>
                </div>
                <button type='submit' className='btnSignIn'>
                    Iniciar Sesión
                </button>
            </div>
        </form>
    )
}

const Login = () => {
    const { login, isAuthenticated, isLoading, error } = useAuthStore()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const { email, password } = data
            await login(email, password)
            navigate('/dashboard')
        } catch (error) {
            console.log('Login error:', error)
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <div className='containerMainLogin'>
            <div className='containerLogin'>
                <Form onSubmit={onSubmit} />
            </div>
            <div className='containerImage'>
                <img src={background} alt='login-photo' />
            </div>
        </div>
    )
}

export default Login
