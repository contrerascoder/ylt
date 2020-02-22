export default function({store}) {
    store.commit(`value`, process.env.baseUrl)
}
