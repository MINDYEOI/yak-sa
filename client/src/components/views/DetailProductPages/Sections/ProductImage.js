import React from 'react'
import ImageGallery from 'react-image-gallery'
import { useEffect, useState } from 'react'

function ProductImage(props) {

    const [Images, setImages] = useState([])

    

    useEffect(() => {
        console.log('now ::::::: ', props.goods)
        let images = []
        if (props.goods.images && props.goods.images.length > 0) {

            props.goods.images.map(item => {
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            })
            setImages(images)
        }
    }, [props.goods])
    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
    // return (
    //     <div>
    //         ..
    //     </div>
    // )


}

export default ProductImage
