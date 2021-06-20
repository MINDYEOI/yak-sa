import React from 'react';
import { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd'; // css
import ImageUpload from '../../utils/ImageUpload'
import Axios from 'axios';
import { PRODUCT_SERVER } from '../../Config'
const { TextArea } = Input;     // 박스크기 조절을 사용자가 임의로 가능하게 함.

// Select symtoms
const symtoms = [{ key: 1, value: "진통제" },
    { key: 2, value: "소화제" },
    { key: 3, value: "감기약" },
    { key: 4, value: "해열제" },
    { key: 5, value: "파스류" },
    { key: 6, value: "상처치료" },
    { key: 7, value: "기타" }
]

function UploadPage(props) {

    // OnChange Function
    
    const [Image, setImage] = useState("")
    const [Title, setTitle] = useState("");
    const [Info, setInfo] = useState("");
    const [Cost, setCost] = useState("");
    const [Option, setOption] = useState(1);

    const titleEvent = (event) => {
        setTitle(event.currentTarget.value);
    }

    const infoEvent = (event) => {
        setInfo(event.currentTarget.value);
    }

    const costEvent = (event) => {
        setCost(event.currentTarget.value);
    }


    const optionEvent = (event) => {
        setOption(event.currentTarget.value);
    }


    const imageEvent = (event) => {
        setImage(event.currentTarget.value);
    }

    const updateImages = ( newImages ) => {
        setImage(newImages);
    }

    const submitEvent = (event) => {
        event.preventDefault(); // 확인버튼을 누를 때 리프레시 되지 않도록
        
        if (!Title || !Info || !Cost || !Option || !Image) {
            return alert("모두 입력해주세요.")
        }

        // 서버에 보낼 값들
        const body = {
            seller: props.user.userData._id,
            title: Title,
            info: Info,
            price: Cost,
            images: Image,
            symtoms: Option
        }

        Axios.post(`${PRODUCT_SERVER}`, body)
            .then(response => {
                if (response.data.success) {
                    alert("업로드가 완료되었습니다.");
                    props.history.push('/');    // 상품 업로드가 성공하면 메인페이지로 돌아감.
                }
                else {
                    alert("업로드에 실패했습니다.")
                }
        })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom:'2rem'}}>
                <h2> 업로드 </h2>
                    
            </div>

            <Form onSubmit={submitEvent}>
                {/* 파일업로드 부분은 코드가 길어서 따로 컴포넌트로 만들어버리기~! */}
                <ImageUpload refreshFunction={updateImages}/>
                <br />
                <br />
                <label>이름</label>
                <Input onChange={ titleEvent} value={Title} />
                {/* ㄴ ant design에서 가져온 Input */}
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={ infoEvent} value={Info} />
                <br />
                <br />
                <label>가격</label>
                <Input onChange={ costEvent} value={Cost} type="number"/>
                <br />
                <br />
                <select onChange={optionEvent} value={ Option}>
                    {symtoms.map(item => (
                        <option key={item.key} value={item.key}>{ item.value}</option>
                    ))}
                    <option></option>
                </select>
                <br />
                <br />
                <Button onClick={submitEvent}>확인</Button>
                
            </Form>

        </div>
    )
} 

    export default UploadPage;
