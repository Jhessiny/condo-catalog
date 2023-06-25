import { type Validator } from '../models'

export interface ValidationsCompositor {
  validateValues: () => ValidationsCompositor.Return
}

export namespace ValidationsCompositor {
  export type Return = Validator.Error[] | null
}
