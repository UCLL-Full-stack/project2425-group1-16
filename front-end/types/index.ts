export type Item = {
    id?: number;
    name: string;
    description: string;
    price: number;
    location: LocationTag;
    owner: Profile;
    categories: Category[];
};

export type LocationTag = {
    displayName: string,
    longitude: number,
    latitude: number,
    id?: number
};

export type Profile = {
    id?: number,
    username: string,
    password: string,
    email: string,
    phoneNumber: string,
    location: LocationTag
};

export type Category = {
    name: string,
    parents: Category[] | null,
    id?: number
};

export type Loan = {
    id?: number,
    start: Date,
    end: Date,
    state: LoanState,
    loanedItem: Item;
    loaner: Profile;
};

export type TokenObj = {
    token: string,
    userId: number,
    role: Role
};


export type Role = 'USER' | 'ADMIN' | 'SUPERADMIN'

export type LoanState = 'PENDING' | 'ACCEPTED' | 'DENIED';

export type LoadedPage = 'HOME_PAGE' | 'PROFILE_OVERVIEW' | 'ITEM_OVERVIEW' | 'OWNED_ITEMS';