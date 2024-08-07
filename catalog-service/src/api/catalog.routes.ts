import express, {NextFunction, Request, Response} from "express";

const router = express.Router();


// endpoints
router.post("/prodict", async (_: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({
            message: "hi"
        });
    }
);

export default router;

