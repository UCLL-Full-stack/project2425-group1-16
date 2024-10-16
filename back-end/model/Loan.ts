type LoanState = 'pending' | 'accepted' | 'denied';

class Loan {
    private start: Date;
    private end: Date;
    private state: LoanState;

    private loanedItem: Item;
    private loaner: Profile;

    constructor(p: {
        start: Date,
        end: Date,
        state: LoanState,

        loanedItem: Item;
        loaner: Profile;
    }) {
        this.start = p.start;
        this.end = p.end;
        this.state = p.state;

        this.loanedItem = p.loanedItem;
        this.loaner = p.loaner;
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
}