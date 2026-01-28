import { getOngoingGames } from "@/lib/GameLogic";

export async function GET() {
    try {
        return Response.json(Object.fromEntries(getOngoingGames()));
    } catch (err) {
        return Response.json({err}, {status: 500});
    }
}