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
        this.timer = setTimeout(() => {
            this.$router.push(this.url)
        }, this.ms)
    },
    beforeDestroy() {
        clearTimeout(this.timer)
    },
}
</script>
