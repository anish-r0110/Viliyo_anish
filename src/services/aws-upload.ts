import { S3Client } from '@aws-sdk/client-s3';
import S3 from "react-aws-s3";
import { Upload } from '@aws-sdk/lib-storage';

const accessKey = 'QUtJQVlMRk5WNVFKQVVYUDVFTVo=';
const secretKey = 'V05yeE9Id1FTQkZoMVg3VTR3R21tdmZFVWRCNG1wT0xqNXlycVdobw==';
const bucketName = 'vtt-ahom';
const s3Region = 'ap-south-1';  


// To be Added to env
const MAX_SUPPORTED_PARALLEL_UPLOAD_SIZE= 3000;
const S3_BUCKET_BASE_URL= 'https://vtt-ahom.s3.ap-south-1.amazonaws.com/';

const handleFileUploadToAws = async (params : any, multiPart: boolean, file: File) => {
    if(!multiPart){
      // Create parallel upload
      try {
        const parallelUploads3 = new Upload({
          client: new S3Client({ region: s3Region, credentials: {
            accessKeyId: atob(accessKey),
            secretAccessKey: atob(secretKey),
          } }),
          leavePartsOnError: false, // optional manually handle dropped parts
          params: params,
        });
    
        parallelUploads3.on('httpUploadProgress', progress => {
          console.log('progress : ', progress);
        });
        await parallelUploads3.done();
        } catch(err){
          console.log('Error while uploading file')
        }
      }  else {
        const config = {
        bucketName: bucketName,
        region: s3Region,
        accessKeyId: atob(accessKey),
        secretAccessKey: atob(secretKey),
      };
      const reactClient = new S3(config);
      await reactClient.uploadFile(file, params.Key).then((data : any) => {
        if (data.status === 204) {
          console.log("multi-part upload successful with URL", data.location);
        } else {
          console.log("fail");
        }
      }).catch((err : any)=>{
        console.log(err, 'Error while uploading')
      });
    }
  }
  
  export async function uploadImages(file: File) {
    console.log('File', File);
    const s3_url = S3_BUCKET_BASE_URL + file?.name;
    console.log('upload file', file);
    // const formData = new FormData();
    // formData.append('file', file[0]);
    // console.log('floaderormdata  ', formData);
    const target = {
      Bucket: bucketName,
      Key: file.name,
      Body: file,
      //  ResponseContentDisposition: 'view',
      //  ContentDisposition: 'attachment',
      ContentType: file.type || 'image/png',
      //  ContentType: 'application/pdf',
      //  ContentDisposition:"inline",
      //  ContentType:"application/pdf",
      ACL: 'public-read',
    };

    let isMultiPart = false;
    if(file.size > MAX_SUPPORTED_PARALLEL_UPLOAD_SIZE){
      isMultiPart = true
    }
    await handleFileUploadToAws(target, isMultiPart, file)
    return s3_url;
  }
  