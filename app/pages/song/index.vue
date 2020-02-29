<template>
    <m-page class="page-song-index">
        <c-song-search
            @add-handler="addSongHandler"
        />
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
                @c-song-detail-edit="editButtonHandler"
                @c-song-detail-delete="deleteButtonHandler"
            />
            <div v-else class="song-detail">
                <c-message warning>曲リストから曲を選択してください</c-message>
            </div>
        </m-column>
        <c-song-edit :visible.sync="songModalVisible" :model.sync="songModalModel" @c-song-edit-finished="songEditFinished" />
    </m-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CSongListItem from '~/components/song/CSongListItem.vue'
import CSongDetail from '~/components/song/CSongDetail.vue'
import CSongEdit from '~/components/song/CSongEdit.vue'
import CSongSearch from '~/components/song/CSongSearch.vue'
import { ISong } from '~/types/song'
import { newSong } from '~/types/initializer'
@Component({
    head: {
        titleTemplate: '曲一覧 | %s'
    },
    components: {
        CSongListItem,
        CSongDetail,
        CSongEdit,
        CSongSearch
    }
})
export default class PageSongIndex extends Vue {
    songs: Array<ISong> = []
    // 選択されている顧客
    selectedSong: ISong | null = null
    selectSong(song: ISong | null) {
        this.selectedSong = song
    }
    songModalModel: ISong = newSong()
    songModalVisible: boolean = false
    // 曲を追加
    addSongHandler() {
        this.songModalModel = newSong()
        this.songModalVisible = true
    }
    // 曲を編集
    editButtonHandler() {
        if(this.selectedSong){
            this.songModalModel = _.cloneDeep(this.selectedSong)
            this.songModalVisible = true
        }
    }
    // 削除ボタンハンドラ
    async deleteButtonHandler() {
        if (this.selectedSong) {
            if (confirm(`曲「${this.selectedSong.title}」を削除します。よろしいですか？`)) {
                await this.$axios.$delete(`/api/song/${this.selectedSong.id}`)
                this.selectedSong = null
                this.loadSongs()
            }
        }
    }
    // 曲の編集完了後に曲一覧を再読み込み
    async songEditFinished() {
        this.loadSongs()
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
