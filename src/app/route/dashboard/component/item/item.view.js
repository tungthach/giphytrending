import React from 'react';
import ClipboardButton from 'react-clipboard.js';

import './item.style';

/**
 * Render Item Content
 *
 * @param  {Object} model    Model for view including component's props & state
 *                             + item: item data
 * @return {Component}       Component include Button content
 */
export const itemView = (model) => {
  const { item, hover, onMouseDown, onMouseOut } = model;
  const {
    images: { original }
  } = item;
  const styling = {
    backgroundImage: `url(${original.url})`
  };

  return (
    <div className="item">
      <div className="giphy-group">
        <div className="giphy">
          <div className="giphy-shot">
            <div className="giphy-img">
              <ClipboardButton
                component="img"
                className="preview"
                button-src={original.url}
                data-clipboard-text={original.url}
                button-onMouseDown={onMouseDown}
                button-onMouseOut={onMouseOut}
                data-delay-hide="1000"
              />
              {hover && <div className="previewed" style={styling} />}
            </div>
            <ul className="tools">
              <li className="fav">
                <span>22</span>
              </li>
              <li className="cmnt">
                <span>181</span>
              </li>
              <li className="views">
                <span>39</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
