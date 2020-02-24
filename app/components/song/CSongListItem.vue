<template>
    <li v-if="song" class="c-song-list-item">
        <ns-column center>
            <div class="c-song-list-item-photo">
                <img v-if="song.image_url" :src="song.image_url" />
                <img v-else src="/img/song-icon.jpeg" />
            </div>
            <table class="c-song-list-item-data table no-border">
                <tbody>
                    <tr>
                        <th>曲名</th>
                        <td>
                            <p class="item-header">
                                <strong>{{ song.title }}</strong>
                                <span class="tags">
                                    <span v-if="song.video_url" class="tag">映像あり</span>
                                </span>
                            </p>
                        </td>
                    </tr>
                    <tr v-if="song.artist_name">
                        <th>アーティスト</th>
                        <td>{{ song.artist_name }}</td>
                    </tr>
                    <tr v-if="song.music_age">
                        <th>曲の年代</th>
                        <td>{{ song.music_age }}年代</td>
                    </tr>
                    <tr v-if="song.description">
                        <th>曲紹介</th>
                        <td>{{ song.description }}</td>
                    </tr>
                    <tr>
                        <th>映像</th>
                        <td v-if="song.video_url">あり</td>
                        <td v-else>なし</td>
                    </tr>
                </tbody>
            </table>
        </ns-column>
    </li>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ISong } from '~/types/song'
@Component({})
export default class CSongListItem extends Vue {
    @Prop(Object) song!: ISong
}
</script>

<style lang="stylus">
.c-song-list-item
    padding: 8px 4px
    border-bottom: 1px solid #ddd
    cursor: pointer
    .c-song-list-item-photo
        flex: 0 0 200px !important
        height: 200px
        position: relative
        background-color: #eee
        margin-right: 8px
        img
            width: 100%
        .button
            position: absolute
            right: 8px
            bottom: 8px
    .c-song-list-item-data
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