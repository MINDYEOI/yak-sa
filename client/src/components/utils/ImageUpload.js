import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios';
import { useState } from 'react';
import './ImageUpload.css'

function ImageUpload(props) {

    const [Images, setImages] = useState([])    // 이미지를 여러장 들어가게 하기 위해서

    // 이미지 서버에 저장
    const imageDropEvent = (files) => {
        let imageData = new FormData();

        const config = {
            header: {'content-type': 'multipart/image-data'}
        }
        imageData.append("file", files[0])

        // 이미지 전달
        axios.post('/api/product/image', imageData, config)
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data)
                    setImages([...Images, response.data.filePath])
                    props.refreshFunction([...Images, response.data.filePath])
                    // 이 props (refreshFunction)은 UploadPage에 정의되어 있음
                }
                else {
                    alert('파일 저장을 실패했습니다.')
                }
        })

    }

    // 이미지 삭제 위한 deleteEvent
    const deleteEvent = (image) => { 
        const currentIndex = Images.indexOf(image);

        //console.log(currentIndex);
        
        let updateImages = [...Images];
        updateImages.splice(currentIndex, 1);   // currentIndex부터 1개의 사진을 지움
        
        setImages(updateImages);
        props.refreshFunction(updateImages);
    }


    return (
        <div style={ {display:'flex', justifyContent:'space-between'}}>
            <Dropzone onDrop={imageDropEvent}>
            {({getRootProps, getInputProps}) => (
            <section>
                        {/* Dropzone */}
                        <div style={{
                            width: 300, height: 200, border: '1px solid lightgray', borderRadius: '1em', display: 'flex',
                            alignItems: 'center', textAlign: 'center', justifyContent: 'center'
                        }}
                {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>이곳을 클릭하여<br/>상품 사진을 업로드 해주세요.</p>
                 </div> 
            </section>
  )}
            </Dropzone>
            

            {/* 파일 업로드하면 옆에 나오게 하도록 */}
            <div style={{
                width: '350px', height: '200px', borderRadius: '1em'
                , overflowX: 'scroll'
            }}>
                {Images.map((image, index) => (

                    <div onClick={ () => deleteEvent(image) }
                        key={index}>                        
                        <img id="test" src={`http://localhost:5000/${image}`} />
                        <div id="alert">클릭하면 삭제돼요!</div>

                </div>
                    ))}
            </div>

        </div>
    )
}

export default ImageUpload
