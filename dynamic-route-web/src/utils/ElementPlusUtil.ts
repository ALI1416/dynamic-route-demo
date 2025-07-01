/**
 * element-plus工具
 */

import type {ValidateFieldsError} from 'element-plus'

/**
 * 校验错误消息转数组
 */
function ValidateError2Array(invalidFields: ValidateFieldsError) {
  let errorArray: string[] = []
  for (let invalidFieldsKey in invalidFields) {
    let validateErrors = invalidFields[invalidFieldsKey]
    for (let validateError of validateErrors) {
      errorArray.push(validateError.message)
    }
  }
  return errorArray
}

export {
  ValidateError2Array,
}
