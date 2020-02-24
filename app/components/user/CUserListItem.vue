<template>
    <li v-if="user" class="c-user-list-item">
        <ns-column center>
            <div class="c-user-list-item-photo">
                <img v-if="user.image_url" :src="user.image_url" />
                <img v-else src="/img/user-icon.png" />
            </div>
            <table class="c-user-list-item-data table no-border">
                <tbody>
                    <tr>
                        <th>名前</th>
                        <td>{{ user.name }}</td>
                    </tr>
                    <tr v-if="user.age">
                        <th>年齢</th>
                        <td>{{ user.age }}代</td>
                    </tr>
                    <tr v-if="user.gender">
                        <th>性別</th>
                        <td>{{ user.gender | genderFormat}}</td>
                    </tr>
                    <tr v-if="user.favorite_music_age">
                        <th>好きな音楽の年代</th>
                        <td>{{ user.favorite_music_age }}年代</td>
                    </tr>
                    <tr v-if="user.favorite_artist">
                        <th>好きなアーティスト</th>
                        <td>{{ user.favorite_artist }}</td>
                    </tr>
                    <tr v-if="user.comment">
                        <th>コメント</th>
                        <td>{{ user.comment }}</td>
                    </tr>
                </tbody>
            </table>
        </ns-column>
    </li>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ILoginUser } from '~/types/user'
@Component({
    filters: {
        genderFormat: (gender) => {
            if (gender === 1) {
                return '男性'
            } else if (gender === 2) {
                return '女性'
            } else {
                return '-'
            }
        }
    }
})
export default class CUserListItem extends Vue {
    @Prop(Object) user!: ILoginUser
}
</script>

<style lang="stylus">
.c-user-list-item
    padding: 8px 4px
    border-bottom: 1px solid #ddd
    cursor: pointer
    .c-user-list-item-photo
        flex: 0 0 200px !important
        height: 200px
        background-color: #eee
        margin-right: 8px
        img
            width: 100%
    .c-user-list-item-data
        flex: 1 1 auto !important
        tr:first-child
            th, td strong
                font-weight: bold
                font-size: 14px
            td
                .item-header
                    display: flex
                    justify-content: space-between
                    .tags
                        text-align: right
                        .tag
                            margin-left: 8px
</style>