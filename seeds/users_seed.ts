import * as Knex from "knex";
import faker from 'faker';

export async function seed(knex: Knex): Promise<any> {
    const totalFakes = 50;
    const fakes = [];
    const password = '12345'
    function getNumberBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    for(let i=0; i < totalFakes; i++){
        fakes.push({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            email_confirmed: true,
            password: password,
            created_at: new Date()

        })
    }
    // Deletes ALL existing entries
    return knex("users").del()
        .then(() => {
            // Inserts seed entries
            return knex("table_name").insert([
                { id: 1, colName: "rowValue1" },
                { id: 2, colName: "rowValue2" },
                { id: 3, colName: "rowValue3" }
            ]);
        });
};
