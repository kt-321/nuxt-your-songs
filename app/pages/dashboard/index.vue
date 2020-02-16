<template>
    <ns-page class="page-dashboard">
        <div>
            <p>ダッシュボード</p>
            {{ user }}
        </div>
    </ns-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    head: {
        titleTemplate: 'ダッシュボード | %s'
    }
})
export default class PageDashboard extends Vue {
    user = ''
    async loadUser() {
        const user = await this.$axios.$get('/api/user')
        console.log(user)
        this.user = user
    }
    mounted() {
        this.loadUser()
    }
}
</script>

<style lang="stylus"></style>
