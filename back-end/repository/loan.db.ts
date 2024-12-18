import { Loan } from "../model/loan";
import database from "./database";

const getAllLoans = async (): Promise<Loan[]> => {
    try {
        const loansPrisma = await database.loan.findMany({
            include: {
                loaner: {
                    include: { locationTag: true }
                },
                loanedItem: {
                    include: { 
                        owner: { include: { locationTag: true }},
                        locationTag: true,
                        categories: true
                    }
                },
            }
        })
        return loansPrisma.map((loanPrisma) => Loan.from(loanPrisma));
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
};

const getLoanById = async ({ id }: { id: number }): Promise<Loan | null> => {
    try {
        const loanPrisma = await database.loan.findUnique({
            where: {
                id
            },
            include: {
                loaner: {
                    include: { locationTag: true }
                },
                loanedItem: {
                    include: { 
                        owner: { include: { locationTag: true }},
                        locationTag: true,
                        categories: true
                    }
                },
            }
        });
        return loanPrisma ? Loan.from(loanPrisma) : null;
    } catch (error) {
        console.error(`Database error: ${error}`);
        throw new Error(`Database error: ${error}`);
    }
};