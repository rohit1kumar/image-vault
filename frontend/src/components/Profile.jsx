import { useQuery } from 'react-query';
import { getProfile, logout } from '../utils/api';

const Profile = () => {
  const { data: profile } = useQuery('profile', getProfile);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {profile?.profilePicture ? (
            <img
              src={profile.profilePicture}
              alt={profile.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-xl font-bold text-white">
                {profile?.name?.charAt(0) || 'U'}
              </span>
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{profile?.name || 'User'}</h2>
            <p className="text-sm text-gray-600">{profile?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;