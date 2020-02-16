<template>
    <header>
        <div class="header-wrapper">
            <nuxt-link class="site-title" to="/">
                Your Song
                <button @click="signout">ログアウト</button>
            </nuxt-link>
        </div>
    </header>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class SiteHeader extends Vue {
    // ホームURLの振り分け
    homeUrl(): string {
        // ゲストの場合は /
        if (this.$store.getters['user/isGuest']) {
            return '/'
        }
        // ゲストでない場合は /dashboard
        else {
            return '/dashboard'
        }
    }
    async signout() {
        if (confirm('ログアウトします。よろしいですか？')) {
            // ログアウト処理
            await this.$store.dispatch('user/signoutUser')
            // トップページにリダイレクト
            this.$router.replace('/')
        }
    }
}
</script>

<style lang="stylus">
header
    padding: 12px 0
    background-color: #333
    color: #fff
    border-bottom: 1px solid #d8d8d8;
    box-shadow: 0 0 12px 2px rgba(230, 230, 230, 0.2);
    .header-wrapper
        max-width: $wide-width
        margin: 0 auto
        display: flex
        padding: 0 16px
        justify-content: space-between
        .site-title
            flex: 0 0 130px !important
            display: block
            margin: 0
            padding: 0
            img
                width: 100%
        .menu-wrapper
            flex: 1 1 auto
            display: flex
            justify-content: space-between
            .menu
                display: flex
                flex: 1 1 auto
                align-items: center
                &.start
                    padding-left: 36px
                    justify-content: flex-start
                &.end
                    justify-content: flex-end
                margin: 0
                padding: 0
                list-style: none
                > li
                    position: relative
                    margin: 0 4px
                    padding: 0
                    a, span
                        display: block
                        padding: 2px 6px
                        font-weight: 500
                        color: #fff
                    a
                        cursor: pointer
                        &:hover
                            color: #fff
                    &.divider:after
                        content: '|'
                        color: $dark-bg-color
                        margin: 0 4px
                    &:last-child
                        margin-left: 8px
                    &.team
                        span
                            display: inline
</style>