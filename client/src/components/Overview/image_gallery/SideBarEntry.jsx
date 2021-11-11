import React, {useContext} from 'react';
import AppContext from '../../../index.jsx';
import {InteractionContext} from '../Overview.jsx';

function SideBarEntry(props) {
  var dark = useContext(AppContext);
  var interaction = useContext(InteractionContext);
  var highlight;
  if (props.entry.url === props.current.url) {
    if (dark) {
      highlight = <img className='thumbnailImg_highlighted' id='sidebarThumbnail' src={props.entry.thumbnail_url} onClick={(e) => {props.handleImgChange(props.entry, e); interaction.handleClick(e)}}/>
    } else {
      highlight = <img className='thumbnailImg_highlighted_light' id='sidebarThumbnail' src={props.entry.thumbnail_url} onClick={(e) => {props.handleImgChange(props.entry, e); interaction.handleClick(e)}}/>
    }

  } else {
    highlight = <img className='thumbnailImg' id='sidebarThumbnail' src={props.entry.thumbnail_url} onClick={(e) => {props.handleImgChange(props.entry, e); interaction.handleClick(e)}}/>;
  }

  return (
    highlight
  );
}

export default SideBarEntry;