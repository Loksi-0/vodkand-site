export default class UserDto {
    email
    id
    isActivated
    nickname
    hasPass
    activationLink
    sub
    creationDate

    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
        this.nickname = model.nickname
        this.hasPass = model.hasPass
        this.activationLink = model.activationLink
        this.sub = model.sub
        this.creationDate = model.creationDate
    }
}