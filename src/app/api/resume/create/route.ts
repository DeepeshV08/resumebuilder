import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import resumeModel from "@/models/resume.model";
import { IResume } from "@/types/resume.types";
import Error from "next/error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        await connectDB()

        const userId = await getCurrentUser()

        const newResume = await resumeModel.create({
            user_id: userId,
            title:"",
            summary:"",
            personalInfo: {},
            workExperience: [],
            projects:[],
            education: [],
            certification: [],
            skills: []
        })

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Resume created successfully.",
            data: newResume
        },{
            status: 201
        })

    }catch(error){
        console.log("error in create resume api",error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
        },{ status: 500 })
    }
}