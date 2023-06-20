import React, {useContext, useState} from 'react';
import {AuthContext} from "../context/AuthProvider";
import {API} from "../utils/plugins/API";
import {showError, showSuccess} from "../utils/helpers";
import {useNavigate} from "react-router";
import Modal from "../core/modals/Modal";

const Dropdown = () => {
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(false);
  const [auth, onAuthChange] = useContext(AuthContext)
  const navigate = useNavigate()

  const logOut = () => {
    onAuthChange({ ...auth, user: undefined })
  }

  const migrate = async () => {
    try {
      await API.post('/migrate')
      showSuccess('Migrated Successfully!')
    } catch (err) {
      showError(err.message)
    }
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        {
          auth.user && (
            <span
              onClick={() => setShow((prev) => !prev)}
              className="flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 cursor-pointer"
              aria-expanded="true"
              aria-haspopup="true">
            <div className="flex justify-center items-center rounded-full border border-gray-100 shadow-sm w-7 h-7 mr-2 text-xs bg-primary-600 text-white">
              <img src={auth.user.avatar} alt="" className="rounded-full"/>
            </div>
            <div className="flex flex-col">
              {auth.user.username}
            </div>
              <i className="fa-solid fa-chevron-down ml-2 text-gray-500"/>
          </span>
          )
        }
      </div>

      {show && (
        <div
          className="origin-top-right absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1">
          <div className="py-1" role="none">
            <span
              onClick={() => navigate('/profile')}
              className="block px-4 font-medium py-2 text-sm cursor-pointer hover:bg-gray-100">
              Profile
            </span>
            <span
              onClick={() => setOpenModal(prev => !prev)}
              className="text-red-600 block px-4 font-medium py-2 text-sm cursor-pointer hover:bg-gray-100 hover:text-red-700">
              Migrate to NoSQL
            </span>
            <span
              onClick={logOut}
              className="block px-4 font-medium py-2 text-sm cursor-pointer hover:bg-gray-100">
              Log Out
            </span>
          </div>
        </div>
      )}
      {
        openModal && (
          <Modal
            setOpenModal={setOpenModal}
            onConfirm={migrate}
          >
            Are you sure that you want to migrate to NoSql?
          </Modal>
        )
      }
    </div>
  );
};

export default Dropdown;
