import React, { useState } from 'react';
import './styles/Home.css';
import { Form } from 'react-bootstrap'

import loaderImg from './images/loader_icon.svg';
function App() {
  const [color, setColor] = useState({
    backgroundColor: 'pink',
    imageColor: 'Pink'
  });

  const [file, uploadeFile] = useState('');
  const [showLoader, setLoader] = useState(false);
  const { imageColor, backgroundColor } = color;

  function imageUpload(e) {
    console.log(e.target.files[0]);
    uploadeFile(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className='wrapper-div container-fluid' style={{ backgroundColor: backgroundColor }}>
      <div className='row'>
        <div className='image-container col'>
          {showLoader &&
            <img src={loaderImg} className='loader' alt='loader'>
            </img>
          }
          <img src={require(`./images/${imageColor}_umbrella.png`)}
            width='400'
            height='400'
            alt='umbrella'
          >
          </img>
          {(file !== '') &&
            <img src={file} className='logo' alt='logo'>
            </img>
          }
        </div>
        <div className='image-options col'>
          <div className='title'>
            Custom Umbrella
          </div>
          <div className='color-options'>
            <div className='blue' onClick={() => { setColor({ imageColor: 'Blue', backgroundColor: 'lightblue' }) }}>
            </div>
            <div className='yellow' onClick={() => { setColor({ imageColor: 'Yellow', backgroundColor: 'lightyellow' }) }}>
            </div>
            <div className='pink' onClick={() => { setColor({ imageColor: 'Pink', backgroundColor: 'pink' }) }}>
            </div>
          </div>
          <div>
            <div style={{fontWeight:'bold'}}>Customize your umbrella</div>
            Upload logo for instant preview.
            <p>.png and .jpg file only. Max file size 5MB</p>
          </div>
          <div>
            <input className='upload-button' type="file" name="file" onChange={(e) => { imageUpload(e) }} />
            <Form>
              <Form.File className='myUpload'
                id="custom-file"
                label="Custom file input"
                custom
              />
            </Form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
