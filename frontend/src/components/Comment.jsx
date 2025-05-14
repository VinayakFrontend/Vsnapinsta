
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Comment = ({ comment }) => {
  return (
    <div className="my-2 px-2">
      <div className="flex items-start gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment?.author?.profilePicture} alt="User avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-sm sm:text-base leading-snug break-words">
          <span className="font-bold">{comment?.author.username}</span>
          <span className="pl-1">{comment?.text}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
