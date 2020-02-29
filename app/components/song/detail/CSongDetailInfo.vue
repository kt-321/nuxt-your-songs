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
            <c-button
                v-if="song.user_id === $store.getters['user/user'].id"
                small
                block
                label="曲情報を編集"
                @c-click="editButtonHandler"
            />
        </m-card>
    </div>
</template>
<script lang="ts">
import _ from 'lodash'
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ISong } from '~/types/song'
import { newSong } from '~/types/initializer'
import CSongEdit from '~/components/song/CSongEdit.vue'
@Component({
    components: {
        CSongEdit
    }
})
export default class CsongDetailInfo extends Vue {
    @Prop(Object) song!: ISong
    editModalModel: ISong = newSong()
    editModalVisible: boolean = false
    @Emit('edit-handler')
    editButtonHandler() {}
}
</script>
<style lang="stylus">
.c-song-detail-info
    .card-layout
        margin-bottom: 16px
</style>