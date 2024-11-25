const prisma = require("../services/prisma");

exports.newOrUpdateLegend = async (data) => {
    try {
        const legend = await prisma.legend.upsert({
            where: {
                id: data.id // Substitua por `name` ou outro identificador único se necessário
            },
            update: {
                name: data.name,
                Strength: data.Strength,
                Dexterity: data.Dexterity,
                Defense: data.Defense,
                Speed: data.Speed,
                Weapon_one: data.Weapons[0], // Alterado de Weapons_one para Weapon_one
                Weapon_two: data.Weapons[1]  // Alterado de Weapons_two para Weapon_two
            },
            create: {
                id: data.id, // Necessário porque você está usando `@db.ObjectId`
                name: data.name,
                Strength: data.Strength,
                Dexterity: data.Dexterity,
                Defense: data.Defense,
                Speed: data.Speed,
                Weapon_one: data.Weapons[0], // Alterado de Weapons_one para Weapon_one
                Weapon_two: data.Weapons[1]  // Alterado de Weapons_two para Weapon_two
            }
        });

        return legend;
    } catch (error) {
        console.log(error)
    }
};

exports.getLegend = async () => {
    try {
        const legends = await prisma.legend.findMany();
        return legends;
    } catch (error) {
        console.log(error);
        throw new Error("Erro ao buscar lendas.");
    }
};