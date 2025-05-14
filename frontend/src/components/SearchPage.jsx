
// import React, { useState, useEffect } from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import SuggestedUsers from './SuggestedUsers';
// import { Input } from './ui/input';

// const SearchPage = () => {
//   const { user } = useSelector((store) => store.auth);
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   // Fetch matching users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (query.trim() === '') {
//         setResults([]);
//         return;
//       }

//       try {
//         const res = await axios.get(`http://192.168.0.104:5000/api/v1/user/search?username=${query}`);
//         setResults(res.data.users || []);
//       } catch (error) {
//         console.error('Error searching users:', error);
//       }
//     };

//     const debounceFetch = setTimeout(fetchUsers, 300); // Debounce

//     return () => clearTimeout(debounceFetch);
//   }, [query]);

//   return (
//     <div className="w-full max-w-xl mx-auto my-10 px-4 mt-[100px]">
//       {/* Profile Info */}
//       <div className="flex flex-col flex-row items-start items-center gap-4 gap-2 mb-6">
//         <Link to={`/profile/${user?._id}`}>
//           <Avatar>
//             <AvatarImage src={user?.profilePicture} alt="profile" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </Link>
//         <div>
//           <h1 className="font-semibold text-sm">
//             <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
//           </h1>
//           <span className="text-gray-600 text-sm">{user?.bio || 'Bio here...'}</span>
//         </div>
//       </div>

//       {/* Search Input */}
//       <div className="mb-4">
//         <Input
//           type="text"
//           placeholder="Search users..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//       </div>

//       {/* Search Results */}
//       <div className="mb-6">
//         {results.length > 0 ? (
//           results.map((user) => (
//             <Link
//               to={`/profile/${user._id}`}
//               key={user._id}
//               className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md"
//             >
//               <Avatar>
//                 <AvatarImage src={user.profilePicture} alt={user.username} />
//                 <AvatarFallback>CN</AvatarFallback>
//               </Avatar>
//               <div>
//                 <h2 className="font-semibold">{user.username}</h2>
//                 <p className="text-sm text-gray-600">{user.bio}</p>
//               </div>
//             </Link>
//           ))
//         ) : query ? (
//           <p className="text-gray-500">No users found.</p>
//         ) : null}
//       </div>

//       {/* Suggested Users */}
//       <SuggestedUsers />
//     </div>
//   );
// };

// export default SearchPage;


import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SuggestedUsers from './SuggestedUsers';
import { Input } from './ui/input';
import debounce from 'lodash.debounce';

const SearchPage = () => {
  const { user } = useSelector((store) => store.auth);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (searchQuery) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://192.168.0.104:5000/api/v1/user/search?username=${searchQuery}`);
      const filteredUsers = res.data.users.filter((u) => u._id !== user?._id);
      setResults(filteredUsers);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchUsers, 300), []);

  useEffect(() => {
    if (query.trim()) {
      debouncedSearch(query);
    } else {
      setResults([]);
    }
  }, [query, debouncedSearch]);

  return (
    <div className="w-full max-w-xl mx-auto my-10 px-8 mt-[80px]">
      {/* Profile Info */}
      <div className="flex flex-row items-center gap-4 mb-6">
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="profile" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className="font-semibold text-sm">
            <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          </h1>
          <span className="text-gray-600 text-sm">{user?.bio || 'Bio here...'}</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search Profile..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Search Results */}
      <div className="mb-6">
        {loading ? (
          <p className="text-gray-500">Searching...</p>
        ) : results.length > 0 ? (
          results.map((user) => (
            <Link
              to={`/profile/${user._id}`}
              key={user._id}
              className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md "
            >
              <Avatar>
                <AvatarImage src={user.profilePicture} alt={user.username} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{user.username}</h2>
                <p className="text-sm text-gray-600">{user.bio}</p>
              </div>
            </Link>
          ))
        ) : query ? (
          <p className="text-gray-500">No users found.</p>
        ) : null}
      </div>

      {/* Suggested Users */}
      <SuggestedUsers />
    </div>
  );
};

export default SearchPage;
