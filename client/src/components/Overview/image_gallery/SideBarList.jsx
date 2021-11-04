import React from 'react';
import SideBarEntry from './SideBarEntry.jsx';

function SideBarList(props) {

  return (
    <div id='sideimgBar'>
      {props.list.map(entry =>
        <SideBarEntry entry={entry} current={props.current} handleImgChange={props.handleImgChange}/>
      )}
    </div>
  )

}

export default SideBarList;