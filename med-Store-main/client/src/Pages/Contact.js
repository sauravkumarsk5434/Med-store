
import React from 'react'

const Contact = () => {
    return (
        <div class="row m-0 p-4 text-center">
             <h2 class="text-secondary mb-5">Way To Touch With Us</h2>
            <div class="col-md-6">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d90887.0588487581!2d77.26050301268799!3d28.636513755786687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1641040087100!5m2!1sen!2sin" width="90%" height="400px" allowfullscreen="" loading="lazy"></iframe>
            </div>
            <div class="col-md-6 p-4 border rounded-3">
                <div class="row text-start">
                    <div class=" col-md-6 mb-3">
                        <label for="exampleInputEmail1" class="form-label text-dark">Name</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div class=" col-md-6 mb-3">
                        <label for="exampleInputEmail1" class="form-label text-dark">Mobile</label>
                        <input type="email" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" />
                    </div>

                    <div class=" col-md-12 mb-3">
                        <label for="exampleInputEmail1" class="form-label text-dark">Email
                            address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" />
                    </div>

                    <div class="col-md-12 mb-3">
                        <label for="floatingTextarea" class="form-label text-dark">Enter Meassage</label>
                        <textarea class="form-control" id="floatingTextarea"></textarea>
                    </div>

                    <button class="btn btn-primary col-md-2 mt-3 ms-3">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Contact
