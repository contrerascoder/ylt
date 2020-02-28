<template>
  <p v-html="htmlRendered" />
</template>
<script>
const transforms = {
    study: {
        B(el) {
            const span = document.createElement(`span`)
            span.innerText = el.innerText
            span.classList.add(`wb`)
            span.classList.add(`b`)
            return span
        },
    },
    exam: {
        B(el) {
            const input = document.createElement(`input`)
            input.type = `text`
            input.setAttribute(`data-response`, el.innerText)
            input.classList.add(`wb`)
            const val = Math.random()
            if (val > 0.4) {
                input.setAttribute(`value`, el.innerText)
            }
            return input
        },
    },
}

function getParagraphRendered(text, mode = `study`) {
    const p = document.createElement(`p`)
    p.innerHTML = text
    const bs = p.querySelectorAll(`b`)
    for (let index = 0; index < bs.length; index++) {
        const b = bs[index]
        const fn = transforms[mode][b.localName.toUpperCase()]
        p.replaceChild(fn(b), b)
    }
    return p.innerHTML
}

export default {
    props: {
        content: {
            type: Object,
            default: () => ({}),
        },
        mode: {
            type: String,
            default: `study`,
        },
    },
    computed: {
        htmlRendered() {
            return getParagraphRendered(this.content.text, this.mode)
        },
    },

}
</script>
<style lang="scss">
p {
    margin: 10px 0px;
    input {
        border: 0px;
        border-bottom: 1px dotted;
        outline: none;
        &.error {
            color: tomato;
            font-weight: bold;
        }
    }
    .wb {
        &.b {
            user-select: none;
            font-weight: bold;
            color: rgba(255, 255, 255, 0);
            text-decoration: underline;
            text-decoration-color: tomato;
            transition: all .3s;
            &.active {
                opacity: 1;
                color: tomato;
            }
        }
    }
}
</style>
