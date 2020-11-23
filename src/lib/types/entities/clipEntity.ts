import { IEntityBase } from "./baseEntity";

export interface IClipEntity extends IEntityBase{
  title: string;

  tutorialId: string;

  lession: string;

  submissionDate:string;

  contributorId:string;

  audioFilePath:string;
}