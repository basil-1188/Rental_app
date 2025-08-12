import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Added useDispatch
import { useNavigate } from 'react-router-dom';
import { deleteAccountFailure, deleteAccountSuccess, deleteUserStart, signOutUserStart } from '../redux/user/userSlice';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();
  const userInitial = currentUser?.username?.charAt(0).toUpperCase() || '';

  const handleLogout = async() => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/server/auth/logout');
      const data = await res.json();
      if(data.success === false) {
      dispatch(deleteAccountFailure(error.message));
        return;
      }
      dispatch(deleteAccountSuccess());
    console.log('Logged out');
    navigate('/login');
    } catch (error) {
      dispatch(deleteAccountFailure(error.message));
    }
    
  };

  const handleDeleteAccount = async () => {
  if (window.confirm('Are you sure you want to permanently delete your account?')) {
    try {
      dispatch(deleteUserStart());
      
      const res = await fetch(`/server/user/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        credentials: 'include'
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete account');
      }
      
      dispatch(deleteAccountSuccess());
      navigate('/');
    } catch (error) {
      dispatch(deleteAccountFailure(error.message));
    }
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 text-center">
            <div className="flex justify-center">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white/20 text-white text-4xl font-bold border-4 border-white/30">
                {userInitial}
              </div>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-white">{currentUser?.username}</h1>
            <p className="text-teal-100">{currentUser?.email}</p>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-500">Account Type</h3>
                <p className="text-lg font-medium text-black capitalize">
                  {currentUser?.role}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-500">Email</h3>
                <p className="text-lg font-medium text-black">
                  {currentUser?.email}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {currentUser?.role === 'owner' ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-500">Properties Listed</h3>
                  <p className="text-lg font-medium text-black">12</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-500">Properties Rented</h3>
                  <p className="text-lg font-medium text-black">5</p>
                </div>
              )}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-500">Member Since</h3>
                <p className="text-lg font-medium text-black">
                  {new Date(currentUser?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleLogout}
                className="flex-1 bg-white border border-teal-600 text-teal-600 hover:bg-teal-50 py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                Logout
              </button>
              
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}