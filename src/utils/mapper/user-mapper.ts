import { User, UserModel } from "../model/user-model";

export const userModelMapper = (user: User): UserModel => {
    return UserModel.clone(
        {
            userId: user.id,
            name: user.name,
            userName: user.username,
            email: user.email,
            address: user.address,
            phone: user.phone,
            website: user.website,
            company: user.company
        }
    )
}