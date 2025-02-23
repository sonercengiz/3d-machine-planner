import React from 'react';

const CustomIcon = ({ src, alt = "icon", ...props }) => {
  return <img src={src} alt={alt} {...props} />;
};

export default CustomIcon;