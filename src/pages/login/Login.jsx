import React from 'react'
import emailIcon from '/src/assets/email.svg'
import passwordIcon from '/src/assets/password.svg'
import background from '../../../public/backgroundLogin.jpg'
import './Login.css'

const Login = () => {
    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='containerMainLogin'>
            <div className='containerLogin'>
                <form action=''>
                    <p className='textLogin'>Bienvenido</p>
                    <div className='inputLogin'>
                        <img src={emailIcon} />
                        <input type='text' placeholder='Correo' />
                    </div>
                    <div className='inputLogin'>
                        <img src={passwordIcon} />

                        <input type='text' placeholder='Contraseña' />
                    </div>
                    <button onClick={onSubmit} className='submitLogin'>
                        Iniciar Sesión
                    </button>
                </form>
            </div>
            <div style={{ backgroundImage: `url(${background})` }} className='containerImage'></div>
        </div>

        // <div style={{ backgroundImage: `url(${background})`}} className='main-login'>
        //     <div className='containerLogin'>
        //         <div className="headerLogin">
        //             <div className="textLogin">Iniciar Sesión</div>
        //             <div className="underlineLogin"></div>
        //         </div>
        //         <div className="inputsLogin">
        //             <div className="inputLogin">
        //                 <img src={emailIcon} />
        //                 <input type="text" />
        //             </div>
        //             <div className="inputLogin">
        //                 <img src={passwordIcon} height={32} width={32} />

        //                 <input type="text" />
        //             </div>
        //         </div>
        //         <div className="submitLogin">Iniciar Sesión</div>
        //     </div>
        // </div>
    )
}

export default Login
