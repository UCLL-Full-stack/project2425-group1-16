import { LoanState } from "../types";
import { Item } from "./item";
import { Profile } from "./profile";

import { 
    Loan as LoanPrisma,
    Profile as ProfilePrisma,
    Item as ItemPrisma,
    LocationTag as LocationTagPrisma,
    Category as CategoryPrisma
} from '@prisma/client';


export class Loan {
    private id?: number
    private start: Date;
    private end: Date;
    private state: LoanState;

    private loanedItem: Item;
    private loaner: Profile;

    constructor({ id, start, end, state, loanedItem, loaner }
    : {
        id?: number,
        start: Date,
        end: Date,
        state: LoanState,

        loanedItem: Item;
        loaner: Profile;
    }) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.state = state;

        this.loanedItem = loanedItem;
        this.loaner = loaner;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getStart(): Date {
        return this.start;
    }

    public setStart(start: Date) {
        this.start = start;
    }

    public getEnd(): Date {
        return this.end;
    }

    public setEnd(end: Date) {
        this.end = end;
    }

    public getState(): LoanState {
        return this.state;
    }

    public setState(state: LoanState) {
        this.state = state;
    }

    public getLoanedItem(): Item {
        return this.loanedItem;
    }

    public setLoanedItem(loanedItem: Item) {
        this.loanedItem = loanedItem;
    }

    public getLoaner(): Profile {
        return this.loaner;
    }

    public setLoaner(loaner: Profile) {
        this.loaner = loaner;
    }

    public equals(other: Loan): boolean {
        return (
            this.id === other.getId() &&
            this.start === other.getStart() &&
            this.end === other.getEnd() &&
            this.state === other.getState() &&
            this.loanedItem === other.getLoanedItem() &&
            this.loaner === other.getLoaner()
        );
    }

    static from(
        { id, start, end, state, loaner, loanedItem }
        : LoanPrisma & {
            loaner: ProfilePrisma & { locationTag: LocationTagPrisma },
            loanedItem: ItemPrisma & {
                owner: ProfilePrisma & { locationTag: LocationTagPrisma },
                locationTag: LocationTagPrisma,
                categories: CategoryPrisma[]
            },
        }) {
        return new Loan({
            id, 
            start,
            end,
            state,
            loaner: Profile.from(loaner),
            loanedItem: Item.from(loanedItem)
        });
    }
}