import React, { useState, useContext } from 'react';
import { GetUserApi, PostUserApi } from '../api';
import store from '../store/Store';
import Notiflix from 'notiflix';
import { useHistory } from 'react-router-dom';

const formval = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: ""
}

const Header = () => {
    const history = useHistory()
    const [userData, setuserData] = useState(formval);
    const [text, settext] = useState("");
    const [displayprod, setdisplayprod] = useState([])

    const { cartval, productData, login, setlogin } = useContext(store)
   

    const PostUser = async () => {
        if (userData.firstName != "") {
            if (userData.lastName != "") {
                if (userData.mobile != "") {
                    if (userData.email != "") {
                        if (userData.password != "") {
                            if (userData.cpassword != "") {
                                const res = await PostUserApi(userData)
                                if (res.data == "User Exist") {
                                    Notiflix.Notify.failure("User Exist ! Use Different Email")
                                } else if (res.data == "Registration Failed") {
                                    Notiflix.Notify.failure("Registration Failed")
                                } else {
                                    Notiflix.Notify.success("Login Success");
                                    document.querySelectorAll(".btn-close")[1].click()
                                    setlogin(res.data[0])
                                    localStorage.setItem("user", JSON.stringify(res.data[0]))
                                }
                            } else {
                                Notiflix.Notify.failure("Please Enter confirm Password")
                            }
                        } else {
                            Notiflix.Notify.failure("Please Enter Password")
                        }
                    } else {
                        Notiflix.Notify.failure("Please Enter Email")
                    }
                } else {
                    Notiflix.Notify.failure("Please Enter Mobile")
                }
            } else {
                Notiflix.Notify.failure("Please Enter Last Name")
            }
        } else {
            Notiflix.Notify.failure("Please Enter First Name")
        }

    }

    const GetUser = async () => {
        if (userData.email != "") {
            if (userData.password != "") {

                const res = await GetUserApi(userData)
                if (res.data == "invalid credentials") {
                    Notiflix.Notify.failure("Invalid Credentials")
                } else {
                    Notiflix.Notify.success("Login Success");
                    document.querySelector(".btn-close").click()
                    setlogin(res.data)
                    localStorage.setItem("user", JSON.stringify(res.data))
                }

            } else {
                Notiflix.Notify.failure("Please Enter Password")
            }
        } else {
            Notiflix.Notify.failure("Please Enter Email")
        }

    }

    const searchProduct = (e) => {

        settext(e.target.value);

        if (e.target.value == "") {
            setdisplayprod([])
        } else {
            const res = productData.filter(val => val.title.toLowerCase().includes(text.toLowerCase()));
            setdisplayprod(res.slice(0, 10))
        }

    }

    return (
        <nav class="navbar navbar-expand-md navbar-dark " style={{ background: "#51C9A6" }}>
            <div class="container-fluid">
                <a class="navbar-brand mx-4" style={{ cursor: "pointer", fontSize:"26px" }} onClick={() => history.push('/')}>Med Store</a>

                <div class="d-flex mx-auto  w-50 mx-2" style={{width:"30%"}}>
                        <span style={{ position: "absolute", zIndex: "999", transform: "translate(0px,40px)", backgroundColor: "white", width: "35%" }}>
                            {displayprod.length != 0 &&

                                <ul style={{ listStyleType: "none", cursor: "pointer" }}>
                                    {displayprod.map(item => {
                                        return (
                                            <li onClick={() => {
                                                history.push(`/product/${item.id}`)
                                                settext("")
                                                setdisplayprod([])
                                            }}>{item.title}</li>
                                        )
                                    })}
                                </ul>

                            }

                        </span>
                        <input class="form-control  me-2" type="text" value={text} onChange={searchProduct} placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-light" >Search</button>

                    </div>


                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    

                    <ul class="navbar-nav ms-auto d-flex mb-2 mb-lg-0 px-3 justify-content-around" style={{ width: "50%", minWidth:"360px" }}>
                        <li class="nav-item">
                            <a class="nav-link active" style={{ cursor: "pointer" }} aria-current="page" onClick={() => history.push("/about")} >About Us</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" style={{ cursor: "pointer" }} aria-current="page" onClick={() => history.push("/contact")} >Contact Us</a>
                        </li>
                        <li class="nav-item">

                            {login.firstName != undefined ?

                                <>

                                    <div class="dropdown">
                                        <a class=" nav-link active dropdown-toggle" style={{ cursor: "pointer" }} role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">{login.firstName} </a>

                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            <li><a class="dropdown-item" style={{ cursor: "pointer" }} onClick={() => {
                                                history.push('/order')
                                            }} >Orders</a></li>
                                            <li><a class="dropdown-item" style={{ cursor: "pointer" }} onClick={() => {
                                                setlogin({});
                                                localStorage.removeItem("user")
                                                history.push("/");
                                            }} >Logout</a></li>

                                        </ul>
                                    </div>

                                   


                                </> :

                                <li><a class="nav-link active" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#exampleModalToggle">LOGIN/SIGNUP</a></li>

                            }

                            <div class="modal fade" id="exampleModalToggle" aria-hidden="true"
                                aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title text-danger" id="exampleModalToggleLabel">Login Here !</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div style={{ padding: "10px" }} >
                                                <div class="mb-3">
                                                    <label for="exampleInputEmail1" class="form-label text-dark">Email
                                                        address</label>
                                                    <input type="email" class="form-control" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" value={userData.email} onChange={(e) => setuserData({ ...userData, email: e.target.value })} />
                                                </div>

                                                <div class="mb-3">
                                                    <label for="exampleInputPassword1"
                                                        class="form-label  text-dark">Password</label>
                                                    <input type="password" class="form-control" id="exampleInputPassword1" value={userData.password} onChange={(e) => setuserData({ ...userData, password: e.target.value })} />
                                                </div>

                                                <div class="d-flex justify-content-between">
                                                    <button type="submit" class="btn btn-outline-success" onClick={GetUser}>Submit</button>
                                                    <button type="button" class="btn btn-primary"
                                                        data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
                                                        data-bs-dismiss="modal">New! Create
                                                        Account</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="modal fade" id="exampleModalToggle2" aria-hidden="true"
                                aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">

                                        <div class="modal-header">
                                            <h5 class="modal-title text-danger">Signup Here !</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>

                                        <div class="modal-body">

                                            <div class="row p-2">

                                                <div class="row">
                                                    <div class="col">
                                                        <input type="text" class="form-control" placeholder="First name"
                                                            id="fname" value={userData.firstName} onChange={e => setuserData({ ...userData, firstName: e.target.value })} />
                                                        <span id="fname-error" class="text-danger"></span>
                                                    </div>
                                                    <div class="col">
                                                        <input type="text" class="form-control" placeholder="Last name"
                                                            value={userData.lastName} onChange={e => setuserData({ ...userData, lastName: e.target.value })} id="lname" />
                                                        <span id="lname-error" class="text-danger"></span>
                                                    </div>
                                                </div>

                                                <input type="email" placeholder="Enter Your Email" class="form-control mt-3"
                                                    id="email" value={userData.email} onChange={e => setuserData({ ...userData, email: e.target.value })} />
                                                <span id="email-error" class="text-danger"></span>

                                                <input type="tel" placeholder="Enter Your Mobile" class="form-control mt-3"
                                                    id="phone" value={userData.mobile} onChange={e => setuserData({ ...userData, mobile: e.target.value })} />
                                                <span id="phone-error" class="text-danger"></span>

                                                <input type="password" placeholder="Enter Your Password"
                                                    class="form-control mt-3" id="password"
                                                    value={userData.password} onChange={e => setuserData({ ...userData, password: e.target.value })} />
                                                <span id="password-error" class="text-danger"></span>

                                                <input type="password" placeholder="Confirm Your Password"
                                                    class="form-control mt-3" id="cpassword"
                                                    value={userData.cpassword} onChange={e => setuserData({ ...userData, cpassword: e.target.value })} />
                                                <span id="cpassword-error" class="text-danger"></span>

                                                <div class="d-flex justify-content-between mt-5">
                                                    <button type="submit" class="btn btn-outline-success" onClick={PostUser}>Submit</button>
                                                    <button type="button" class="btn btn-primary"
                                                        data-bs-target="#exampleModalToggle" data-bs-toggle="modal"
                                                        data-bs-dismiss="modal">Already there! Sign
                                                        In</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item" style={{ cursor: "pointer" }}>
                            <i onClick={() => history.push("/cart")} class="bi bi-cart3 text-white fs-3"></i>
                            <span style={{ position: "absolute", bottom: "30px", color: "white" }}>{cartval}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
