export default function({$axios, redirect}, inject) {
    const instance = $axios.create({
        baseURL: process.env.baseUrl,
    })
    inject(`api`, instance)
}
