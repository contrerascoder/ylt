export default function({$axios, redirect, store}, inject) {
    const instance = $axios.create({
        baseURL: process.env.baseUrl,
    })
    store.subscribe((mutation, state) => {
        if (mutation.type === `loaded` && state.auth.token) {
            instance.setHeader(`authorization`, state.auth.token)
        }
    })
    inject(`api`, instance)
}
