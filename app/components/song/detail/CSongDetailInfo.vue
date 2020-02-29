<template>
    <div v-if="song" class="c-song-detail-info">
        <m-card>
            <table class="c-song-list-item-data table no-border">
                <tbody>
                    <tr>
                        <td style="width: 120px">曲名</td>
                        <td style-="width: 120px">
                            <p class="item-header">
                                <strong>{{ song.title }}</strong>
                                <span v-if="song.user_id === $store.getters['user/user'].id" class="tag self">自分の投稿</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>アーティスト</td>
                        <td>{{ song.artist_name }}</td>
                    </tr>
                    <tr>
                        <td>曲の年代</td>
                        <td>{{ song.music_age }}年代</td>
                    </tr>
                    <tr v-if="song.description">
                        <td>曲紹介</td>
                        <td>{{ song.description }}</td>
                    </tr>
                    <tr>
                        <td>投稿日時</td>
                        <td>{{ song.created_at }}</td>
                    </tr>
                    <tr>
                        <td>更新日時</td>
                        <td>{{ song.updated_at }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="song.video_url">
                動画をここに表示TODO
            </div>
        </m-card>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ISong } from '~/types/song'
// import CSongDetailInfo from '~/components/song/detail/CSongDetailInfo.vue'
// import { Isong, IsongCondition } from '~/types/song'
@Component({})
export default class CsongDetailInfo extends Vue {
    @Prop(Object) song!: ISong | null
    // conditionVisible(condition: IsongCondition) {
    //     if (condition) {
    //         if (condition.price.length > 0) {
    //             return true
    //         }
    //         if (condition.use.length > 0) {
    //             return true
    //         }
    //         if (condition.area.trim().length > 0) {
    //             return true
    //         }
    //     }
    //     return false
    // }
}
</script>
<style lang="stylus">
.c-song-detail-info
    .card-layout
        margin-bottom: 16px
    .condition
        td span
            &:after
                content: ','
                padding-right: 8px
            &:last-child:after
                content: ''
</style>