export default class UserDto {
    email
    id
    isActivated
    nickname
    hasPass
    activationLink

    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
        this.nickname = model.nickname
        this.hasPass = model.hasPass
        this.activationLink = model.activationLink
    }
}