export const state = () => ({
    value: `holaa`,
})
export const mutations = {
    value(state, val) {
        console.log(`estableciendo value`, val)

        state.value = val
    },
}
