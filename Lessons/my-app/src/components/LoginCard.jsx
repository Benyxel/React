import React from 'react'
import './LoginCard.css'
import CardInput from './CardInput'
import CardBtn from './CardBtn'


const LoginCard = () => {
return (
    <div className='logincard'>
        <div className='leftside'>
            <div className='left-c'>
                <p>Hello </p>
                <h3>Welcome</h3>
            </div>

            <div className='left-c'>
                <i class="bi bi-telegram"></i>
                <h3>Benyxel</h3>
            </div>

            <div className='left-c'>
                <p>
                    to a React application using a Content Delivery Network (CDN), modify the public/index.html file within your React 
                </p>

                
            </div>

            <div className='left-c'>
               <CardBtn Sign='Sign up' />
            </div>
            
           
        </div>


        <div className='centerdiv'>

        </div>
        
        
        <div className='right-side'>

                <h1>Create Your account</h1>
                
            <div>
                <CardInput label='User' placeholder = 'Enter your name'/>
                <CardInput  label='E-mail Address' placeholder = 'Enter your email'/>
                <CardInput label='Password' placeholder='Enter your password' />
                
            </div>
            
            <div className='btndiv'>

                <CardBtn Sign='Sign up' />
                <CardBtn Sign='Sign in'/>
            </div>
                

        </div>


</div>
)
}

export default LoginCard