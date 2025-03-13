import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { destination, days, interests } = req.body;

    if (!destination || !days || !interests) {
      return res.status(400).json({ error: "All fields are required" });
    }
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
    
    res.status(200).json({ itinerary: response.choices[0].message.content });
  } catch (error) {
    console.log("Error", error);
    
    res.status(500).json({ error: "Something went wrong" });
  }
}
