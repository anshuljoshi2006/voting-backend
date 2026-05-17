import {Router} from "express"
import * as candidateController from "../controllers/candidate.controllers.js"

const candidateRouter = Router();

candidateRouter.post("/" , candidateController.identify)

candidateRouter.put("/:candidateID" , candidateController.updateCandidate)

candidateRouter.delete("/:candidateID" , candidateController.deleteCandidate)

candidateRouter.post("/vote/:candidateID" , candidateController.vote)

candidateRouter.get("/voteCount" , candidateController.voteCount)

candidateRouter.get("/candidateCount" , candidateController.candidateCount)

export default candidateRouter;