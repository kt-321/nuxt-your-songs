import { GetterTree, ActionTree, MutationTree } from 'vuex'
import moment from 'moment'
import { ILoginUser } from '~/types/user'
export interface State {
    token: string | null
    isGuest: boolean
    user: ILoginUser | null
}
export interface RootState {}
export const state = (): State => ({
    token: null,
    isGuest: true,
    user: null
})
export const mutations: MutationTree<State> = {
    setToken(state, token: string) {
        state.token = token
    },
    setUser(state, user: ILoginUser | null) {
        if (user !== null) {
            state.isGuest = false
            state.user = user
        } else {
            state.isGuest = true
            state.user = null
        }
    }
}
export const actions: ActionTree<State, RootState> = {
    // アクセストークンを保存
    setToken(context, token) {
        context.commit('setToken', token)
    },
    setUser(context, user) {
        // store保存
        context.commit('setUser', user)
    },
    async signoutUser(context) {
        try {
            // cookie保存
            // @ts-ignore
            this.$cookies.remove('__cred__', {
                path: '/'
            })
            // store保存
            context.commit('setUser', null)
        } catch (e) {
            return Promise.reject(e)
        }
    },
}
export const getters: GetterTree<State, RootState> = {
    token(state) {
        return state.token
    },
    isGuest(state) {
        return state.isGuest
    },
    name(state) {
        if (state.user) {
            return state.user.name
        } else {
            return null
        }
    },
    user(state): ILoginUser | null {
        return state.user
    },
}