import React, { useState } from 'react'
import Themes from 'react-ui-themes-superflows'
import { Col, Row,Tab,Tabs,Container } from 'react-bootstrap';
import { UploadToS3 } from 'react-upload-to-s3'
import 'bootstrap/dist/css/bootstrap.min.css';
const FileUpload = () => {
  function removeExtension(filename) {
    return filename.substring(0, filename.lastIndexOf('.'));
  }
  function Extension(filename) {
    return filename.substring(filename.lastIndexOf('.')+1,filename.length+1);
  }
    const theme = Themes.getTheme("Default");
    const bucket = import.meta.env.VITE_AWS_BUCKET;
    const region = import.meta.env.VITE_AWS_REGION;
    const secret = import.meta.env.VITE_AWS_SECRET;
    const key = import.meta.env.VITE_AWS_KEY;
    const [resimg, setResimg] = useState({
      result:false,
      url: ""

    })
    const [respdf, setRespdf] = useState({
      result:false,
      url: ""
    })
    const [resvid, setResvid] = useState({})
  return (
    <Container>
     <Tabs defaultActiveKey="second">
        <Tab eventKey="first" title="Video">
        <Row className=' p-3 justify-content-center'>
        
        <Col sm={10} xs={10} md={10} xxl={10}>
  <UploadToS3 
            bucket={bucket+"/video"}
            awsRegion={region}
           
            awsKey={key}
            awsSecret={secret}
            type="video"
            theme={theme}
            showNewUpload={false}
            onResult={(result) => {setResvid(result);}} />
      </Col>
        
        </Row>
        {resvid.result ? (
          <a href={removeExtension(resvid.url)+"/"+Extension(resvid.url)}>Your Link is ready</a>
        ):(<p/>)
        }
        </Tab>
        <Tab eventKey="second" title="Image">
        <Row className='justify-content-center'>
        
        <Col sm={12} xs={12} md={6} xxl={6}>
  <UploadToS3 
            bucket={bucket+"/image"}
            awsRegion={region}
          
            awsKey={key}
            awsSecret={secret}
            awsMediaConvertEndPoint=""
            type="image"
            showNewUpload={false}
            onResult={(result) => {setResimg(result);}} />
      </Col>
        
        </Row>
        {resimg.result ? (
          <a href={removeExtension(resimg.url)+"/"+Extension(resimg.url)}>Your Link is ready</a>
        ):(<p/>)
        }
        </Tab>
        <Tab eventKey="third" title="PDFS">
        <Row className='justify-content-center'>
        
        <Col sm={12} xs={12} md={6} xxl={6}>
  <UploadToS3 
            bucket={bucket+"/pdf"}

            awsRegion={region}
            awsKey={key}
            awsSecret={secret}
            type="pdf"
            showNewUpload={false}
            onResult={(result) => {setRespdf(result);}} />

      </Col>
        
        </Row>
        {respdf.result ? (
          <a href={removeExtension(respdf.url)}>Your Link is ready</a>
        ):(<p/>)
        }
       
        </Tab>
        
      </Tabs>
      
      </Container>
     
  
  )
}

export default FileUpload