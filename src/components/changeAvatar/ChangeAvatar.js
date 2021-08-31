import React, { useRef, useState, useEffect } from 'react';
import './ChangeAvatar.css';

export default function ChangeAvatar() {
  const preview = useRef();
  const [file, setFile] = useState()

  useEffect ( () => { 
    if (file) {
      preview.current.src = URL.createObjectURL(file);
    }
    else {
      preview.current.src = "assets/person/defaultUser.jpg";
    }
  }, [file]);

  return (
    <div className="changeAvatar">
      <label htmlFor="changeAvatarFile" className="changeAvatarLabel">
        <img src="" className="changeAvatarPreview"  ref={preview} alt="" />
      </label>
      <input type="file" onChange={(e) => { setFile(e.target.files[0])}} id="changeAvatarFile" style={{display: 'none'}} />
    </div> 
  )
}