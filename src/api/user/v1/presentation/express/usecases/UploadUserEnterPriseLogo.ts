import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { userRepo } from "../../../repository/TypeormUserRepo";
import { catchError } from "../../../../../../shared/exceptions/CachError";
import { logErrorToFile } from "../../../../../../infrastructure/graphql-server/winston/logger";
import { moveFileToFolder } from "../../../../../../shared/util/util";
import { UploadUserEnterpriseLogoUseCase } from "../../../domain-model/usecases/UploadEnterpriseLogo";

export class UploadUserEnterpriseLogo {

  static async upload(req: Request, res: Response, next: NextFunction) {

    const appUrl = process.env.APP_URL;
    const userId: any = req.query.userId;
 
    const moveFile = await moveFileToFolder(req,res, "./public/images", "image" );

    try {
      await new Promise((resolve, reject) => {
        moveFile(req, res, (err) => {
          if (err instanceof multer.MulterError) {
            reject(new Error("Error occurred when uploading"));
          } else if (typeof req.file?.filename === "undefined") {
            reject(new Error("Please select a file"));
          } else {
            resolve("ok");
          }
        });
      });

   
      const imgurl = `${appUrl}images/${req.file?.filename}`;
      await UploadUserEnterpriseLogo.saveImg(imgurl, userId);

      res.status(201).send({ message: "Image importer avec succès !",imgUrl:imgurl,success:true });
    } catch (error) {
        logErrorToFile(error.message,'multer-error');
        res.status(422).send({ message: "Veuillez selectionner une image moins de 2Mo !" });
    
     
    }
  }

  @catchError
  private static async saveImg(imgUrl: string, userId: number) {
    const usecase = new UploadUserEnterpriseLogoUseCase(userRepo);
    const input={
      userId: userId,
      image:imgUrl
    }
 
    await usecase.execute(input);
  }
}

































