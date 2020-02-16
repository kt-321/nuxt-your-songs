<template>
    <div class="page-index">
        <div>
            <h1 class="title">Your Songs</h1>
            <h2 class="subtitle">Welcome</h2>
            <nuxt-link to="/user/signin">ログインページへ</nuxt-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class PageIndex extends Vue {
    token = ''
    user5 = ''
    async loadToken() {
        try {
            const token = await this.$store.getters['user/token']
            this.token = token
        } catch (error) {
            console.log('トーク取得失敗')
        }
    }
    mounted() {
        this.loadToken()
    }
}
</script>

<style lang="stylus">
</style>
