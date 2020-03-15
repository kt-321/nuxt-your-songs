<template>
    <m-page class="page-mypage">
        <m-column>
            <m-form v-if="profileModel" title="プロフィール設定" bordered>
                <c-message v-if="profileUpdated" success>プロフィールを変更しました</c-message>
                <c-error :errors.sync="profileErrors" />
                <c-labeled-item label="名前">
                    <c-text-input :model.sync="profileModel.name" />
                </c-labeled-item>
                <c-labeled-item label="メールアドレス">
                    <c-text-input :model.sync="profileModel.email" />
                </c-labeled-item>
                <c-labeled-item label="年齢">
                    <c-dropdown :model.sync="profileModel.age" :items="ageItems" data-value="value" />
                </c-labeled-item>
                <c-labeled-item label="性別">
                    <c-dropdown :model.sync="profileModel.gender"  :items="genderItems" data-value="value" />
                </c-labeled-item>
                <c-labeled-item label="好きな音楽の年代">
                    <c-dropdown :model.sync="profileModel.favorite_music_age"  :items="musicAgeItems" data-value="value" />
                </c-labeled-item>
                <c-labeled-item label="好きなアーティスト">
                    <c-text-input :model.sync="profileModel.favorite_artist" />
                </c-labeled-item>
                <c-labeled-item label="自己紹介（150文字以内）">
                    <c-text-input :model.sync="profileModel.comment" multiline />
                </c-labeled-item>
                <c-labeled-item>
                    <c-button small primary label="保存" @c-click="saveProfileHandler()" />
                </c-labeled-item>
            </m-form>
            <div>投稿してる曲などをここに表示</div>
        </m-column>
    </m-page>
</template>
<script lang="ts">
import _ from 'lodash'
import { Component, Vue } from 'vue-property-decorator'
import { ApplicationError, BadRequest } from '~/types/error'
import { ILoginUser } from '~/types/user'
@Component({
    head: {
        titleTemplate: 'マイページ | %s'
    },
})
export default class PageMypage extends Vue {
    profileModel: ILoginUser | null = null
    profileErrors: Array<ApplicationError> = []
    profileUpdated: boolean = false
    genderItems = [
        { label: '男性', value: '1' },
        { label: '女性', value: '2' }
    ]
    ageItems = [
        { label: '10代', value: '10' },
        { label: '20代', value: '20' },
        { label: '30代', value: '30' },
        { label: '40代', value: '40' },
        { label: '50代', value: '50' },
        { label: '60代', value: '60' },
        { label: '70代', value: '70' },
    ]
    musicAgeItems = [
        { label: '1970年代', value: '1970' },
        { label: '1980年代', value: '1980' },
        { label: '1990年代', value: '1990' },
        { label: '2000年代', value: '2000' },
        { label: '2010年代', value: '2010' }
    ]
    async saveProfileHandler() {
        try {
            this.profileUpdated = false
            if (!this.profileModel) {
                throw new BadRequest('プロフィール情報が取得できませんでした')
            }
            if (this.profileModel.name.trim().length === 0) {
                throw new BadRequest('氏名が入力されていません')
            }
            if (this.profileModel.email.trim().length === 0) {
                throw new BadRequest('メールアドレスが入力されていません')
            }
            const user = await this.$axios.$put(`api/user/update/${this.profileModel.id}`, this.profileModel)
            this.$store.dispatch('user/setUser', user)
            this.profileUpdated = true
        } catch (e) {
            this.profileErrors.push(e)
        }
    }
    mounted() {
        this.profileModel = _.cloneDeep(this.$store.getters['user/user'])
    }
}
</script>
<style lang="stylus">
.page-mypage
    .heading
        position: relative
        border-bottom: 1px solid $light-border-color
</style>