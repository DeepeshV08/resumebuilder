import { generateToken } from "@/lib/jwt"
import { connectDB } from "@/lib/mongodb"
import userModel from "@/models/User.model"
import { LoginBody } from "@/types/user.types"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest){
     try{

        await connectDB()

        const body:LoginBody = await req.json()

        const { email, password} = body

        if(!email || !password){
            return NextResponse.json<ApiResponse>({
                success: false,
                message: 'all fields are required..'
            },{
                status: 400
            })
        }

        const isExisted = await userModel.findOne({email})

        if(!isExisted){
             return NextResponse.json<ApiResponse>({
                success: false,
                message: 'user not found'
            },{
                status: 404
            })
        }

        const matchedPass = isExisted.comparePass(password)

        if(!matchedPass){
            return NextResponse.json<ApiResponse>({
                success: false,
                message: 'Invalid credentials'
            },{
                status: 401
            })
        }

        const token = generateToken({userId: isExisted._id.toString()})

        const response = NextResponse.json<ApiResponse>({
            success: true,
            message: 'user logged in successfully.',
            data:{
                user:{
                    _id: isExisted._id,
                    name: isExisted.name,
                    email: isExisted.email
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