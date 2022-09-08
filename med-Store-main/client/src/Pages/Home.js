
import React, { useState, useEffect, useContext } from 'react';
import Banner from '../Comp/Banner';
import Banner_3 from '../Comp/Banner_3';
import NavCategory from '../Comp/NavCategory';
import ShopByCat from '../Comp/ShopByCat';
import store from '../store/Store';


const Home = () => {
    const { productData } = useContext(store)

    const [allopathyData, setallopathyData] = useState([])
    const [homeopathyData, sethomeopathyData] = useState([])
    const [aryuvedaData, setaryuvedaData] = useState([])
    const [careData, setcareData] = useState([])



    useEffect(() => {
        if (productData.length != 0) {
            setallopathyData(productData.filter(val => val.category == "allopathy"))
            sethomeopathyData(productData.filter(val => val.category == "homeopathy"))
            setaryuvedaData(productData.filter(val => val.category == "aryuveda"))
            setcareData(productData.filter(val => val.category == ""))
        }
    }, [productData])



    return (
        <div class="container-fluid p-0">

            <NavCategory />
            <Banner />
            <Banner_3 />

            {allopathyData.length != 0 &&

                <div class="px-4 my-5 py-3 " style={{ background: "#e9f7f4" }}>
                    <h3>Shop By Allopathy</h3>
                    <ShopByCat product={allopathyData} />
                </div>

            }

            {homeopathyData.length != 0 &&

                <div class="px-4 my-5 py-3 " style={{ background: "#e9f7f4" }}>
                    <h3>Shop By Homeopathy</h3>
                    <ShopByCat product={homeopathyData} />
                </div>

            }

            <Banner_3 />

            {aryuvedaData.length != 0 &&

                <div class="px-4 my-5 py-3 " style={{ background: "#e9f7f4" }}>
                    <h3>Shop By Aryuveda</h3>
                    <ShopByCat product={aryuvedaData} />
                </div>

            }

            {careData.length != 0 &&

                <div class="px-4 my-5 py-3 " style={{ background: "#e9f7f4" }}>
                    <h3>Shop By Baby & Personal Care</h3>
                    <ShopByCat product={careData} />
                </div>

            }



        </div>
    )
}

export default Home
