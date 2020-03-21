<template>
    <m-page class="page-signin" title="ログイン">
        <div>
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
@Component({
    head: {
        titleTemplate: 'ログイン | %s'
    }
})
export default class PageSignin extends Vue {
    username=''
    password=''

    async login() {
        const postData = {
            'grant_type': 'password',
            'client_id': '2',
            'client_secret': '7sEUwTdsRURaotxx7snw7YWYw4IGJuQ5Ez7EinDa',
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

    mounted() {
        if(!this.$store.getters['user/isGuest']) {
            this.$router.replace('/dashboard')
        }
    }
}
</script>

<style lang="stylus"></style>
