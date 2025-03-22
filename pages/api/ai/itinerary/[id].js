import { connectToDB } from "../../../lib/mongodb";
import { Iter } from "../../../models/iter";

export default async function handler(req, res) {
    await connectToDB();

    const { id } = req.query;

    if (req.method === "DELETE") {
        try {
            await Iter.findByIdAndDelete(id);
            res.status(200).json({ message: "Itinerary deleted successfully." });
        } catch (error) {
            console.error("Error deleting itinerary:", error);
            res.status(500).json({ error: "Failed to delete itinerary." });
        }
    } else if (req.method === "PATCH") {
        try {
            const { destination, days, interest } = req.body;
            const updatedItinerary = await Iter.findByIdAndUpdate(
                id,
                { destination, days, interest },
                { new: true }
            );
            res.status(200).json({ updatedItinerary });
        } catch (error) {
            console.error("Error updating itinerary:", error);
            res.status(500).json({ error: "Failed to update itinerary." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
