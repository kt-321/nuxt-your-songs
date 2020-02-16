export default ({ app, $axios, redirect }) => {
    $axios.onRequest((config) => {
        const credential = app.$cookies.get('__cred__')
        if (credential) {
            config.headers['Authorization'] = 'Bearer ' + credential
        }
    })
}