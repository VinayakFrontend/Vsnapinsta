
import React from 'react';
import Posts from './Posts';

const Feed = () => {
  return (
    <div className="flex-1 my-8 flex flex-col items-center md:pl-[20%]  ">
      {/* Feed Layout */}
      <div className="w-full max-w-4xl">
        <Posts />
      </div>
    </div>
  );
};

export default Feed;
