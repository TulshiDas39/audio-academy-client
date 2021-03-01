import { AxiosResponse } from "axios";

export function triggerDownloadFromBlob(file: Blob, fileName?: string) {
    var link = document.createElement("a");
    var objurl = URL.createObjectURL(file);
    link.download = fileName || "File.mp3";
    link.href = objurl;
    link.click();
}



export function DownloadAudio(file: Blob,fileName?:string): void {
   var blob = new Blob([file] , {"type" : "audio/mpeg"})
   var link = document.createElement("a");
   let reader = new FileReader();
   reader.readAsDataURL(blob);
   link.download = fileName || "file.mp3";
   reader.onload = function() {
     if(typeof(reader.result) === 'string')
     {
       link.href = reader.result; // data url
       link.click();
     }
    
   };
   link.click();
 }

 export function getFileName(response:AxiosResponse<any>){
     let headerLine = response.headers['Content-Disposition'];
     if(!headerLine) return "";
     let startFileNameIndex = headerLine.indexOf('"') + 1
     let endFileNameIndex = headerLine.lastIndexOf('"');
     let filename = headerLine.substring(startFileNameIndex, endFileNameIndex);
     return filename;
    //  response.data.pipe(fs.createWriteStream(filename));
}

