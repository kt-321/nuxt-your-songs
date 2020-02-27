<template>
    <div v-if="song" class="c-song-detail">
        <ns-card title="曲詳細">
            <table class="c-song-list-item-data table no-border">
                <tbody>
                    <tr>
                        <th style="width: 100px">曲名</th>
                        <td>
                            <p class="item-header">
                                <strong>{{ song.title }}</strong>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th>アーティスト</th>
                        <td>{{ song.artist_name }}</td>
                    </tr>
                    <tr>
                        <th>曲の年代</th>
                        <td>{{ song.music_age }}年代</td>
                    </tr>
                    <tr v-if="song.description">
                        <th>曲紹介</th>
                        <td>{{ song.description }}</td>
                    </tr>
                    <tr>
                        <th>投稿日時</th>
                        <td>{{ song.created_at }}</td>
                    </tr>
                    <tr>
                        <th>更新日時</th>
                        <td>{{ song.updated_at }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-if="song.video_url">
                動画をここに表示TODO
            </div>
        </ns-card>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ISong } from '~/types/song'
@Component({
    components: {
    }
})
export default class CSongDetail extends Vue {
    @Prop(Object) song!: ISong
}
</script>
<style lang="stylus">
</style>