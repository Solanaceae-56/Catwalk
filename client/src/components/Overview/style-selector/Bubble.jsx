import React, {useContext} from 'react';
import AppContext from '../../../index.jsx';

function Bubble(props) {
  var dark = useContext(AppContext);
  var highlight;
  if (props.data.style_id === props.selected) {
    if (dark) {
      highlight = <img className='selector_thumbnails_highlighted' src={props.data.photos[0].thumbnail_url} onClick={props.handleChange.bind(this, props.data)}/>;
    } else {
      highlight = <img className='selector_thumbnails_highlighted_light' src={props.data.photos[0].thumbnail_url} onClick={props.handleChange.bind(this, props.data)}/>;
    }
  } else {
    highlight = <img className='selector_thumbnails' src={props.data.photos[0].thumbnail_url} onClick={props.handleChange.bind(this, props.data)}/>;
  }

  return (
    highlight
  );
}

export default Bubble;