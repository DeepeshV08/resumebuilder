import { generateAiContent } from "@/lib/gemini";
import { GenerateExperienceDescription, GenerateProjectDescription } from "@/types/ai.types"
import { ApiResponse } from "@/types/api.types"
import { NextRequest, NextResponse } from "next/server"
import { describe } from "node:test";


export async function POST(req: NextRequest) {
    try {

        const body: GenerateExperienceDescription = await req.json()

        const {experienceLevel,yearOfExperience, jobRole, techStack} = body;

        if (!experienceLevel || !techStack || !jobRole || !yearOfExperience) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Missing fields..",
            }, {
                status: 400
            })
        }

       const prompt = `
You are an expert ATS resume writer and senior software engineering career coach.

TASK:
Generate a professional work experience description for a resume based on the given input.

RULES:
- Output ONLY the work experience content.
- Do NOT include headings, titles, or markdown.
- Do NOT invent company names or fake achievements.
- Keep tone professional, realistic, and ATS-optimized.
- Use strong action verbs (developed, built, designed, implemented, optimized, maintained).
- Naturally include the given tech stack keywords.
- Match responsibility level based on experience level and years of experience.
- Output can be a single paragraph OR 3–5 bullet points (choose the best format for clarity).
- Keep content realistic based on years of experience.
- Do NOT exceed 120–180 words.

INPUT:
Job Role: ${jobRole}
Experience Level: ${experienceLevel}
Years of Experience: ${yearOfExperience}
Tech Stack: ${techStack.join(", ")}

OUTPUT:
Return only the work experience description.
`;

        const result = await generateAiContent(prompt)

        const workExperience = result

        return NextResponse.json<ApiResponse>({
            success: true,
            message:"workExperience created",
            data:{
                workExperience
            }
        },{
            status: 201
        })
    } catch (err) {
        console.log('error in creating workExperience', err)
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "something went wrong",
        }, {
            status: 500
        })
    }
}