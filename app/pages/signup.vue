<template>
    <m-page class="page-signup" title="ユーザー登録">
        <div>
            <c-error :errors.sync="errors" />
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
    </m-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ApplicationError, BadRequest } from '~/types/error'
@Component({
    head: {
        titleTemplate: 'ユーザー登録 | %s'
    }
})
export default class PageSignup extends Vue {
    errors: Array<ApplicationError> = []
    form = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    async signup() {
        try {
            this.errors = []
            // バリデーション
            if (this.form.name.length === 0) {
                this.errors.push(new BadRequest('名前が入力されていません'))
            }
            if (this.form.email.length === 0) {
                this.errors.push(new BadRequest('メールアドレスが入力されていません'))
            }
            if (this.form.password.length === 0) {
                this.errors.push(new BadRequest('パスワードが入力されていません'))
            }
            if (this.form.password_confirmation.length === 0) {
                this.errors.push(new BadRequest('パスワード（確認）が入力されていません'))
            }
            if (this.errors.length === 0) {
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