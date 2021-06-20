import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];

            props.detail.images && props.detail.images.map(item => {
                images.push({
                    original: `http://3.209.242.35/${item}`,
                    thumbnail: `http://3.209.242.35/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div>
            <ImageGallery showFullscreenButton={false} showPlayButton={false} items={Images} />
        </div>
    )
}

export default ProductImage
