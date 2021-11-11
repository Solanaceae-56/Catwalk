import React, {useContext} from 'react';
import AppContext from '../../../index.jsx';
import {InteractionContext} from '../Overview.jsx';

function Bubble(props) {
  var dark = useContext(AppContext);
  var interaction = useContext(InteractionContext);
  var highlight;
  if (props.data.style_id === props.selected) {
    if (dark) {
      highlight = <img className='selector_thumbnails_highlighted' id='styleThumbnail' src={props.data.photos[0].thumbnail_url} onClick={(e) => {props.handleChange(props.data, e); interaction.handleClick(e)}}/>;
    } else {
      highlight = <img className='selector_thumbnails_highlighted_light' id='styleThumbnail' src={props.data.photos[0].thumbnail_url} onClick={(e) => {props.handleChange(props.data, e); interaction.handleClick(e)}}/>;
    }
  } else {
    highlight = <img className='selector_thumbnails' id='styleThumbnail' src={props.data.photos[0].thumbnail_url} onClick={(e) => {props.handleChange(props.data, e); interaction.handleClick(e)}}/>;
  }

  return (
    highlight
  );
}

export default Bubble;