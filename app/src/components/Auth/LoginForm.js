import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import Input from '@core/inputs/Input';
import DefaultButton from '@core/buttons/electrons/DefaultButton';
import PasswordInput from '@core/inputs/PasswordInput';

const LoginForm = () => {
  // const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <Input
            label="Username"
            value={username}
            placeholder="Username"
            className="rounded-b-none"
            onChange={setUsername}
            extraClasses="xs:text-sm md:text-lg"
          />
          <div className="relative">
            <div className="w-full mt-2">
              <PasswordInput
                name="password"
                label="Password"
                placeholder="Password"
                textSize="text-xs"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <DefaultButton md type="submit" label="Sign in" />
      </form>
    </>
  );
};

export default LoginForm;
