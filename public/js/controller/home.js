/**
 * 
 *  class: home (controller)
 * 
 *  purpose: to add interactivity to the home content that is fetched by the server 
 */


import { baseClass} from './baseClass.js';
import { API } from '../lib/api.js';




class home extends baseClass {

    constructor()
    {
        super();
       // console.log(this.getMethodName());
       this.validateMethod();

    }

    /**
     * 
     *  @method: index 
     * 
     *  @purpose: to add interactivity to the home content that is fetched by the server 
     *  
     */

    index()
    {
        let btnRegister = document.getElementById('btnRegisterPage');

        if (btnRegister)  {
            btnRegister.addEventListener('click', () => {
                window.location.pathname = '/home/register';
            });
        }
        
    }

    /**
     * 
     *  @method: register  
     * 
     *  @purpose: to add interactivity to the home content that is fetched by the server
     * 
     */

    register()
    {

        // get the messages for the login page
        let registerForm   = document.getElementById('registerForm');
        let path = '/Authentication/register/';
        let message = document.getElementById('ajaxContainer');

        // is the login form activated? 
        if (registerForm) {
            let submitBtn = document.getElementById('submitBtn');

            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let formData = new FormData(registerForm);
                let data = {};
                formData.forEach((value, key) => {
                    data[key] = value;

                });

            
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                };

                const req = new API();

                // send the request to the server of the application
                req.post(path, data, headers).then(data => {    
                     // check the response of the appliction 
                     if (data.status === true) {
                         // display the message to the user
                         message.classList.remove('text-danger');
                         message.classList.add('text-success');
                         message.innerText = data.message;
                         // redirect the user to the login page
                         window.location.pathname = '/home/login';
                     } else {
                            // display the message to the user
                            message.classList.remove('text-success');
                            message.classList.add('text-danger');
                            message.innerText = data.message;
                     }
                });
                            
            });

            submitBtn.addEventListener('submit', (e) => {
                e.preventDefault();
            });
        }
    }

    /**
     * 
     * @method: login
     * 
     *  @purpose: to add interactivity to the home content that is fetched by the server
     * 
     */


    login()
    {


        let loginForm = document.getElementById('loginForm');
        let path =      '/Authentication/login/';
        let message =   document.getElementById('ajaxContainer');
        let submitBtn = document.getElementById('submitBtn');

        // is the login form activated?
        if (loginForm) {
            // prevent the form from submitting
           loginForm.addEventListener('submit', (e) => {
              e.preventDefault();

                // get the form data
                let formData = new FormData(loginForm);
                let data = {};
                formData.forEach((value, key) => {
                    data[key] = value;
                });
                
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                };

                const req = new API();

                // send the request to the server of the application
                req.post(path, data, headers).then(data => {

                    // check the response of the application  
                    if (data.status === true) {
                        // display the message to the user
                        message.classList.remove('text-danger');
                        message.classList.add('text-success');
                        message.innerText = data.message;
                        // redirect the user to the dashboard page
                        window.location.pathname = '/dashboard';
                    } else {
                        // display the message to the user
                        message.classList.remove('text-success');
                        message.classList.add('text-danger');
                        message.innerText = data.message;
                    }
                });
                
           });

            // submit the form
            submitBtn.addEventListener('submit', (e) => {
                e.preventDefault();
            });
        }
    }

}

// activate the login page... 
const homeController = new home();