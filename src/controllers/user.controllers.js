import userModel from "../model/user.model.js";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from "../config/config.js";

export async function signup(req,res){
    const {name , age , address , mobile , email , aadharCardNumber , role ,  password} = req.body;

    const isAlreadySignedup = await userModel.findOne({
        aadharCardNumber
    })


if(isAlreadySignedup){
    return res.status(409).json({
        message : "user already exists"
    })
}

if (role === "admin") {
    const adminAlreadyExists = await userModel.findOne({
        role: "admin"
    });

    if (adminAlreadyExists) {
        return res.status(403).json({
            message: "admin already exists, another admin is not allowed"
        });
    }
}

const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

const user = await userModel.create({
    name , 
    age ,
    address ,
    mobile , 
    email , 
    aadharCardNumber ,
    role ,
    password : hashedPassword
})

const accessToken = jwt.sign({
    id : user._id
},config.JWT_SECRET,
    {
       expiresIn: "15m"
    }
)

const refreshToken = jwt.sign({
    id : user._id
},config.JWT_SECRET , 
    {
        expiresIn : "7d"
    }
)

res.cookie("refreshToken" , refreshToken , {
    httpOnly : true,
    secure : true,
    sameSite : "strict",
    maxAge : 7*24*60*60*1000
})

res.status(201).json({
    message : "user signedup successfully",
    user : {
        name : user.name,
        email : user.email,
    },
    accessToken,
})

}

export async function signin(req,res){
    const { aadharCardNumber , password } = req.body;

    const user = await userModel.findOne({
        aadharCardNumber
    })

    if(!user){
        return res.status(404).json({
            message : "user not found"
        })
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

    if(user.password !== hashedPassword){
        return res.status(401).json({
            message : "invalid credentials"
        })
    }

    const accessToken = jwt.sign({
        id : user._id
    },
    config.JWT_SECRET,
    {
        expiresIn : "15m"
    })

    const refreshToken = jwt.sign({
        id : user._id
    },
    config.JWT_SECRET,
    {
        expiresIn : "7d"
    })

    res.cookie("refreshToken", refreshToken , {
        httpOnly : true,
        secure : true,
        sameSite : "strict",
        maxAge : 7*24*60*60*1000
    })

    res.status(200).json({
        message : "login successful",
        accessToken
    })
}

export async function profile(req,res){
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(404).json({
            message : "token not found"
        })
    }

    const decoded = jwt.verify(token , config.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    res.status(200).json({
        message : "user fetched successfully",
        user : {
            name : user.name,
            mobile : user.mobile
        }
    })
}

export async function profilepassword(req,res){
    const token = req.headers.authorization?.split(" ")[1];

      if(!token){
        return res.status(404).json({
            message : "token not found"
        })
    }

      const decoded = jwt.verify(token , config.JWT_SECRET)

      const {currentPassword , newPassword} = req.body;

      const user = await userModel.findById(decoded.id)

      const hashedCurrentPassword = crypto.createHash("sha256").update(currentPassword).digest("hex");

    if(user.password !== hashedCurrentPassword){
        return res.status(401).json({
            message : "invalid current password"
        })
    }

    const hashedNewPassword = crypto.createHash("sha256").update(newPassword).digest("hex");

    user.password = hashedNewPassword;

    await user.save();

    res.status(200).json({
        message : "password updated successfully"
    })
}
    

export async function refreshToken(req,res){
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken){
        return res.status(401).json({
            message : "refresh token not found"
        })
    }

    const decoded = jwt.verify(refreshToken , config.JWT_SECRET)

    const accessToken = jwt.sign({
        id : decoded.id
    },config.JWT_SECRET,
     {
       expiresIn : "15m"
     }
)

    const newRefreshToken = jwt.sign({
        id : decoded.id
    },config.JWT_SECRET,
  {
    expiresIn : "7d"
  }
)

    res.cookie("refreshToken" , newRefreshToken , {
        httpOnly : true,
        secure : true,
        sameSite : "strict",
        maxAge : 7*24*60*60*1000
    })

     res.status(200).json({ 
        message : "Access token refreshed successfully",
        accessToken
     })
}
