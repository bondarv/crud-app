import React, { useState } from 'react';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import './App.css';

function App() {
  const usersData = [
    { id: 1, name: 'Tania', username: 'floppydiskette' },
    { id: 2, name: 'Craig', username: 'siliconeidolon' },
    { id: 3, name: 'Ben', username: 'benisphere' },
  ];
  const initialFormState = { id: null, name: '', username: '' };

  const [users, setUsers] = useState(usersData);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);

  function addUser(user) {
    user.id = users.length + 1; // set id
    setUsers([...users, user]);
  }

  function editRow(user) {
    setEditing(true);
    setCurrentUser(user);
  }

  function updateUser(updatedUser) {
    setEditing(false);
    setUsers(
      users.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );
  }

  function deleteUser(id) {
    setEditing(false);
    setUsers(users.filter(user => user.id !== id));
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="section">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="section">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  );
}

export default App;
