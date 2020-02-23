module.exports = {
    rootDir: `./app`,
    modules: [`@nuxtjs/axios`],
    head: {
        titleTemplate: `%s - Nuxt.js`,
        link: [
            {rel: `stylesheet`, href: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css`},
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
        baseUrl: `http://localhost:8080/api`,
    },
    plugins: [
        `~/plugins/axios.js`,
        `~/plugins/injectEnv.js`,
    ],
    proxy: {
        '/api/': `http://api.example.com`,
        '/api2/': `http://api.another-website.com`,
    },
}
