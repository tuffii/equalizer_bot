type EmailAdress = string

export interface IAdmin {
  readonly Email: {
    readonly Adress: {
      readonly List: Array<EmailAdress>
    }
  }
}
