import OpenAI from "openai";
import { connectToDB } from "../../../lib/mongodb";
import {Iter} from "../../../models/iter";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { destination, days, interests } = req.body;
    console.log("Calling an api key", process.env.OPENAI_API_KEY);
    
    const openai = new OpenAI({ apiKey: "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", });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI travel planner." },
        {
          role: "user",
          content: `Plan a ${days}-day trip to ${destination} for someone interested in ${interests}.`,
        },
      ],
    });
    console.log("Response", response);
    const itineraryText = response.choices[0].message.content;
    await connectToDB();
    const itinerary= new Iter({destination, days, interests, itinerary: itineraryText});
    await itinerary.save();
    res.status(200).json({ itinerary: itineraryText });

  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
