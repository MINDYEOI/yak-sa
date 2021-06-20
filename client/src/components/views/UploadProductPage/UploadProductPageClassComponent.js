import React, { Component } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';
import FileUpload from '../../utils/FileUpload';
import { PRODUCT_SERVER } from '../../components/Config.js';

const { Title } = Typography;
const { TextArea } = Input;

const Medicines = [
    { key: 1, value: "진통제" },
    { key: 2, value: "소화제" },
    { key: 3, value: "감기약" },
    { key: 4, value: "해열제" },
    { key: 5, value: "파스류" },
    { key: 6, value: "상처치료" },
    { key: 7, value: "기타" }
]

export class UploadProductPage extends Component {

    state = {
        title: '',
        description: '',
        medicines: 1,
        images: [],
        price: 0
    }

    handleChangeTitle = (event) => {
        this.setState({ title: event.currentTarget.value })
    }

    handleChangePrice = (event) => {
        this.setState({ price: parseInt(event.currentTarget.value, 10) })
    }

    handleChangeDecsription = (event) => {
        // console.log(event.currentTarget.value)
        this.setState({ description: event.currentTarget.value })
    }

    handleChangeMedicines = (event) => {
        this.setState({ medicines: event.currentTarget.value })
    }

    onSubmit = (event) => {
        event.preventDefault();

        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('!! 접근할 수 없습니다 !!')
        }

        if (!this.state.title || !this.state.description ||
            !this.state.medicines || !this.state.images
            || !this.state.price) {
            return alert('모든 항목을 채워주세요.')
        }

        const variables = {
            writer: this.props.user.userData._id,
            title: this.state.title,
            description: this.state.description,
            images: this.state.images,
            medicines: this.state.medicines,
            price: this.state.price
        }

        axios.post(`${PRODUCT_SERVER}/uploadProduct`, variables)
            .then(response => {
                if (response.data.success) {
                    alert('성공적으로 업로드 했습니다.')
                    setTimeout(() => {
                        this.props.history.push('/')
                    }, 1000);
                } else {
                    alert('업로드에 실패했습니다.')
                }
            })
    }

    updateFiles = (newImages) => {
        this.setState({ images: newImages })
    }


    render() {
        return (
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > 약 배달 서비스 : 약사</Title>
            </div>

            <Form onSubmit={this.onSubmit}>
               
               <FileUpload refreshFunction={this.updateFiles} />

                <br /><br />
                <label>제품명</label>
                <Input
                    onChange={this.handleChangeTitle}
                    value={this.state.title}
                />
                <br /><br />
                <label>설명</label>
                <TextArea
                    onChange={this.handleChangeDecsription}
                    value={this.state.description}
                />
                <br /><br />
                <label>가격</label>
                <Input
                    type="number"
                    onChange={this.handleChangePrice}
                    value={this.state.price}
                />
                <br /><br />
                <select onChange={this.handleChangeMedicines}>
                    {Medicines.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                    <br /><br />
                    
                
                <Button type="primary" size="large" onClick={this.onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
        )
    }
}

export default UploadProductPage
