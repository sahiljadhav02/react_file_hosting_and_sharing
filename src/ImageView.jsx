import { S3 } from 'aws-sdk';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
const ImageView = () => {
    const [imageUrl, setImageUrl] = useState("");
    const {img,ext} = useParams()
    console.log(img,ext)
    useEffect(() => {
        const imageKey = img+"."+ext;
        console.log(imageKey)
        getFile(imageKey).then(url => {
          setImageUrl(url);
        }).catch(err => {
          console.log('Error retrieving image URL:', err);
        });
      }, [img,ext]);
    const bucket = import.meta.env.VITE_AWS_BUCKET;
    const region = import.meta.env.VITE_AWS_REGION;
    const secret = import.meta.env.VITE_AWS_SECRET;
    const key = import.meta.env.VITE_AWS_KEY;
    const s3 = new AWS.S3({
        region: region,
        accessKeyId:key,
        secretAccessKey: secret
      });
    async function getFile(imageKey) {
        try {
          const params = {
            Bucket: bucket+"/image",
            Key: imageKey
          };
      
          const response = await s3.getSignedUrlPromise('getObject',params);
          console.log('File retrieved successfully:', response);
          return response;
        } catch (err) {
          console.log(err);
          return null;
        }
      }
    
  return (
    <div>
{imageUrl && 
        <img src={imageUrl} />
}
    </div>
  )
}

export default ImageView