export default {
    methods: {
        printErrors(errors) {
            for (const param in errors) {
                if (errors.hasOwnProperty(param)) {
                    const paramError = errors[param]
                    this.fields[param].error = paramError
                }
            }
        },
        resetForm() {
            for (const param in this.fields) {
                if (this.fields.hasOwnProperty(param)) {
                    this.fields[param].error = ``
                    this.fields[param].value = ``
                }
            }
            return true
        },
    },
}
