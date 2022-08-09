import Cookie from "js-cookie";
import api from './api'
export default {
    auth(to, from, next) {
        const token = Cookie.get('_myapp_token')
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        
        api.get('user/me', {headers: headers}).then((response) =>{
            next();
        }).catch((error) => {
            if (error.response.data.message == "Unauthenticated.") {
                next('/login')
            }
        });
        if (!token) {
            next('/login')
        }
        next();
    },
}