import userModel from "../model/user.model.js";
import candidateModel from "../model/candidate.model.js";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from "../config/config.js";

export async function identify(req,res){
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "token not found"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user || user.role !== "admin") {
        return res.status(403).json({
            message: "user does not have admin role"
        })
    }

    const data = req.body;

    const response = await candidateModel.create(data);

    res.status(200).json({
        response: response
    })
}


export async function updateCandidate(req,res){
     const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "token not found"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user || user.role !== "admin") {
        return res.status(403).json({
            message: "user does not have admin role"
        })
    }

    const candidateID = req.params.candidateID;

    const updatedCandidateData = req.body;

    const response = await candidateModel.findByIdAndUpdate(candidateID, updatedCandidateData, {
        new: true,
        runValidators: true
    });

    if (!response) {
        return res.status(404).json({
            message: "candidate not found"
        })
    }

    console.log("candidate data updated");

    res.status(200).json({
        response: response
    })
}

export async function deleteCandidate(req,res){
     const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "token not found"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user || user.role !== "admin") {
        return res.status(403).json({
            message: "user does not have admin role"
        })
    }

    const candidateID = req.params.candidateID;
 
    const response = await candidateModel.findByIdAndDelete(candidateID)

     if (!response) {
        return res.status(404).json({
            message: "candidate not found"
        })
    }

    console.log("candidate data deleted");

    res.status(200).json({
        response: response
    })
}

export async function vote(req,res){
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "token not found"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    if(!user){
        return res.status(404).json({
            message : 'user not found'
        })
    }

    const candidateID = req.params.candidateID;

    const candidate = await candidateModel.findById(candidateID)
    if(!candidate){
        return res.status(404).json({
            message : 'candidate not found'
        })
    }


    if(user.isVoted){
         return res.status(404).json({
            message : 'You have already voted'
        }) 
    }

    if(user.role === 'admin'){
        return res.status(404).json({
            message : 'admin cannot vote'
        }) 
    }

    candidate.votes.push({user : user._id})
    candidate.voteCount++
    await candidate.save()

    user.isVoted = true
    await user.save()

    res.status(200).json({message : "vote recorded successfully"});

}

export async function voteCount(req,res) {
    const candidate = await candidateModel.find().sort({ voteCount : "desc" });

    const voteRecord = candidate.map((data) => {
        return {
            party : data.party,
            count : data.voteCount
        };
    });

    return res.status(200).json(voteRecord);
}

export async function candidateCount(req,res){
    const candidate = await candidateModel.find();

    const candidateRecord = candidate.map((data)=>{
        return{
           name : data.name
        }
    })

    return res.status(200).json(candidateRecord);
}