<template>
    <m-page class="page-song-index">
        <m-column>
            <ul class="song-list">
                <li v-if="songs.length > 0">
                    全曲数: {{ songs.length }}曲
                </li>
                <li v-else>
                    <c-message warning>曲が見つかりませんでした</c-message>
                </li>
                <c-song-list-item v-for="song in songs" :key="song.id" :class="{ selected: selectedSong && song.id === selectedSong.id }"
                    :song="song" @c-select="selectSong(song)" />
            </ul>
            <!-- 曲詳細 -->
            <c-song-detail
                v-if="selectedSong"
                class="song-detail"
                :song="selectedSong"
            />
            <div v-else class="song-detail">
                <c-message warning>曲リストから曲を選択してください</c-message>
            </div>
        </m-column>
    </m-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CSongListItem from '~/components/song/CSongListItem.vue'
import CSongDetail from '~/components/song/CSongDetail.vue'
import { ISong } from '~/types/song'
@Component({
    head: {
        titleTemplate: '曲一覧 | %s'
    },
    components: {
        CSongListItem,
        CSongDetail
    }
})
export default class PageSongIndex extends Vue {
    songs: Array<ISong> = []
    // 選択されている顧客
    selectedSong: ISong | null = null
    selectSong(song: ISong | null) {
        this.selectedSong = song
    }
    // 曲一覧を読み込み
    async loadSongs() {
        await this.$store.dispatch('song/sync')
        this.songs = await this.$store.getters['song/list']
        this.selectedSong = this.$store.getters['song/find'](this.selectedSong)
    }
    mounted () {
        if(this.$store.getters['user/isGuest']) {
            this.$router.replace('/user/signin')
        }
        this.loadSongs()
    }
}
</script>

<style lang="stylus">
.page-song-index
    .song-list
        flex: 0 0 480px !important
    .song-detail
        flex: 1 1 auto
        position: fixed
        right: 30px
</style>
