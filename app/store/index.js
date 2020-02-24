import {getField, updateField} from "vuex-map-fields"
export const state = () => ({
    title: `Sin titulo vuex`,
    menu: [],
    loaded: false,
})
export const getters = {
    getField,
}
export const mutations = {
    updateField,
    setBar(state, {title, menu}) {
        state.title = title
        state.menu = menu
    },
    loaded(state) {
        state.loaded = true
    },
}
