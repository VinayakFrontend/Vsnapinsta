
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="w-full sm:w-fit my-10 px-4 sm:px-0 sm:pr-32">
      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-2">
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className="font-semibold text-sm">
            <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          </h1>
          <span className="text-gray-600 text-sm">{user?.bio || 'Bio here...'}</span>
        </div>
      </div>

      {/* Suggested Users */}
      <SuggestedUsers />
    </div>
  );
};

export default RightSidebar;
