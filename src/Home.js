import React, { useState } from 'react';
// import { Form, Image, Col } from 'react-bootstrap';
import './styles/Home.css';
import loaderImg from './images/loader_icon.svg';

function App() {
  const [color, setColor] = useState({
    backgroundColor: 'pink',
    imageColor: 'DeepPink'
  });
  const [fileObj, uploadeFile] = useState({
    file: '',
    uploadBtnName: 'UPLOAD LOGO'
  });
  const [showLoader, setLoader] = useState(true);
  const { file, uploadBtnName } = fileObj;
  const { imageColor, backgroundColor } = color;

  function imageUpload(e) {
    uploadeFile({
      file: URL.createObjectURL(e.target.files[0]),
      uploadBtnName: e.target.files[0].name
    });
  }

  return (
    <div className='wrapper-div container-fluid'
      style={{ backgroundColor }}>
      <div className='row'>
        <div className='image-container col-xs-12 col-md-6'>
          <img className={`umbrellaImage ${showLoader ? 'hide' : ''}`}
            src={require(`./images/${imageColor}_umbrella.png`)}
            alt='umbrella'
            onLoad={() => {
              console.log("on load")
              setLoader(false);
            }}
          >
          </img>
          {
            showLoader &&
            <img src={loaderImg} className='loader' alt='loader'>
            </img>
          }
          {
            (file !== '') &&
            <img src={file} className='logo' alt='logo'></img>
          }
        </div>
        <div className='image-options col-xs-12 col-md-6'>
          <div className='title'>
            Custom Umbrella
          </div>
          <div className='color-options'>
            <div className='blue' onClick={() => {
              setLoader(true)
              setColor({ imageColor: 'Blue', backgroundColor: 'lightblue' });
            }}>
            </div>
            <div className='yellow' onClick={() => {
              setLoader(true);
              setColor({ imageColor: 'Yellow', backgroundColor: 'lightyellow' });
            }}>
            </div>
            <div className='pink' onClick={() => {
              setLoader(true);
              setColor({ imageColor: 'DeepPink', backgroundColor: 'lightpink' });
            }}>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 'bold' }}>Customize your umbrella</div>
            Upload logo for instant preview.
            <p>.png and .jpg file only. Max file size 5MB.</p>
          </div>
          <div>
            <div className='upload-button' style={{ backgroundColor: imageColor }}>
              <input id="files" style={{ visibility: "hidden" }} type="file" onChange={(e) => { imageUpload(e) }} />
              <img src={require('./images/upload_icon.svg')} alt='uploadIcon'></img>
              <label htmlFor="files" className="button-text">{uploadBtnName}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
