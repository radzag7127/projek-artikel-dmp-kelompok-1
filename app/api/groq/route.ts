import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(request: Request) {
  console.log("API route called");

  if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY is not defined");
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { messages } = await request.json();
    console.log("Processing messages:", messages);

    const projectData = {
      keyFigures: {
        tasksCompleted: "45/60 (-48.83%)",
        hoursLogged: "1,271/3,099 (-58.99%)",
        teamMembersActive: "268/685 (-60.88%)",
        commits: "847/2,070 (-59.08%)",
      },
      topTasks: [
        { name: "Backend API Integration", value: 15, completed: 10 },
        { name: "Frontend Development", value: 12, completed: 8 },
        { name: "Database Migration", value: 9, completed: 7 },
        { name: "UI/UX Design", value: 8, completed: 6 },
        { name: "Testing & QA", value: 6, completed: 3 },
      ],
      teamMembers: [
        { name: "Michael Christopher Harijanto", tasks: 14 },
        { name: "Radyza Glagah Sudharma", tasks: 12 },
        { name: "Muhammad Zidan", tasks: 11 },
        { name: "Fikri Noor Arafah", tasks: 10 },
        { name: "Muhammad Reihan Ghiffari", tasks: 9 },
        { name: "Hilal Dhiyaulhaq", tasks: 8 },
      ],
      forecastData: [
        { month: "May", actual: 372941, forecast: 380000 },
        { month: "Jun", actual: 380418, forecast: 385000 },
        { month: "Jul", actual: 387533, forecast: 390000 },
        { month: "Aug", forecast: 395000 },
        { month: "Sep", forecast: 400000 },
      ],
    };

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Anda adalah Asisten Project Management untuk DMP Kelompok 1. 
          PENTING: Selalu jawab dalam Bahasa Indonesia yang formal dan profesional.
          
          Anda memiliki akses ke data project berikut: ${JSON.stringify(
            projectData
          )}
          
          Gunakan data ini untuk menjawab pertanyaan tentang:
          - Status project
          - Performa tim
          - Progress tugas
          - Prediksi project
          
          Berikan jawaban yang singkat dan jelas.`,
        },
        ...messages,
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 512,
      top_p: 1,
    });

    console.log("Got response from Groq");
    return NextResponse.json(chatCompletion);
  } catch (error: any) {
    console.error("Detailed API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
