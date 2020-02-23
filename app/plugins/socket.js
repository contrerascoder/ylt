export default function({store}, inject) {
    const socket = io(process.env.socketUrl)
    inject(`socket`, socket)
}
