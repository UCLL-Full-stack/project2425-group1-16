import { Loan } from '../../model/loan';
import { Item } from '../../model/item';
import { Profile } from '../../model/profile';
import { LocationTag } from '../../model/locationTag';
import { Category } from '../../model/category';

describe('Loan', () => {
    let loanedItem: Item;
    let loaner: Profile;

    beforeEach(() => {
        loanedItem = new Item({
            id: 1,
            name: 'Item Name',
            description: 'This is a valid description.',
            price: 100,
            locationTag: new LocationTag({ displayName: 'Location', longitude: 0.324, latitude: -5.4 }),
            owner: new Profile({
                username: 'Owner',
                email: 'owner@example.com',
                password: 'Password123%',
                phoneNumber: '1234567890',
                role: 'USER',
                locationTag: new LocationTag({ displayName: 'Location', longitude: 0.324, latitude: -5.4}),
            }),
            categories: [new Category({ id: 1, name: 'Category' })]
        });

        loaner = new Profile({
            id: 1,
            username: 'Loaner',
            email: 'loaner@example.com',
            password: 'Password123%',
            phoneNumber: '123456789',
            role: 'USER',
            locationTag: new LocationTag({ displayName: 'Location', longitude: 0.324, latitude: -5.4})
        });
    });

    it('should create a loan with valid properties', () => {
        const loan = new Loan({
            start: new Date('2023-01-01'),
            end: new Date('2023-01-10'),
            state: 'ACCEPTED',
            loanedItem,
            loaner
        });

        expect(loan.getStart()).toEqual(new Date('2023-01-01'));
        expect(loan.getEnd()).toEqual(new Date('2023-01-10'));
        expect(loan.getState()).toBe('ACCEPTED');
        expect(loan.getLoanedItem()).toBe(loanedItem);
        expect(loan.getLoaner()).toBe(loaner);
    });

    it('should throw an error if start date is after end date', () => {
        expect(() => new Loan({
            start: new Date('2023-01-10'),
            end: new Date('2023-01-01'),
            state: 'ACCEPTED',
            loanedItem,
            loaner
        })).toThrow('The start date must be before the end date.');
    });

    it('should set and get start date correctly', () => {
        const loan = new Loan({
            start: new Date('2023-01-01'),
            end: new Date('2023-01-10'),
            state: 'ACCEPTED',
            loanedItem,
            loaner
        });

        loan.setStart(new Date('2023-01-05'));
        expect(loan.getStart()).toEqual(new Date('2023-01-05'));
    });

    it('should set and get end date correctly', () => {
        const loan = new Loan({
            start: new Date('2023-01-01'),
            end: new Date('2023-01-10'),
            state: 'ACCEPTED',
            loanedItem,
            loaner
        });

        loan.setEnd(new Date('2023-01-15'));
        expect(loan.getEnd()).toEqual(new Date('2023-01-15'));
    });

    it('should set and get state correctly', () => {
        const loan = new Loan({
            start: new Date('2023-01-01'),
            end: new Date('2023-01-10'),
            state: 'PENDING',
            loanedItem,
            loaner
        });

        loan.setState('ACCEPTED');
        expect(loan.getState()).toBe('ACCEPTED');
    });

    it('should set and get loaned item correctly', () => {
        const loan = new Loan({
            start: new Date('2023-01-01'),
            end: new Date('2023-01-10'),
            state: 'ACCEPTED',
            loanedItem,
            loaner
        });

        const newLoanedItem = new Item({
            id: 2,
            name: 'New Item',
            description: 'This is another valid description.',
            price: 200,
            locationTag: new LocationTag({ displayName: 'New Location', longitude: 0.324, latitude: -5.4 }),
            owner: new Profile({
                username: 'New Owner',
                email: 'newowner@example.com',
                password: 'Password123%',
                phoneNumber: '123456789',
                role: 'USER',
                locationTag: new LocationTag({
                    displayName: 'New Location',
                    longitude: 0.324,
                    latitude: -5.4
                })
            }),
            categories: [new Category({ id: 2, name: 'New Category' })]
        });

        loan.setLoanedItem(newLoanedItem);
        expect(loan.getLoanedItem()).toBe(newLoanedItem);
    });

    it('should set and get loaner correctly', () => {
        const loan = new Loan({
            start: new Date('2023-01-01'),
            end: new Date('2023-01-10'),
            state: 'ACCEPTED',
            loanedItem,
            loaner
        });

        const newLoaner = new Profile({
            id: 2,
            username: 'New Loaner',
            email: 'newloaner@example.com',
            password: 'Password123%',
            phoneNumber: '123456789',
            role: 'USER',
            locationTag: new LocationTag({ displayName: 'New Location', longitude: 0.324, latitude: -5.4})
        });

        loan.setLoaner(newLoaner);
        expect(loan.getLoaner()).toBe(newLoaner);
    });
});