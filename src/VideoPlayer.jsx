import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
    const {ext,vid}= useParams();

    const [vidUrl, setVidUrl] = useState("");
    useEffect(() => {
        const vidKey = vid+"."+ext;
        console.log(vidKey)
        getFile(vidKey).then(url => {
          setVidUrl(url);
        }).catch(err => {
          console.log('Error retrieving Video URL:', err);
        });
      }, [ext,vid]);
    const bucket = import.meta.env.VITE_AWS_BUCKET;
    const region = import.meta.env.VITE_AWS_REGION;
    const secret = import.meta.env.VITE_AWS_SECRET;
    const key = import.meta.env.VITE_AWS_KEY;
    const s3 = new AWS.S3({
        region: region,
        accessKeyId:key,
        secretAccessKey: secret
      });
      async function getFile(videoKey) {
        try {
          const params = {
            Bucket: bucket+"/video",
            Key: videoKey
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
        { vidUrl &&  <ReactPlayer
      url={vidUrl}
      width="100%"
      height="auto"
      controls={true}
    />

        }
    </div>
  )
}

export default VideoPlayer