import React, { Component } from "react";
import "./MultipleImagesPrev.css";
import { Button } from "../button/Button";

export default class MultipleImagePrev extends Component {
  fileObj = [];
  fileArray = [];

  constructor(props) {
    super(props);
    this.state = {
      file: [null],
    };
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  uploadMultipleFiles(e) {
    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    }
    this.setState({ file: this.fileArray });
  }

  uploadFiles(e) {
    e.preventDefault();
    console.log(this.state.file);
  }

  render() {
    return (
        <div className="upload_form">
          <div className="upload_header">Start from images</div>
          <div className="upload_body">
            <form>
              <div className="form-group multi-preview">
                {(this.fileArray || []).map((url) => (
                    <img src={url} alt="..." />
                ))}
              </div>

              <div className="form-group">
                <input
                    type="file"
                    className="form-control"
                    onChange={this.uploadMultipleFiles}
                    multiple
                />
              </div>
              {/*<Button*/}
              {/*  className=""*/}
              {/*  buttonStyle="button-primary"*/}
              {/*  buttonSize="button-full"*/}
              {/*  onClick={this.uploadFiles}*/}
              {/*>*/}
              {/*  Upload*/}
              {/*</Button>*/}
            </form>
          </div>
        </div>

    );
  }
}
