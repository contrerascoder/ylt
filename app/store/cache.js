import {getField, updateField} from "vuex-map-fields"
export const namespaced = true
export const state = () => ({
    lastCourse: ``,
})
export const getters = {
    getField,
}
export const mutations = {
    updateField,
}
