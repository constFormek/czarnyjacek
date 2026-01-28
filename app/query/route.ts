import { generateRandomToken } from "@/lib/UserHandler";

const basen = require("../../db");

async function pobierz() {
    const randomToken = generateRandomToken();
    console.log(randomToken);
    await basen.query(`INSERT INTO userBalance VALUES ('${randomToken}', 72);`);
    const data = await basen.query(`SELECT * from userBalance;`);
    return data; 
}

export async function GET() {
    try {
        return Response.json(await pobierz());
    } catch (err) {
        return Response.json({err}, {status: 500});
    }
}