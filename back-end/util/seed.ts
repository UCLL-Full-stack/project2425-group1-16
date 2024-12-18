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


    const categoryDecoration  = await prisma.category.create({ data: { name: 'Decoration' } });
    const categoryElectronics = await prisma.category.create({ data: { name: 'Electronics' } });
    const categoryLamps       = await prisma.category.create({
        data: {
            name: 'Lamps', 
            parents: {
                connect: [
                    { id: categoryElectronics.id },
                    { id: categoryDecoration.id }
                ]
            }
        }
    });
    const categoryGardening   = await prisma.category.create({ data: { name: 'Gardening' } });


    const user = await prisma.profile.create({
        data: {
            username: 'exampleUser',
            password: await bcrypt.hash('Password123%', 12),
            email: 'exampleUser@example.com',
            role: 'USER',
            locationTag: { connect: { id: locationLeuven.id } }
        }
    })

    const admin = await prisma.profile.create({
        data: {
            username: 'exampleAdmin',
            password: await bcrypt.hash('Password123%', 12),
            email: 'exampleAdmin@example.com',
            role: 'ADMIN',
            locationTag: { connect: { id: locationHeist.id } }
        }
    });

    const superAdmin = await prisma.profile.create({
        data: {
            username: 'exampleSuperAdmin',
            password: await bcrypt.hash('Password123%', 12),
            email: 'exampleSuperAdmin@example.com',
            role: 'SUPERADMIN',
            locationTag: { connect: { id: noLocation.id } }
        }
    });

    const item1 = await prisma.item.create({
        data: {
            name: 'Laptop',
            description: 'A high-performance laptop',
            price: 25.0,
            categories: { connect: { id: categoryElectronics.id } },
            owner: { connect: { id: user.id } },
            locationTag: { connect: { id: locationLeuven.id } }
        }
    });

    const item2 = await prisma.item.create({
        data: {
            name: 'Desk Lamp',
            description: 'A bright desk lamp',
            price: 12.0,
            categories: { connect: { id: categoryLamps.id } },
            owner: { connect: { id: admin.id } },
            locationTag: { connect: { id: locationHeist.id } }
        }
    });

    const item3 = await prisma.item.create({
        data: {
            name: 'Garden Shovel',
            description: 'A sturdy garden shovel',
            price: 10.0,
            categories: { connect: { id: categoryGardening.id } },
            owner: { connect: { id: superAdmin.id } },
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