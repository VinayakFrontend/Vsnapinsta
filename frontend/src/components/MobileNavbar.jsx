
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const MobileNavbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector((store) => store.realTimeNotification);
  const navigate = useNavigate();

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between z-50">
      {/* Logo */}
      <h1 onClick={() => navigate('/')} className="text-xl font-bold cursor-pointer">MyGram</h1>

      {/* Right icons */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <div className="relative cursor-pointer" onClick={() => navigate('/notifications')}>
          <Heart className="w-6 h-6 text-gray-800" />
          {likeNotification.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {likeNotification.length}
            </span>
          )}
        </div>

        {/* Messages */}
        <MessageCircle
          className="w-6 h-6 text-gray-800 cursor-pointer"
          onClick={() => navigate('/chat')}
        />

        {/* Profile */}
        <div onClick={() => navigate(`/profile/${user?._id}`)} className="cursor-pointer">
          <Avatar className="w-6 h-6">
            <AvatarImage src={user?.profilePicture} alt="@user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
