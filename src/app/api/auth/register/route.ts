import { generateToken } from "@/lib/jwt"
import { connectDB } from "@/lib/mongodb"
import userModel from "@/models/User.model"
import { RegisterBody } from "@/types/user.types"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest){
    try{

        await connectDB()

        const body:RegisterBody = await req.json()

        const {name , email, mobile, password} = body

        if(!name || !email || !password){
            return NextResponse.json<ApiResponse>({
                success: false,
                message: 'all fields are required..'
            },{
                status: 400
            })
        }

        const isExisted = await userModel.findOne({email})

        if(isExisted){
             return NextResponse.json<ApiResponse>({
                success: false,
                message: 'user already exists'
            },{
                status: 409
            })
        }

        const newUser = await userModel.create({
            name , email , mobile , password
        })

        const token = generateToken({
            userId: newUser._id.toString(),
        })

        const response = NextResponse.json<ApiResponse>({
            success: true,
            message: 'user registered successfully.',
            data:{
                user:{
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            }
        },{
            status: 201
        })

        response.cookies.set('token', token,{
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        })
        return response
    }catch(error){
        console.log("error in register api",error)
        return NextResponse.json<ApiResponse>({
            message: "something went wrong",
            success: false,
            error:{
                error
            }
        },{
            status: 500
        })
    }
}