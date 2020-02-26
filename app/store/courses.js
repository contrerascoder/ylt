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
    set(state, {id, course}) {
        const courseQueried = state.items.filter((course) => course._id === id)[0]
        const index = state.items.indexOf(courseQueried)
        state.items.splice(index, 1, {
            ...courseQueried,
            ...course,
        })
    },
}

export const actions = {
    async fetchCourses({commit}) {
        const coursesReq = await this.$api.get(`/courses`)
        commit(`list`, coursesReq.data.courses)
    },
}
