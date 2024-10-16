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
}