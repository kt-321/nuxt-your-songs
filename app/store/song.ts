import { GetterTree, ActionTree, MutationTree } from 'vuex'
import moment from 'moment'
import { ISong } from '~/types/song'
export interface State {
    list: Array<ISong>
}
export interface RootState {}
export const state = (): State => ({
    list: []
})
export const mutations: MutationTree<State> = {
    setList(state, list: Array<ISong>) {
        state.list = list
    },
}
export const actions: ActionTree<State, RootState> = {
    setList(context, list: Array<ISong>) {
        context.commit('setList', list)
    },
    async sync(context) {
        // 差し替え用リストを定義
        const newList: Array<ISong> = []
        // 曲リスト取得通信メソッド
        const loadSongs = async (page: number = 1) => {
            try {
                const result = await this.$axios.$get('/api/songs')
                context.commit('setList', result)
            } catch (e) {
                Promise.reject(e)
            }
        }
        await loadSongs()
    },
}
export const getters: GetterTree<State, RootState> = {
    list(state): Array<ISong> {
        return state.list
    },
}