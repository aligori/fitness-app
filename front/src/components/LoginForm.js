import React, {useContext, useState} from 'react';
import DefaultButton from "../core/buttons/DefaultButton.js";
import {API} from "../utils/plugins/API";
import {showError} from "../utils/helpers";
import {AuthContext} from "../context/AuthProvider";
import {useNavigate} from "react-router";

const Option = ({ disabled, onClick, label, checked }) => {
  return (
    <div
      className={`${disabled? 'bg-gray-100 hover:bg-gray-100' : 'cursor-pointer bg-indigo-50'} flex flex-1 my-1 border py-5 rounded items-center justify-center text-gray-800 font-semibold transition duration-200 ${checked ? 'border-2 border-indigo-400' : 'hover:bg-indigo-100'}`}
      onClick={disabled ? () => {} : onClick}>
      {label}
    </div>
  )
}

const LoginForm = () => {
  const [showSelectStep, setShowSelectStep] = useState(false);
  const [type, setType] = useState('goer');
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState({});

  const [auth, onAuthChange] = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    onAuthChange({ ...auth, user: selectedUser })
  };

  const fetchUsers = async () => {
    try {
      const response = await API.get('/users', { type })
      setUsers(response.data)
      setShowSelectStep(true)
    } catch (err) {
      showError('An error has occurred!')
    }
  }

  return (
    <div className="max-w-md w-full space-y-8 p-8 bg-white shadow border rounded-2xl">
      <>
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
        </div>
        {
          showSelectStep ? <form className="mt-8 space-y-6" onSubmit={onSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="font-semibold mb-2">
                  Select {type === 'goer' ? 'Gym Goer' : 'Fitness influencer'}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {
                    users.map((user) =>
                      <div
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className={`${selectedUser === user ? 'border-indigo-500' : ''} hover:ring-1 hover:ring-indigo-100 cursor-pointer hover:bg-gray-100 transition duration-200 rounded-md border px-5 py-3 my-1 mx-2`}>
                        <div className="flex">
                          <img src={user.avatar} alt="" className="h-12 rounded-full mr-4"/>
                          <div className="flex-1">
                            <div className="text-sm">{user.username}</div>
                            <div className="text-xs">{user.email}</div>
                          </div>
                        </div>
                      </div>)
                  }
                </div>
              </div>
              <DefaultButton disabled={!selectedUser} md type="submit" label="Sign in"/>
            </form> :
            <div>
              <div className="mt-8 flex flex-col">
                <Option label="Gym Goer" onClick={() => setType('goer')} checked={type === 'goer'}/>
                <Option disabled label="Fitness Influencer" onClick={() => setType('influencer')}
                        checked={type === 'influencer'}/>
                <DefaultButton onClick={fetchUsers} label="Sign in" className="mt-2"/>
                <span className="text-center uppercase tracking-tight my-3 text-gray-600">OR</span>
                <div
                  className={`hover:bg-gray-100 transition duration-300 flex flex-1 my-1 border py-2 text-sm rounded items-center justify-center cursor-pointer text-gray-800 font-semibold transition duration-200`}
                  onClick={() => navigate('/reports')}>
                  View Reports
                </div>
              </div>
            </div>
        }
      </>
    </div>
  );
};

export default LoginForm;