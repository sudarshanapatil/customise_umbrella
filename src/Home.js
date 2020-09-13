import React, { useState } from 'react';
import './styles/Home.css';
import Loader from './components/Loader';

function App() {

  const options = [
    { imageColor: 'blue', backgroundColor: 'lightblue' },
    { imageColor: 'yellow', backgroundColor: 'lightyellow' },
    { imageColor: 'deepPink', backgroundColor: 'lightpink' }];

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
            (file !== '') &&
            <img src={file} className='logo' alt='logo'></img>
          }
        </div>
        <div className='image-options col-xs-12 col-md-6'>
          <div className='title'>
            Custom Umbrella
          </div>
          <div className='color-options'>
            {
              options.map((color) => {
                return (
                  <div className={color.imageColor} key={color.imageColor}
                    onClick={() => { onClickColor(color); }}>
                  </div>)
              })}
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '26px' }}>Customize your umbrella</div>
            Upload logo for instant preview.
            <p style={{ fontSize: 14 }}>.png and .jpg file only. Max file size 5MB.</p>
          </div>
          <div>
            <div className='upload-button' style={{ backgroundColor: imageColor }}>
              <input id="files" style={{ visibility: "hidden" }} type="file" onChange={(e) => { imageUpload(e) }} />
              <img src={require('./images/upload_icon.svg')} alt='uploadIcon'></img>
              <label htmlFor="files" className="button-text">{uploadBtnName}</label>
              {(file !== '') &&
                <img src={require('./images/delete.png')}
                  width='20' height='20'
                  onClick={() => { deleteLogo() }}
                  alt='deleteIcon'>
                </img>
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
