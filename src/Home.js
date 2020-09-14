import React, { useState } from 'react';
import './styles/Home.css';
import Loader from './components/Loader';

function App() {
  const options = [
    { imageColor: 'blue', backgroundColor: 'lightblue' },
    { imageColor: 'yellow', backgroundColor: 'lightyellow' },
    { imageColor: 'deepPink', backgroundColor: 'lightpink' }
  ];
  const [color, setColor] = useState({
    backgroundColor: 'pink',
    imageColor: 'deepPink'
  });
  const [colorLoader, setColorLoader] = useState({
    'deepPink': 0,
    'blue': 0,
    'yellow': 0
  });
  const [fileObj, uploadeFile] = useState({
    file: '',
    uploadBtnName: 'UPLOAD LOGO'
  });
  const [showLoader, setLoader] = useState(true);
  const { file, uploadBtnName } = fileObj;
  const { imageColor, backgroundColor } = color;

  function onClickColor(color) {
    if (colorLoader[color.imageColor] === 0) {
      setLoader(true);
    }
    setColor({ imageColor: color.imageColor, backgroundColor: color.backgroundColor });
  }

  function imageUpload(e) {
    uploadeFile({
      file: URL.createObjectURL(e.target.files[0]),
      uploadBtnName: e.target.files[0].name
    });
  }

  function deleteLogo() {
    uploadeFile({ file: '', uploadBtnName: 'UPLOAD LOGO' });
  }

  function callOnLoad(imageColor) {
    setColorLoader({ ...colorLoader, [imageColor]: 1 });
    setLoader(false);
  }

  return (
    <div className='wrapper-div container-fluid'
      style={{ backgroundColor }}>
      <div className='row'>
        <div className='image-container col-xs-12 col-md-6'>
          <img className={`umbrellaImage ${showLoader ? 'hide' : ''}`}
            src={require(`./images/${imageColor}_umbrella.png`)}
            alt='umbrella'
            onLoad={() => { callOnLoad(imageColor) }}
          >
          </img>
          {
            showLoader &&
            <Loader color={imageColor} />
          }
          {
            (file !== '') && <img src={file} className='logo' alt='logo'></img>
          }
        </div>
        <div className='image-options col-xs-12 col-md-6'>
          <div className='title row'>
            Custom Umbrella
          </div>
          <div className='color-options row'>
            {
              options.map((option) => {
                let clickedColor = `click-${color.imageColor}`;
                return (
                  <div className={`${option.imageColor} ${option.imageColor === color.imageColor ? clickedColor : ''}  `}
                    key={option.imageColor}
                    onClick={() => { onClickColor(option); }}>
                  </div>)
              })}
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '26px' }}>Customize your umbrella</div>
            Upload logo for instant preview.
            <p style={{ fontSize: 14 }}>.png and .jpg file only. Max file size 5MB.</p>
          </div>
          <div className='upload-button' style={{ backgroundColor: imageColor }}>
            <input id="files" style={{ visibility: "hidden" }} type="file" onChange={(e) => { imageUpload(e) }} />
            <img src={require('./images/upload_icon.svg')} alt='uploadIcon'></img>
            <label htmlFor="files" className="button-text">{uploadBtnName}</label>
            {(file !== '') &&
              <svg width="28.3" height="31.2" viewBox="0 0 20 20" onClick={() => { deleteLogo() }}>
                <path fill="white" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
              </svg>
            }
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
