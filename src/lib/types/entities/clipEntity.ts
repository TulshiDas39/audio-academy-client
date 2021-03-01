import { IEntityBase } from "./baseEntity";

export interface IClipEntity extends IEntityBase{
  title: string;

  tutorialId: string;

  lession: string;

  submissionDate?:string;

  contributorId?:string;

  deadline?:string;

  audioFilePath?:string;

  description: string;
  fileId?: string;
}