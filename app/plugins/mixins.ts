import Vue from 'vue'

import NsPage from '~/components/layout/NsPage.vue'
import NsForm from '~/components/layout/NsForm.vue'
import NsColumn from '~/components/layout/NsColumn.vue'
import NsModal from '~/components/layout/NsModal.vue'

// components/ui
import CButton from '~/components/ui/CButton.vue'
import CTextInput from '~/components/ui/CTextInput.vue'
import CLabel from '~/components/ui/CLabel.vue'
import CLabeledItem from '~/components/ui/CLabeledItem.vue'
import CDropdown from '~/components/ui/CDropdown.vue'
import CMessage from '~/components/ui/CMessage.vue'

Vue.mixin({
    components: {
        // layout
        NsPage,
        NsForm,
        NsColumn,
        NsModal,
        // ui
        CButton,
        CTextInput,
        CLabel,
        CLabeledItem,
        CDropdown,
        CMessage
    }
})
