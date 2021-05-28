import React from 'react'
import { Component } from 'react';
import imageCompression from 'browser-image-compression';
import Card from 'react-bootstrap/Card';
class ImageCompress extends Component{
    state={
        compressedLink:"http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png",
        originalImage: "",
        originalLink: "",
        clicked: false,
        uploadImage: false
    }
    handle=e=>{
        const image=e.target.files[0];
        this.setState({
            originalLink:URL.createObjectURL(image),
            originalImage: image,
            outputFileName: image.name,
            uploadImage: true
        })
    }
    changeValue = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    click = e => {
        // e.preventDefault();

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true
        };

        if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
            alert("Image is too small, can't be Compressed!");
            return 0;
        }

        let output;
        imageCompression(this.state.originalImage, options)
        .then(x => {
            output = x;
            const downloadLink = URL.createObjectURL(output);
            this.setState({
            compressedLink: downloadLink
            });
        });

        this.setState({ clicked: true });
        return 1;
    };
    render(){
        return(
        <div className="m-5">
            <div className="row mt-5">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                    {this.state.uploadImage ? (
                    <Card.Img
                        className="ht"
                        variant="top"
                        src={this.state.originalLink}
                    ></Card.Img>
                    ) : (
                    null
                    )}
                    <div className="d-flex justify-content-center">
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-2 btn btn-dark w-75"
                            onChange={this.handle}
                        />
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
                    <br />
                    {this.state.outputFileName ? (
                    <button
                        type="button"
                        className=" btn btn-dark"
                        onClick={e => this.click(e)}
                    >
                        Compress
                    </button>
                    ) : (
                    null
                    )}
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
                    
                    {this.state.clicked ? (<div>
                        <Card.Img variant="top" src={this.state.compressedLink}></Card.Img>
                    <div className="d-flex justify-content-center">
                        <a
                        href={this.state.compressedLink}
                        download={this.state.outputFileName}
                        className="mt-2 btn btn-dark w-75"
                        >
                        Download
                        </a>
                        </div>
                    </div>
                    ) : (
                    null
                    )}
                </div>
            </div>
        </div>)
    }
}

export default ImageCompress