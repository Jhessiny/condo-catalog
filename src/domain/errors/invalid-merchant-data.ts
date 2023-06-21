export class InvalidMerchantDataError extends Error {
  public readonly name = 'InvalidMerchantDataError'
  constructor() {
    super('Invalid data')
  }
}
