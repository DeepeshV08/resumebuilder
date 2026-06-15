import { generateAiContent } from "@/lib/gemini";
import { GenerateSummaryBody } from "@/types/ai.types"
import { ApiResponse } from "@/types/api.types"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    try {

        const body: GenerateSummaryBody = await req.json()

        const { experienceLevel, skills, jobTitle } = body;

        if (!experienceLevel || !skills || !jobTitle) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Missing fields..",
            }, {
                status: 400
            })
        }

        const prompt = `
You are an expert ATS resume writer.

TASK:
Generate a professional, ATS-optimized resume summary based on the input.

RULES:
- Output ONLY the resume summary text.
- Do NOT include title, headings, labels, or formatting.
- Do NOT use markdown, quotes, or bullet points.
- Keep the tone professional and impactful.
- Must be optimized for Applicant Tracking Systems (ATS).
- Naturally include relevant keywords from job title and skills.
- Do NOT invent company names or fake achievements.
- STRICTLY limit the summary between 80 to 150 words only.
- If needed, prefer clarity and impact over length.

INPUT:
Job Title: ${jobTitle}
Skills: ${skills}
Experience Level: ${experienceLevel}

OUTPUT:
Return only a single well-written paragraph resume summary.
`;

        const result = await generateAiContent(prompt)

        const summary = result

        return NextResponse.json<ApiResponse>({
            success: true,
            message:"summary created",
            data:{
                summary
            }
        },{
            status: 201
        })
    } catch (err) {
        console.log('error in creating summary', err)
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "something went wrong",
        }, {
            status: 500
        })
    }
}