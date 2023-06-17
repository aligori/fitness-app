import React, {useContext, useState} from 'react';
import AuthLayout from "../hoc/AuthLayout.js";
import {Navigate} from "react-router";
import {AuthContext} from "../context/AuthProvider";
import {API} from "../utils/plugins/API";
import Lottie from "../core/Lottie";
import animation from '../assets/animations/processing.json'
import {showError, showSuccess} from "../utils/helpers";

const FillDatabasePage = () => {
  const [auth, onAuthChange] = useContext(AuthContext);
  const [filling, setFilling] = useState(false);

  if(auth.dbFilled) {
    return <Navigate to="/login" />;
  }

  const fillDatabase = async () => {
    try {
      setFilling(true);
      await API.post('/fill-database').then(() => {
        showSuccess('Database filled!')
        setTimeout(() => {
          onAuthChange({ dbFilled: true })
        }, 1000)
      })
    } catch (err) {
      showError('Error while filling the database!')
    } finally {
      setFilling(false)
    }
  }

  return (
    <AuthLayout>
      <div className={`bg-white text-2xl font-bold text-center text-indigo-500 rounded-lg border shadow-md p-8 w-1/3 ${filling? 'cursor-wait' : 'cursor-pointer transition duration-400 hover:scale-105'}`} onClick={!filling ? fillDatabase : () => {}}>
        {filling ? <div>Initializing <span className="animate-pulse">...</span></div> : 'Initialize Database'}
        <div className="flex justify-center">
          {filling && <div className="py-5">
            <Lottie itemKey="loadingItem" animationData={animation} width={150} />
          </div>}
        </div>
      </div>
    </AuthLayout>
  );
};

export default FillDatabasePage;
