export const namespaced = true

export const state = ({
    items: [],
})

export const mutations = {
    list(state, courses) {
        state.items = courses
    },
    add(state, course) {
        state.items.push(course)
    },
}

export const actions = {
    async fetchCourses({commit}) {
        const coursesReq = await this.$api.get(`/courses`)
        commit(`list`, coursesReq.data.courses)
    },
}
