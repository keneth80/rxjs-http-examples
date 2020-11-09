export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}

export class UserModel {
    userId: number;

    name: string;

    userName: string;

    email: string;

    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    };

    phone: string;
    
    website: string;
    
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
    
    constructor(
        userId: number,
        name: string,
        userName: string,
        email: string,
        address: {
            street: string,
            suite: string,
            city: string,
            zipcode: string,
            geo: {
                lat: string,
                lng: string
            }
        },
        phone: string,
        website: string,
        company: {
            name: string,
            catchPhrase: string,
            bs: string
        }
    ) {
        Object.assign(this, {
            userId,
            name,
            userName,
            email,
            address,
            phone,
            website,
            company
        });
    }

    static clone(value: UserModel) {
        return new UserModel(
            value.userId,
            value.name,
            value.userName,
            value.email,
            {...value.address},
            value.phone,
            value.website,
            {...value.company});
    }
}