<template>
    <ns-page class="page-signup" title="ユーザー登録">
        <div>
            <div>
                <label>お名前</label>
                <input v-model="form.name" type="text" />
            </div>
            <div>
                <label>Email</label>
                <input v-model="form.email" type="text" />
            </div>
            <div>
                <label>パスワード</label>
                <input v-model="form.password" type="password" />
            </div>
            <div>
                <label>パスワード（確認用）</label>
                <input v-model="form.password_confirmation" type="password" />
            </div>
            <button @click="signup">上記の内容で登録</button>
        </div>        
    </ns-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
    head: {
        titleTemplate: 'ユーザー登録 | %s'
    }
})
export default class PageSignup extends Vue {
    form = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    async signup() {
        const response = await this.$axios.$post('/api/signup', this.form).catch((e) => {
                console.log('ユーザー登録失敗')
        })
        // クッキーにアクセストークンを保存
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