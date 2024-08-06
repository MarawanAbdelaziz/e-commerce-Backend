import express from "express";
import * as CC from "./controllers/company.controller.js";
import auth from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import * as CV from "./company.validation.js";
import companyHR from "../../middleware/companyHR.js";

const companyRouter = express.Router();

companyRouter.post("/", auth, companyHR, validation(CV.addCompanyValidation), CC.addCompany);
companyRouter.put("/:id", auth, companyHR, validation(CV.addCompanyValidation), CC.updateCompany);

companyRouter.delete("/:id", auth, companyHR, CC.deleteCompany);
companyRouter.get("/getCompany/:id", auth, companyHR, CC.getCompany);

companyRouter.get("/searchByCompanyName", CC.searchByCompanyName);

// Get all applications for specific Job
companyRouter.get("/applicationsForSpecificJob/:id", auth, companyHR,  CC.GAAFSJ);

export default companyRouter;
