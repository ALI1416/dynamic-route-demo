import {createVNode, render} from 'vue'
import ValidateErrorDialog from '@/components/dialog/ValidateErrorDialog.vue'
import type {ValidateFieldsError} from 'element-plus'
import {ValidateError2Array} from '@/utils/ElementPlusUtil.ts'

export default function useValidateErrorDialog(invalidFields: ValidateFieldsError) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const vnode = createVNode(ValidateErrorDialog, {
    tableData: ValidateError2Array(invalidFields),
    onClose() {
      render(null, container)
      container.remove()
    }
  })

  render(vnode, container)
}
