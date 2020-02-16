import Vue from 'vue'

import NsPage from '~/components/layout/NsPage.vue'
import NsForm from '~/components/layout/NsForm.vue'

// components/ui
import CButton from '~/components/ui/CButton.vue'
import CTextInput from '~/components/ui/CTextInput.vue'
import CLabel from '~/components/ui/CLabel.vue'
import CLabeledItem from '~/components/ui/CLabeledItem.vue'

Vue.mixin({
    components: {
        // layout
        NsPage,
        NsForm,
        // ui
        CButton,
        CTextInput,
        CLabel,
        CLabeledItem
    }
})

