import { IUser } from "@/types/user.types";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

interface UserDocument extends Omit<IUser,'_id'>, Document {

    comparePass(candidatePassword: string): boolean
}
const userSchema = new mongoose.Schema<UserDocument>({
    name:{
        type: String,
        trim: true,
        required:[true,'Name is required']
    },
    email:{
        type: String,
        trim: true,
        required: [true,"Email is required"],
        unique: [true,'email must be unique']
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        minlength: [6,'Min 6 character required']
    },
    mobile:{
        type: String,
        minlength: [10,'min 10 character required'],
        maxlength: [10,'max 10 character required']
    }
},{
    timestamps: true
})

userSchema.pre('save', function(): void{
    if(!this.isModified('password')) return
    this.password = bcrypt.hashSync(this.password, 10)
})

userSchema.methods.comparePass = function (candidatePassword: string): boolean{
    return bcrypt.compareSync(candidatePassword, this.password)
}

const userModel = mongoose.model('User', userSchema)

export default userModel