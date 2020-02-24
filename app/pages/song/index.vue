<template>
    <ns-page class="page-song-index">
        <ul class="song-list">
            <li v-if="songs.length > 0">
                全曲数: {{ songs.length }}曲
            </li>
            <li v-else>
                <c-message warning>曲が見つかりませんでした</c-message>
            </li>
            <c-song-list-item v-for="song in songs" :key="song.id" :song="song" />
        </ul>
    </ns-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CSongListItem from '~/components/song/CSongListItem.vue'
import { ISong } from '~/types/song'
@Component({
    head: {
        titleTemplate: '曲一覧 | %s'
    },
    components: {
        CSongListItem
    }
})
export default class PageSongIndex extends Vue {
    songs: Array<ISong> = []
    // 曲一覧を読み込み
    async loadSongs() {
        await this.$store.dispatch('song/sync')
        this.songs = await this.$store.getters['song/list']
    }
    mounted () {
        if(this.$store.getters['user/isGuest']) {
            this.$router.replace('/user/signin')
        }
        this.loadSongs()
    }
}
</script>

<style lang="stylus"></style>
