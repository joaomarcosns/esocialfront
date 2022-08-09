import Cookie from "js-cookie";
export default {
    block(to, from, next) {
        const token = Cookie.get('_myapp_token')
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        if (token) {
            next('/');
        }
        next()
    },
}