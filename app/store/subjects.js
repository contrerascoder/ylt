export const namespaced = true

export const state = () => ({
    items: [],
})

export const mutations = {
    list(state, subjects) {
        state.items = subjects
    },
    add(state, subject) {
        state.items.push(subject)
    },
    set(state, {id, subject}) {
        const courseQueried = state.items.filter((course) => course._id === id)[0]
        const index = state.items.indexOf(courseQueried)
        state.items.splice(index, 1, {
            ...courseQueried,
            ...subject,
        })
    },
}

export const actions = {
    async fetchSubjects({commit, rootState}) {
        const lastCourse = rootState.cache.lastCourse
        const coursesReq = await this.$api.get(`/subjects?course=${lastCourse}`)
        commit(`list`, coursesReq.data.subjects)
    },
}
