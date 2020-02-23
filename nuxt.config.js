const serverUrl = `http://localhost:8080`
module.exports = {
    rootDir: `./app`,
    modules: [`@nuxtjs/axios`],
    head: {
        titleTemplate: `%s - Nuxt.js`,
        link: [
            {rel: `stylesheet`, href: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css`},
        ],
        script: [
            {src: `${serverUrl}/socket.io/socket.io.js`},
        ],
        meta: [
            {charset: `utf-8`},
            {name: `viewport`, content: `width=device-width, initial-scale=1`},

            // hid is used as unique identifier. Do not use `vmid` for it as it will not work
            {hid: `description`, name: `description`, content: `Meta description`},
        ],
    },
    axios: {
        proxy: true, // Can be also an object with default options
    },
    env: {
        baseUrl: `${serverUrl}/api`,
        socketUrl: serverUrl,
    },
    plugins: [
        `~/plugins/global.js`,
        `~/plugins/axios.js`,
        `~/plugins/injectEnv.js`,
        {src: `~/plugins/socket.js`, ssr: false},
        {src: `~/plugins/localstorage.js`, ssr: false},
    ],
    proxy: {
        '/api/': `http://api.example.com`,
        '/api2/': `http://api.another-website.com`,
    },
}
