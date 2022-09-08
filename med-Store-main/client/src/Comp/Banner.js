

import React from 'react'

const Banner = () => {
    return (
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="https://img.freepik.com/free-vector/medicines-drug-collection-with-banner-free-space_65709-20.jpg?size=626&ext=jpg" class="d-block w-100" style={{ height :"100%", maxHeight:"500px",}} alt="..." />
                </div>
                <div class="carousel-item">
                    <img src="https://i.pinimg.com/originals/e7/0a/3d/e70a3dc1ddc455224ac68b43a0baa3fd.jpg" class="d-block w-100" style={{ height :"100%", maxHeight:"500px",}} alt="..." />
                </div>
                <div class="carousel-item">
                    <img src="https://www.medgadget.com/wp-content/uploads/2019/03/Homeopathy.jpg" class="d-block w-100" style={{ height :"100%", maxHeight:"500px",}} alt="..." />
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Banner
