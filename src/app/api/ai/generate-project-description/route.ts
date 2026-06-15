import { generateAiContent } from "@/lib/gemini";
import { GenerateProjectDescription } from "@/types/ai.types"
import { ApiResponse } from "@/types/api.types"
import { NextRequest, NextResponse } from "next/server"
import { describe } from "node:test";


export async function POST(req: NextRequest) {
    try {

        const body: GenerateProjectDescription = await req.json()

        const {projectTitle, jobTitle, techStack} = body;

        if (!projectTitle || !techStack || !jobTitle) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Missing fields..",
            }, {
                status: 400
            })
        }

       const prompt = `
You are an expert ATS resume writer and software engineer.

TASK:
Generate a professional, ATS-friendly project description based ONLY on the given input.

RULES:
- Output ONLY one paragraph project description.
- Do NOT include headings, titles, bullet points, or formatting.
- Do NOT use markdown or quotes.
- Keep it concise and professional.
- Must be optimized for ATS (include relevant technical keywords naturally).
- Explain what the project does, key functionality, and tech stack usage.
- Do NOT invent company names or fake real-world achievements.
- Do NOT add unnecessary assumptions beyond provided input.
- Keep length between 60 to 120 words.

INPUT:
Job Title: ${jobTitle}
Project Title: ${projectTitle}
Tech Stack: ${techStack}

OUTPUT:
Return only a single well-written paragraph describing the project.
`;

        const result = await generateAiContent(prompt)

        const projectDescription = result

        return NextResponse.json<ApiResponse>({
            success: true,
            message:"project description created",
            data:{
                projectDescription
            }
        },{
            status: 201
        })
    } catch (err) {
        console.log('error in creating project description', err)
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "something went wrong",
        }, {
            status: 500
        })
    }
}