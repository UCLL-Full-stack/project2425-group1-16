import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.loan.deleteMany();
    await prisma.item.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.category.deleteMany();
    await prisma.locationTag.deleteMany();

    const locationLeuven = await prisma.locationTag.create({
        data: {
            displayName: "Martelarenplein, Leuven",
            longitude: 50.8811884,
            latitude: 4.7144443,
        }
    });

    const locationHeist = await prisma.locationTag.create({
        data: {
            displayName: "Kerkplein, Heist-op-den-Berg",
            longitude: 51.0761674,
            latitude: 4.7289136
        }
    });

    const noLocation = await prisma.locationTag.create({
        data: {
            displayName: "No location",
            longitude: 0.0,
            latitude: 0.0
        }
    });


    const categoryElectronics = await prisma.category.create({ data: { name: 'Electronics' } });
    const categoryLamps       = await prisma.category.create(
        { data: {
            name: 'Lamps', 
            parents: {
                connect: { id: categoryElectronics.id }
            }
        }
    });
    const categoryGardening   = await prisma.category.create({ data: { name: 'Gardening' } });


    const user = await prisma.profile.create({
        data: {
            username: 'exampleUser',
            password: await bcrypt.hash('Password123%', 12),
            email: 'exampleUser@example.com',
            phoneNumber: '1234567890',
            role: 'USER',
            locationTag: { connect: { id: locationLeuven.id } }
        }
    })

    const admin = await prisma.profile.create({
        data: {
            username: 'exampleAdmin',
            password: await bcrypt.hash('Password123%', 12),
            email: 'exampleAdmin@example.com',
            phoneNumber: '1234567891',
            role: 'ADMIN',
            locationTag: { connect: { id: locationHeist.id } }
        }
    });

    const superAdmin = await prisma.profile.create({
        data: {
            username: 'exampleSuperAdmin',
            password: await bcrypt.hash('Password123%', 12),
            email: 'exampleSuperAdmin@example.com',
            phoneNumber: '1234567892',
            role: 'SUPERADMIN',
            locationTag: { connect: { id: noLocation.id } }
        }
    });
}

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();