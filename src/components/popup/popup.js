/* src/components/Popup.js */
import React from 'react';
import InterestedButton from '../button/interested';


const Popup = ({ feature }) => {
  const { id, title } = feature.properties;

  return (
    <div>
      <h3>{title}</h3>
      {id}
      {/* <InterestedButton /> */}
    </div>
  );
};

export default Popup;
