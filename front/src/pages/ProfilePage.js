import React, {useState} from 'react';
import Layout from "../hoc/Layout";
import placeholder from "../assets/images/placeholder.jpg"
import Tabs from "../core/tabs/Tabs";
import useData from "../hooks/useData";
import {useNavigate} from "react-router";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Subscribed Plans')
  const user = useData('/profile-info')
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-5/6 my-10">
          <div className="text-xl text-gray-700 font-semibold leading-6 mb-4">My Profile</div>
          <div className="flex">
            <div className="rounded-lg bg-white w-96 mr-5 shadow">
              <div className="flex justify-center pt-10">
                <img src={user?.avatar || placeholder} alt="" className="rounded-full h-34 w-34 object-cover border-[3px] border-orange-300 p-1"/>
              </div>
              <div className="p-5 mx-5">
                <span className="uppercase text-sm text-gray-500">User Details</span>
                <div className="flex justify-between text-sm pb-2 pt-1">
                  <span className="font-medium">Username</span>
                  <span>{user?.username}</span>
                </div>
                <div className="flex justify-between text-sm pb-5">
                  <span className="font-medium">Email</span>
                  <span>{user?.email}</span>
                </div>
                <div className="border-t pt-5">
                  <span className="uppercase text-sm text-gray-500">Personal Details</span>
                  <div className="flex justify-between text-sm pb-2 pt-1">
                    <span>Age</span>
                    <span>{user?.gymGoer?.age}</span>
                  </div>
                  <div className="flex justify-between text-sm pb-2">
                    <span>Membership type</span>
                    <span>{user?.gymGoer?.membershipType}</span>
                  </div>
                  <div className="flex justify-between text-sm pb-2">
                    <span>Weight</span>
                    <span>{user?.gymGoer?.weight} kg</span>
                  </div>
                  <div className="flex justify-between text-sm pb-2">
                    <span>Height</span>
                    <span>{user?.gymGoer?.height} cm</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <Tabs
                options={['Subscribed Plans', 'Friends', 'Following']}
                selectedOptionState={[activeTab, setActiveTab]}
                className="mx-auto w-1/2 my-5 bg-white rounded-lg"
              />
              {
                activeTab === 'Subscribed Plans' && (
                  <>
                    {
                      user?.subscriptions.map((plan) => (
                        <div
                          onClick={() =>  navigate(`/plans/${plan._id}`)}
                          className="cursor-pointer group transform hover:translate-x-0.5 flex items-center bg-white rounded-lg shadow my-2 py-5 px-8">
                          <div className="flex-1">
                            <span className="text-sm text-gray-600 font-semibold">{plan?.title}</span>
                            <div className="flex items-center mt-1">
                              <div className="flex items-center text-gray-400 text-sm">
                                <i className="fa-solid fa-calendar-days mr-1" aria-hidden="true"/>
                                {plan?.duration} days
                              </div>
                              <div className="flex items-center text-gray-400 text-sm ml-5">
                                <i className="fa-solid fa-trophy mr-1" aria-hidden="true" />
                                {plan?.goal}
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 group-hover:text-indigo-500">
                            View More <i className="fa fa-chevron-right" aria-hidden="true" />
                          </div>
                        </div>
                      ))
                    }
                  </>
                )
              }
              {
                activeTab === 'Friends' && (
                  <div className="flex justify-center">
                    <div className="w-1/2">
                      <span className="flex justify-center text-sm text-gray-500">This is the list of your current friends</span>
                      {
                        user?.friends.map((friend) => (
                          <div className="flex justify-between p-5 bg-white shadow my-2 rounded-lg text-sm font-medium text-gray-700">
                            <div>
                              <i className="fa fa-user mr-4" aria-hidden="true" /> {friend.username}
                            </div>
                            <div className="text-xs text-gray-500">Unfriend</div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }
              {
                activeTab === 'Following' && (
                  <div className="flex justify-center">
                    <div className="w-1/2">
                      <span className="flex justify-center text-sm text-gray-500">Fitness Influencers that you are following</span>
                      {
                        user?.following.map((friend) => (
                          <div className="flex justify-between p-5 bg-white shadow my-2 rounded-lg text-sm font-medium text-gray-700">
                            <div>
                              <i className="fa fa-user mr-4" aria-hidden="true" /> {friend.username}
                            </div>
                            <div className="text-xs text-gray-500">Unfollow</div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
