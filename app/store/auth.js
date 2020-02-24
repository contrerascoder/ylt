import {getField, updateField} from "vuex-map-fields"
export const state = () => ({
    token: ``,
    user: null,
})
export const getters = {
    getField,
}
export const mutations = {
    updateField,
}
