<template>
    <m-page class="page-signin" title="ログイン">
        <div>
            <c-error :errors.sync="errors" />
            <div>
                <label>Email</label>
                <input v-model="username" type="text" />
            </div>
            <div>
                <label>パスワード</label>
                <input v-model="password" type="password" />
            </div>
            <button @click="login">ログイン</button>
        </div>        
    </m-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ApplicationError, BadRequest } from '~/types/error'

@Component({
    head: {
        titleTemplate: 'ログイン | %s'
    }
})
export default class PageSignin extends Vue {
    errors: Array<ApplicationError> = []
    username=''
    password=''

    async login() {
        try {
            this.errors = []
            // バリデーション
            if (this.username.length === 0) {
                this.errors.push(new BadRequest('メールアドレスが入力されていません'))
            }
            if (this.password.length === 0) {
                this.errors.push(new BadRequest('パスワードが入力されていません'))
            }
            if (this.errors.length === 0) {
                const postData = {
                    'grant_type': 'password',
                    'client_id': '6',
                    'client_secret': 'hqsU5vHqXaVVH85MdhZORkosxNCkeF3NURJkLwMp',
                    'username': this.username,
                    'password': this.password,
                    'scope': '',
                }
                const response = await this.$axios.$post('/oauth/token', postData).catch((e) => {
                        console.log('アクセストークン取得失敗')
                })
                this.$cookies.set('__cred__', response.access_token, {
                    path: '/',
                })
                // ダッシュボードに遷移
                this.$router.replace('/dashboard')
            }
        } catch (e) {
            this.errors.push(e)
        }
    }

    mounted() {
        if(!this.$store.getters['user/isGuest']) {
            this.$router.replace('/dashboard')
        }
    }
}
</script>

<style lang="stylus"></style>