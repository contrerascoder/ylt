<template>
  <div />
</template>

<script>
export default {
    props: {
        url: {
            type: String,
            default: `/`,
        },
        ms: {
            type: Number,
            default: 2000,
        },
    },
    data() {
        return {
            timer: null,
        }
    },
    mounted() {
        console.log(`redirecting`)

        this.timer = setTimeout(() => {
            this.$router.push(this.url)
        }, this.ms)
    },
    beforeDestroy() {
        console.log(`destruyendo timer`)

        clearTimeout(this.timer)
    },
}
</script>
