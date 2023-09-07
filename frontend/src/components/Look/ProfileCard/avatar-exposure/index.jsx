import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

import React, { useState } from 'react';
import { Button, NavLink } from 'react-bootstrap';

export default function AvatarExposur() {
  const [image, setImage] = useState(null);
  
  const handleImageChange = (upImgProfile) => {
    const newImage = upImgProfile.target.files[0];
    setImage(newImage);
  };

  return (
    <div style={{ display:'flex', flexDirection: 'column', margin: 'auto', background: 'gray', width: '250px' , height: '270px' , borderRadius: '4%' }}>
      <img src={image ? URL.createObjectURL(image) : 'default-profile-image.jpg'} alt="" style={{ margin:'20px auto',  width: '150px' , height: '150px', borderRadius: '50%' }}/>
      
     

      <div className='btn btn-outline-warning'><input style={{opacity: "0", position:"absolute"}} type="file" onChange={handleImageChange} accept="image/*" />CARGAR DESDE PC</div>
    </div>
  );
};
