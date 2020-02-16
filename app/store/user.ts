import { GetterTree, ActionTree, MutationTree } from 'vuex'
export interface State {
    isGuest: boolean
}
export interface RootState {}
export const state = (): State => ({
    isGuest: true
})
export const mutations: MutationTree<State> = {
    changeLoginStatus(state, isGuest: boolean) {
        if (isGuest == false) {
            // ログイン中状態に
            state.isGuest = false
        } else {
            // 未ログイン状態に
            state.isGuest = true
        }
    },
}
export const actions: ActionTree<State, RootState> = {
    async signinUser(context) {
        try {
            context.commit('changeLoginStatus', true)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    async signoutUser(context) {
        try {
            // cookie保存
            this.$cookies.remove('__cred__', {
                path: '/'
            })
            // store保存
            context.commit('changeLoginStatus', false)
        } catch (e) {
            return Promise.reject(e)
        }
    },
}
export const getters: GetterTree<State, RootState> = {
    isGuest(state) {
        return state.isGuest
    },
}