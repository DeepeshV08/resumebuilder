import { generateAiContent } from "@/lib/gemini";
import { GenerateSkillsBody } from "@/types/ai.types"
import { ApiResponse } from "@/types/api.types"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    try {

        const body: GenerateSkillsBody = await req.json()

        const { experienceLevel, jobTitle } = body;

        if (!experienceLevel || !jobTitle) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Missing fields..",
            }, {
                status: 400
            })
        }

        const prompt = `
You are an expert ATS resume skill extractor.

TASK:
Generate only relevant technical skills based on the given job title and experience level.

RULES:
- Output ONLY a comma-separated list of technical skills.
- Do NOT include soft skills (like communication, teamwork, leadership).
- Do NOT include explanations, headings, or sentences.
- Do NOT repeat the job title.
- Do NOT add numbering or bullet points.
- Do NOT include emojis or extra text.
- Skills must be real, industry-standard, and ATS-friendly.
- Focus only on technical skills used in real jobs.
- Keep output between 10 to 20 skills maximum.

INPUT:
Job Title: ${jobTitle}
Experience Level: ${experienceLevel}

OUTPUT FORMAT: in array form 
[skill1, skill2, skill3, skill4, ...]
`;

        const result = await generateAiContent(prompt)

        let skills = result

        if(typeof skills === 'string'){
            try{
                skills = JSON.parse(skills)
            }catch(err){
                console.log("failed to paise skills",err)
            }
        }
        return NextResponse.json<ApiResponse>({
            success: true,
            message:"skills created",
            data:{
                skills
            }
        },{
            status: 201
        })
    } catch (err) {
        console.log('error in creating skills', err)
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "something went wrong",
        }, {
            status: 500
        })
    }
}