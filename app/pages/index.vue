<template>
    <div class="page-index">
        <div>
            <h1 class="title">Your Songs</h1>
            <h2 class="subtitle">Welcome</h2>
            <nuxt-link to="/user/signin">ログインページへ</nuxt-link>
            <nuxt-link to="/signup">ユーザー登録ページへ</nuxt-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class PageIndex extends Vue {
    mounted () {
        if(!this.$store.getters['user/isGuest']) {
            this.$router.replace('/dashboard')
        }
    }
}
</script>

<style lang="stylus">
</style>
