import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";

import { Link } from "react-router-dom";
// ConfirmationModal component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    isOpen && (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-6 rounded-md'>
          <p className='text-lg font-semibold mb-4'>{message}</p>
          <div className='flex justify-end'>
            <button className='mr-4 text-gray-500 hover:text-gray-700' onClick={onClose}>
              Cancel
            </button>
            <button className='text-red-700 hover:text-red-900' onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
};

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isSignOutConfirmationOpen, setSignOutConfirmationOpen] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = () => {
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    setDeleteConfirmationOpen(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleSignOut = () => {
    setSignOutConfirmationOpen(true);
  };

  const confirmSignOut = async () => {
    setSignOutConfirmationOpen(false);
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const closeSignOutConfirmation = () => {
    setSignOutConfirmationOpen(false);
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({ ...formData, avatar: downloadURL }));
      }
    );
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingid) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingid}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success === false) {
        return;
      }

      setUserListings((prev) => {
        prev.filter((listing) => listing._id !== listingid);
      });
    } catch (error) {}
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error Image upload (image must be less than 2 mb)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='border p-3 rounded-2xl focus:outline-none'
          onChange={handleChange}
          defaultValue={currentUser.username}
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
          onChange={handleChange}
          className='border p-3 rounded-2xl focus:outline-none'
          defaultValue={currentUser.email}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          autoComplete='current-passsword'
          onChange={handleChange}
          className='border p-3 rounded-2xl focus:outline-none'
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link to='/create-listing' className='bg-green-700 text-white p-3 rounded-2xl uppercase text-center hover:opacity-90'>
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDelete} className='text-red-700 cursor-pointer'>
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>

      <p className='text-red-700 mt-5'>{error ? error : ""}</p>
      <p className='text-green-700'>{updateSuccess ? "User is Updated Successfully!" : ""}</p>
      <button className='text-green-700 w-full' onClick={handleShowListings}>
        Show Listings
      </button>
      <p className='text-red-700 mt-5'>{showListingsError ? "Error showing listings!" : ""}</p>
      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center  text-2xl font-semibold'>Your Listings</h1>
          {userListings.map((listing) => (
            <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt='listings' className='h-16 w-16 object-contain' />
              </Link>

              <Link to={`/listing/${listing._id}`} className='text-slate-700 font-semibold flex-1 hover:underline truncate'>
                <p>{listing.name}</p>
              </Link>
              <div className='flex flex-col items-center'>
                <button onClick={() => handleListingDelete(listing._id)} className='text-red-700 uppercase'>
                  Delete
                </button>
                <button className='text-green-700 uppercase'>Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={confirmDelete}
        message='Are you sure you want to delete your account?'
      />
      <ConfirmationModal
        isOpen={isSignOutConfirmationOpen}
        onClose={closeSignOutConfirmation}
        onConfirm={confirmSignOut}
        message='Are you sure you want to sign out?'
      />
    </div>
  );
};

export default Profile;
