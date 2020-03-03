<template>
    <div v-if="song" class="c-song-detail">
        <div>
            <div class="heading">
                <ul class="tabs">
                    <li v-for="(tab, index) in tabs" :key="index" class="tab" :class="{ active: selectedTab === tab.key }" @click="selectedTab = tab.key">
                        {{ tab.label }}
                    </li>
                </ul>
            </div>
            <c-song-detail-info
                v-if="selectedTab === 0"
                :song="song"
                class="tab-content"
                @edit-handler="editButtonHandler"
                @delete-handler="deleteButtonHandler"
                @bookmark-handler="bookmarkButtonHandler"
                @remove-bookmark-handler="removeBookmarkButtonHandler"
            />
            <c-song-detail-contributor
                v-if="selectedTab === 1"
                :song="song"
                class="tab-content"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ISong } from '~/types/song'
import { newSong } from '~/types/initializer'
import CSongDetailInfo from '~/components/song/detail/CSongDetailInfo.vue'
import CSongDetailContributor from '~/components/song/detail/CSongDetailContributor.vue'
import CSongEdit from '~/components/song/CSongEdit.vue'
@Component({
    components: {
        CSongDetailInfo,
        CSongDetailContributor,
        CSongEdit
    }
})
export default class CSongDetail extends Vue {
    @Prop(Object) song!: ISong
    // タブ
    selectedTab: number = 0
    tabs: Array<any> = [
        { label: '曲情報', key: 0 },
        { label: '投稿者', key: 1 }
    ]
    editModalModel: ISong = newSong()
    editModalVisible: boolean = false
    
    @Emit('c-song-detail-edit')
    editButtonHandler() {}
    
    @Emit('c-song-detail-delete')
    deleteButtonHandler() {}

    @Emit('c-song-detail-bookmark')
    bookmarkButtonHandler() {}

    @Emit('c-song-detail-remove-bookmark')
    removeBookmarkButtonHandler() {}
}
</script>
<style lang="stylus">
</style>