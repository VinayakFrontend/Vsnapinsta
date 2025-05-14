
// import React, { useState, useEffect } from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import useGetUserProfile from '@/hooks/useGetUserProfile';
// import { Link, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { AtSign, Heart, MessageCircle } from 'lucide-react';

// const Profile = () => {
//   const params = useParams();
//   const userId = params.id;
//   useGetUserProfile(userId);
//   const [activeTab, setActiveTab] = useState('posts');
//   const [isFollowing, setIsFollowing] = useState(false);

//   const { userProfile, user } = useSelector((store) => store.auth);

//   const isLoggedInUserProfile = user?._id === userProfile?._id;

//   // Check follow status
//   useEffect(() => {
//     if (userProfile && user) {
//       setIsFollowing(userProfile.followers.includes(user._id));
//     }
//   }, [userProfile, user]);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleFollow = async () => {
//     try {
//       await fetch(`/api/users/${userProfile._id}/follow`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${user?.token}`,
//         },
//       });
//       setIsFollowing(true);
//     } catch (err) {
//       console.error('Failed to follow user', err);
//     }
//   };

//   const handleUnfollow = async () => {
//     try {
//       await fetch(`/api/users/${userProfile._id}/unfollow`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${user?.token}`,
//         },
//       });
//       setIsFollowing(false);
//     } catch (err) {
//       console.error('Failed to unfollow user', err);
//     }
//   };

//   const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

//   return (
//     <div className="flex justify-center max-w-lg mx-auto px-4 sm:px-8 py-4 mt-[50px]">
//       <div className="flex flex-col gap-12 sm:gap-20 p-4 sm:p-8 w-full ">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//           {/* Profile Picture */}
//           <section className="flex justify-center sm:justify-start">
//             <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
//               <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//           </section>

//           {/* Profile Info */}
//           <section className="flex flex-col gap-4">
//             <div className="flex items-center gap-3">
//               <span className="text-lg sm:text-xl font-semibold">{userProfile?.username}</span>

//               {isLoggedInUserProfile ? (
//                 <>
//                   <Link to="/account/edit">
//                     <Button variant="secondary" className="hover:bg-gray-200 h-8">
//                       Edit profile
//                     </Button>
//                   </Link>
//                   <Button variant="secondary" className="hover:bg-gray-200 h-8">
//                     View archive
//                   </Button>
//                   <Button variant="secondary" className="hover:bg-gray-200 h-8">
//                     Ad tools
//                   </Button>
//                 </>
//               ) : isFollowing ? (
//                 <>
//                   <Button variant="secondary" className="h-8" onClick={handleUnfollow}>
//                     Unfollow
//                   </Button>
//                   <Button variant="secondary" className="h-8">
//                     Message
//                   </Button>
//                 </>
//               ) : (
//                 <Button className="bg-[#0095F6] hover:bg-[#3192d2] h-8" onClick={handleFollow}>
//                   Follow
//                 </Button>
//               )}
//             </div>

//             <div className="flex gap-6 text-sm sm:text-base">
//               <p>
//                 <span className="font-semibold">{userProfile?.posts.length}</span> posts
//               </p>
//               <p>
//                 <span className="font-semibold">{userProfile?.followers.length}</span> followers
//               </p>
//               <p>
//                 <span className="font-semibold">{userProfile?.following.length}</span> following
//               </p>
//             </div>

//             <div className="flex flex-col gap-2">
//               <span className="font-semibold">{userProfile?.bio || 'bio here...'}</span>
//               <Badge className="w-fit" variant="secondary">
//                 <AtSign /> <span className="pl-1">{userProfile?.username}</span>
//               </Badge>
//               <span>😀 Hello... My name is {userProfile?.username}</span>
              
//             </div>
//           </section>
//         </div>

//         {/* Tab Navigation */}
//         <div className="border-t border-t-gray-200 pt-4">
//           <div className="flex items-center justify-center gap-6 sm:gap-10 text-sm sm:text-base">
//             <span
//               className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`}
//               onClick={() => handleTabChange('posts')}
//             >
//               POSTS
//             </span>
//             <span
//               className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`}
//               onClick={() => handleTabChange('saved')}
//             >
//               SAVED
//             </span>
//             <span className="py-3 cursor-pointer">REELS</span>
//             <span className="py-3 cursor-pointer">TAGS</span>
//           </div>

//           {/* Posts Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mt-4">
//             {displayedPost?.map((post) => (
//               <div key={post?._id} className="relative group cursor-pointer">
//                 <img
//                   src={post.image}
//                   alt="postimage"
//                   className="rounded-sm w-full aspect-square object-cover"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <div className="flex items-center text-white space-x-4">
//                     <button className="flex items-center gap-2 hover:text-gray-300">
//                       <Heart />
//                       <span>{post?.likes.length}</span>
//                     </button>
//                     <button className="flex items-center gap-2 hover:text-gray-300">
//                       <MessageCircle />
//                       <span>{post?.comments.length}</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);

  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const { userProfile, user } = useSelector((store) => store.auth);
  const isLoggedInUserProfile = user?._id === userProfile?._id;

  useEffect(() => {
    if (userProfile && user) {
      setIsFollowing(userProfile.followers.includes(user._id));
    }
  }, [userProfile, user]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFollow = async () => {
    try {
      await fetch(`/api/users/${userProfile._id}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setIsFollowing(true);
    } catch (err) {
      console.error('Failed to follow user', err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await fetch(`/api/users/${userProfile._id}/unfollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setIsFollowing(false);
    } catch (err) {
      console.error('Failed to unfollow user', err);
    }
  };

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="flex justify-center max-w-4xl mx-auto px-2 sm:px-4 py-4 mt-[60px]">
      <div className="flex flex-col gap-8 w-full">
        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-12">
          {/* Avatar */}
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
            <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {/* Info & Buttons */}
          <div className="flex flex-col gap-4 w-full">
            {/* Username + Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
              <span className="text-xl font-semibold text-center sm:text-left">{userProfile?.username}</span>

              {isLoggedInUserProfile ? (
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Link to="/account/edit">
                    <Button variant="secondary" className="h-8 px-3 text-sm">
                      Edit profile
                    </Button>
                  </Link>
                  <Button variant="secondary" className="h-8 px-3 text-sm">
                    View archive
                  </Button>
                  <Button variant="secondary" className="h-8 px-3 text-sm">
                    Ad tools
                  </Button>
                </div>
              ) : isFollowing ? (
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Button variant="secondary" className="h-8 px-3 text-sm" onClick={handleUnfollow}>
                    Unfollow
                  </Button>
                  <Button variant="secondary" className="h-8 px-3 text-sm">
                    Message
                  </Button>
                </div>
              ) : (
                <div className="flex justify-center sm:justify-start">
                  <Button className="bg-[#0095F6] hover:bg-[#3192d2] h-8 px-4 text-sm" onClick={handleFollow}>
                    Follow
                  </Button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-4 justify-center sm:justify-start text-sm">
              <p><span className="font-semibold">{userProfile?.posts.length}</span> posts</p>
              <p><span className="font-semibold">{userProfile?.followers.length}</span> followers</p>
              <p><span className="font-semibold">{userProfile?.following.length}</span> following</p>
            </div>

            {/* Bio */}
            <div className="text-center sm:text-left">
              <p className="font-medium">{userProfile?.bio || 'bio here...'}</p>
              <Badge className="w-fit mt-1" variant="secondary">
                <AtSign className="w-3.5 h-3.5" /> <span className="pl-1">{userProfile?.username}</span>
              </Badge>
              <p className="mt-1 text-sm text-gray-700">😀 Hello... My name is {userProfile?.username}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-center gap-6 text-sm">
            {['posts', 'saved', 'reels', 'tags'].map((tab) => (
              <span
                key={tab}
                className={`py-2 cursor-pointer ${activeTab === tab ? 'font-bold border-b-2 border-black' : ''}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Posts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mt-4">
            {displayedPost?.map((post) => (
              <div key={post._id} className="relative group">
                <img
                  src={post.image}
                  alt="post"
                  className="w-full aspect-square object-cover rounded-sm"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                  <div className="flex gap-4 text-white text-sm">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
