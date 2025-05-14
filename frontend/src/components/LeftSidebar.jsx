
// import {
//     Heart,
//     Home,
//     LogOut,
//     MessageCircle,
//     PlusSquare,
//     Search,
//     TrendingUp,
//   } from 'lucide-react';
//   import React, { useState } from 'react';
//   import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
//   import { toast } from 'sonner';
//   import axios from 'axios';
//   import { useNavigate } from 'react-router-dom';
//   import { useDispatch, useSelector } from 'react-redux';
//   import { setAuthUser } from '@/redux/authSlice';
//   import CreatePost from './CreatePost';
//   import { setPosts, setSelectedPost } from '@/redux/postSlice';
//   import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
//   } from './ui/popover';
//   import { Button } from './ui/button';

//   const LeftSidebar = () => {
//     const navigate = useNavigate();
//     const { user } = useSelector((store) => store.auth);
//     const { likeNotification } = useSelector((store) => store.realTimeNotification);
//     const dispatch = useDispatch();
//     const [open, setOpen] = useState(false);

//     const logoutHandler = async () => {
//       try {
//         const res = await axios.get('http://192.168.0.104:5000/api/v1/user/logout', {
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           dispatch(setAuthUser(null));
//           dispatch(setSelectedPost(null));
//           dispatch(setPosts([]));
//           navigate('/login');
//           toast.success(res.data.message);
//         }
//       } catch (error) {
//         toast.error(error.response?.data?.message || 'Logout failed');
//       }
//     };

//     const sidebarHandler = (textType) => {
//       switch (textType) {
//         case 'Logout':
//           logoutHandler();
//           break;
//         case 'Create':
//           setOpen(true);
//           break;
//         case 'Profile':
//           navigate(`/profile/${user?._id}`);
//           break;
//         case 'Home':
//           navigate('/');
//           break;
//         case 'Messages':
//           navigate('/chat');
//           break;
//         case 'Search':
//         //   toast.info('Search functionality coming soon');
//         navigate('/search');
//           break;
//         default:
//           break;
//       }
//     };

//     const sidebarItems = [
//       { icon: <Home />, text: 'Home' },
//       { icon: <Search />, text: 'Search' },
//       { icon: <TrendingUp />, text: 'Explore' },
//       { icon: <MessageCircle />, text: 'Messages' },
//       { icon: <Heart />, text: 'Notifications' },
//       { icon: <PlusSquare />, text: 'Create' },
//       {
//         icon: (
//           <Avatar className="w-6 h-6">
//             <AvatarImage src={user?.profilePicture} alt="@user" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         ),
//         text: 'Profile',
//       },
//       { icon: <LogOut />, text: 'Logout' },
//     ];

//     return (
//       <>
//         {/* Top Navbar for Mobile */}
//         <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-300 shadow-sm flex justify-between items-center h-16 px-4 ">
//           <h1 className="text-xl font-bold">Vsnapinsta</h1>

//           <div className="flex items-center gap-4">
//             <Popover>
//               <PopoverTrigger asChild>
//                 <div className="relative cursor-pointer">
//                   <Heart />
//                   {likeNotification.length > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
//                       {likeNotification.length}
//                     </span>
//                   )}
//                 </div>
//               </PopoverTrigger>
//               <PopoverContent>
//                 <div>
//                   {likeNotification.map((notification) => (
//                     <div
//                       key={notification.userId}
//                       className="flex items-center gap-2 my-2"
//                     >
//                       <Avatar>
//                         <AvatarImage
//                           src={notification.userDetails?.profilePicture}
//                         />
//                         <AvatarFallback>CN</AvatarFallback>
//                       </Avatar>
//                       <p className="text-sm">
//                         <span className="font-bold">
//                           {notification.userDetails?.username}
//                         </span>{' '}
//                         liked your post
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </PopoverContent>
//             </Popover>

//             <div className="cursor-pointer" onClick={() => sidebarHandler('Messages')}>
//               <MessageCircle />
//             </div>
//           </div>
//         </div>

//         {/* Desktop Sidebar */}
//         <div className="hidden md:flex fixed top-0 left-0 px-4 border-r border-gray-300 w-[16%] h-screen z-10 bg-white">
//           <div className="flex flex-col">
//             <h1 className="my-8 pl-3 font-bold text-xl">LOGO</h1>
//             <div>
//               {sidebarItems.map((item, index) => (
//                 <div
//                   onClick={() => sidebarHandler(item.text)}
//                   key={index}
//                   className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
//                 >
//                   {item.icon}
//                   <span>{item.text}</span>

//                   {item.text === 'Notifications' && likeNotification.length > 0 && (
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <Button
//                           size="icon"
//                           className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
//                         >
//                           {likeNotification.length}
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent>
//                         <div>
//                           {likeNotification.map((notification) => (
//                             <div
//                               key={notification.userId}
//                               className="flex items-center gap-2 my-2"
//                             >
//                               <Avatar>
//                                 <AvatarImage
//                                   src={notification.userDetails?.profilePicture}
//                                 />
//                                 <AvatarFallback>CN</AvatarFallback>
//                               </Avatar>
//                               <p className="text-sm">
//                                 <span className="font-bold">
//                                   {notification.userDetails?.username}
//                                 </span>{' '}
//                                 liked your post
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                       </PopoverContent>
//                     </Popover>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Bottom Nav */}
//         <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-300 shadow-sm flex justify-around items-center h-16 px-4 ">
//           <div onClick={() => sidebarHandler('Home')} className="p-2 cursor-pointer">
//             <Home />
//           </div>
//           <div onClick={() => sidebarHandler('Search')} className="p-2 cursor-pointer">
//             <Search />
//           </div>
//           <div onClick={() => sidebarHandler('Create')} className="p-2 cursor-pointer">
//             <PlusSquare />
//           </div>
//           <div onClick={() => sidebarHandler('Logout')} className="p-2 cursor-pointer">
//             <LogOut />
//           </div>
//           <div onClick={() => sidebarHandler('Profile')} className="p-2 cursor-pointer">
//             <Avatar className="w-6 h-6">
//               <AvatarImage src={user?.profilePicture} alt="@user" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//           </div>
//         </div>

//         {/* Create Post Modal */}
//         <CreatePost open={open} setOpen={setOpen} />
//       </>
//     );
//   };

//   export default LeftSidebar;






import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Button } from './ui/button';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector((store) => store.realTimeNotification);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://192.168.0.104:5000/api/v1/user/logout', {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  const sidebarHandler = (textType) => {
    switch (textType) {
      case 'Logout':
        logoutHandler();
        break;
      case 'Create':
        setOpen(true);
        setActiveTab('Create');
        break;
      case 'Profile':
        navigate(`/profile/${user?._id}`);
        setActiveTab('Profile');
        break;
      case 'Home':
        navigate('/');
        setActiveTab('Home');
        break;
      case 'Messages':
        navigate('/chat');
        setActiveTab('Messages');
        break;
      case 'Search':
        navigate('/search');
        setActiveTab('Search');
        break;
      case 'Notifications':
        navigate('/search'); // Change if necessary
        setActiveTab('Notifications');
        break;
      default:
        break;
    }
  };

  const sidebarItems = [
    { icon: <Home strokeWidth={activeTab === 'Home' ? 3 : 2} className={activeTab === 'Home' ? 'text-black' : ''} />, text: 'Home' },
    { icon: <Search strokeWidth={activeTab === 'Search' ? 3 : 2} className={activeTab === 'Search' ? 'text-black' : ''} />, text: 'Search' },
    { icon: <TrendingUp strokeWidth={activeTab === 'Explore' ? 3 : 2} className={activeTab === 'Explore' ? 'text-black' : ''} />, text: 'Explore' },
    { icon: <MessageCircle strokeWidth={activeTab === 'Messages' ? 3 : 2} className={activeTab === 'Messages' ? 'text-black' : ''} />, text: 'Messages' },
    { icon: <Heart strokeWidth={activeTab === 'Notifications' ? 3 : 2} className={activeTab === 'Notifications' ? 'text-black' : ''} />, text: 'Notifications' },
    { icon: <PlusSquare strokeWidth={activeTab === 'Create' ? 3 : 2} className={activeTab === 'Create' ? 'text-black' : ''} />, text: 'Create' },
    {
      icon: (
        <Avatar className={`w-6 h-6 border-2 ${activeTab === 'Profile' ? 'border-black' : 'border-transparent'}`}>
          <AvatarImage src={user?.profilePicture} alt="@user" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: 'Profile',
    },
    {
      icon: <LogOut strokeWidth={activeTab === 'Logout' ? 3 : 2} className={activeTab === 'Logout' ? 'text-black' : ''} />,
      text: 'Logout',
    },
  ];

  return (
    <>
      {/* ✅ Mobile Top Navbar with Scroll Effect */}
      <div className={`md:hidden fixed top-0 left-0 w-full z-50 bg-white px-4 h-14 flex justify-between items-center transition-shadow duration-300 ${isScrolled ? 'shadow-md border-b border-gray-200' : ''}`}>
        <h1 className="text-xl font-bold ml-2">Vsnapinsta</h1>

        <div className="flex items-center gap-6">
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative cursor-pointer">
                <Heart strokeWidth={2} />
                {likeNotification.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {likeNotification.length}
                  </span>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div>
                {likeNotification.map((notification) => (
                  <div key={notification.userId} className="flex items-center gap-2 my-2">
                    <Avatar>
                      <AvatarImage src={notification.userDetails?.profilePicture} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-sm">
                      <span className="font-bold">
                        {notification.userDetails?.username}
                      </span>{' '}
                      liked your post
                    </p>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <div className="cursor-pointer" onClick={() => sidebarHandler('Messages')}>
            <MessageCircle strokeWidth={activeTab === 'Messages' ? 3 : 2} className={activeTab === 'Messages' ? 'text-black' : ''} />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed top-0 left-0 px-4 border-r border-gray-300 w-[16%] h-screen z-10 bg-white">
        <div className="flex flex-col">
          <h1 className="my-8 pl-3 font-bold text-xl">Vsnapinsta</h1>
          <div>
            {sidebarItems.map((item, index) => (
              <div
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className={`flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3 
                ${activeTab === item.text ? 'bg-gray-200 font-bold' : ''}`}
              >
                {item.icon}
                <span>{item.text}</span>

                {item.text === 'Notifications' && likeNotification.length > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        size="icon"
                        className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
                      >
                        {likeNotification.length}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        {likeNotification.map((notification) => (
                          <div key={notification.userId} className="flex items-center gap-2 my-2">
                            <Avatar>
                              <AvatarImage src={notification.userDetails?.profilePicture} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                              <span className="font-bold">
                                {notification.userDetails?.username}
                              </span>{' '}
                              liked your post
                            </p>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-300 shadow-sm flex justify-between items-center h-13 px-4 pl-6 pr-6 pt-1 ">
        <div onClick={() => sidebarHandler('Home')} className="pt-2  pb-2 cursor-pointer">
          <Home strokeWidth={activeTab === 'Home' ? 3 : 2} className={activeTab === 'Home' ? 'text-black' : ''} />
        </div>

        <div onClick={() => sidebarHandler('Search')} className="pt-2  pb-2 cursor-pointer">
          <Search strokeWidth={activeTab === 'Search' ? 3 : 2} className={activeTab === 'Search' ? 'text-black' : ''} />
        </div>

        <div onClick={() => sidebarHandler('Create')} className="pt-2  pb-2 cursor-pointer">
          <PlusSquare strokeWidth={activeTab === 'Create' ? 3 : 2} className={activeTab === 'Create' ? 'text-black' : ''} />
        </div>

        <div onClick={() => sidebarHandler('Logout')} className="pt-2  pb-2 cursor-pointer">
          <LogOut strokeWidth={activeTab === 'Logout' ? 3 : 2} className={activeTab === 'Logout' ? 'text-black' : ''} />
        </div>

        <div onClick={() => sidebarHandler('Profile')} className="pt-2  pb-2 cursor-pointer">
          <Avatar className={`w-7 h-7 border-2 ${activeTab === 'Profile' ? 'border-black' : 'border-transparent'}`}>
            <AvatarImage src={user?.profilePicture} alt="@user" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CreatePost open={open} setOpen={setOpen} />
    </>
  );
};

export default LeftSidebar;
