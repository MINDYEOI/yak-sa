import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import { Row, Col } from 'antd';
import { PRODUCT_SERVER } from '../../Config'
function DetailProductPages(props) {
    const [Product, setProduct] = useState({})
    const productId = props.match.params.prouductID 
    //console.log(props.match.params.prouductID) //->정상적으로 출력

    useEffect(() => {
        axios.get(`${PRODUCT_SERVER}/products_by_id?id=${productId}&type=single`)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setProduct(response.data.goods[0]);
                }
                else {
                    alert('Fail.');
                }
        })
    },[])

    return (
        <div style={{width:'100%', padding:'3rem 4rem'}}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>

            <br />
            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>
                    <ProductImage />
                </Col>
            </Row>
            {/* image */}
            

            {/* info */}
            <ProductInfo />
        </div>
    )
}

export default DetailProductPages
