

import React, { useState, useEffect } from 'react';
import "./ProductBreakdown.css";
export default function ProductBreakdown(props) {
  const characteristics = {
    Size: ["A size too small", "Perfect", "A size too big"],
    Width: ["Too narrow", "Perfect", "Too wide"],
    Comfort: ["Uncomfortable", "Ok", "Perfect"],
    Quality: ["Poor", "What I exoected", "Perfect"],
    Length: ["Runs short", "Perfect", "Runs long"],
    Fit: ["Runs tight", "Perfect", "Runs loose"]
  }
  useEffect(() => {

  }, [props])
  return (
    <div className="productBreakdown">
      <div class="progress-bar">
        <ul class="label-bar">
          <li><span>state1</span></li>
          <li><span>state3</span></li>
          <li><span>state5</span></li>
        </ul></div>

    </div>
  )
}