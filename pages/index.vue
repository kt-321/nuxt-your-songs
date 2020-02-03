<template>
    <div class="page-index">
        <div>
            <logo />
            <h1 class="title">Your Songs</h1>
            <h2 class="subtitle">Welcome</h2>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Logo from '~/components/Logo.vue'

@Component({
    components: {
        Logo
    }
})
export default class PageIndex extends Vue {}
</script>

<style lang="stylus">
.container {
    margin: 0 auto
    min-height: 100vh
    display: flex
    justify-content: center
    align-items: center
    text-align: center
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif
    display: block
    font-weight: 300
    font-size: 100px
    color: #35495e
    letter-spacing: 1px
}

.subtitle
    font-weight: 300
    font-size: 42px
    color: #526488
    word-spacing: 5px
    padding-bottom: 15px

.links
    padding-top: 15px
</style>
