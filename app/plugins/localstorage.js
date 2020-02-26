import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: `vuexstore`,
            paths: [`auth`, `cache`],
        })(store)
        store.commit(`loaded`, true)
    })
}
