import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';

import './user.style';

// /**
//  * Render user list
//  * @param  {array} users  User list
//  * @return {Component}    Users that wrapped in Grid
//  */
// export const renderUsers = (users) => {
//   return (
//     <GridList cellHeight={180}>
//       {(users || []).map((user) => (
//         <GridTile
//           key={user.id}
//           title={user.name}
//           subtitle={user.email}
//         >
//         </GridTile>
//       ))}
//     </GridList>
//   );
// };

/**
 * Render user list
 * @param  {array} users  User list
 * @return {Component}    Users that wrapped in Grid
 */
export const renderUsers = (users) => {
  return (
    <GridList cellHeight={180}>
      {(users || []).map((user) => (
        <GridTile
          key={user.id}
          title={user.title}
        >
          <img src={user.url} />
        </GridTile>
      ))}
    </GridList>
  );
};

/**
 * Render User view
 * @param  {object} model   Model for view
 * @param  {object} handler Handler for view
 * @return {Component}      User component
 */
export const userView = (model, handler) => {
  const { users } = model;
  const { onClick } = handler;

  return (
    <div className="user">
      <h2>Users: {users.length}</h2>

      <div className="mt mb user__buttons">
        <RaisedButton primary label="Get Users" onClick={onClick} />
      </div>

      {renderUsers(users)}
    </div>
  );
};