<template>
    <m-panel class="c-song-search">
        <p>TODO検索フィルタ作成</p>
        <c-button small primary label="新規追加" @c-click="addSongHandler" />
    </m-panel>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
@Component({})
export default class CSongSearch extends Vue {
    @Emit('add-handler')
    addSongHandler() {}
}
</script>

<style lang="stylus"></style>