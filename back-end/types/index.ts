export type Role = 'USER' | 'ADMIN' | 'SUPERADMIN';
export type LoanState = 'PENDING' | 'ACCEPTED' | 'DENIED';

export type AuthenticationResponse = {
    token: string,
    userId: number,
    role: Role
};

export type LocationTagInput = {
    id?: number 
    displayName: string,
    longitude: number,
    latitude: number,
};

export type CategoryInput = {
    id?: number 
    name: string,
    parents: CategoryInput[],
    children: CategoryInput[],
};

export type ProfileInput = {
    id?: number,
    username: string,
    password: string,
    email: string,
    phoneNumber: string,
    role: Role,
    locationTag: LocationTagInput,
};

export type LoginInput = {
    email: string,
    password: string,
}

export type ItemAddInput = {
    name: string,
    description: string,
    price: number,
    locationTag: LocationTagInput,
    categories: CategoryInput[],
    ownerId: number,
}

export type ItemInput = {
    id?: number,
    name: string,
    description: string,
    price: number,
    locationTag: LocationTagInput,
    owner: ProfileInput,
    categories: CategoryInput[],
}

export type LoanInput = {
    id?: number,
    start: Date,
    end: Date,
    state: LoanState,
    loanedItem: ItemInput;
    loaner: ProfileInput;
};