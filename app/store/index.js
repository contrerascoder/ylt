import {getField, updateField} from "vuex-map-fields"
export const state = () => ({
    title: `Sin titulo vuex`,
    menu: [],
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
}
