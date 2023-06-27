import { type Validator } from '@/validations/models'
import { ValidationError } from '@/validations/models/validation-error'
import { ERROR_TYPES } from '@/validations/types'

export class RequiredValidation implements Validator {
  constructor(
    readonly value: unknown,
    readonly property: string,
    readonly message: string = `is required field`,
  ) {}

  validate(): Validator.Error {
    if (!this.value)
      return new ValidationError({
        property: this.property,
        message: `${this.message}`,
        name: ERROR_TYPES.REQUIRED,
      })

    return null
  }
}
