import VitrualizedUsers from '../../../features/users/VitrualizedUsers';
import { useSWRUsers } from '../../../hooks/useSWRUsers';

export default function ProUsers() {
  const { data, isLoading, error, refetch } = useSWRUsers();

  if (isLoading) {
    return (
      <div className="loading-container">
        <h2>Loading Users...</h2>
        <div className="spinner">⏳</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Users</h2>
        <p>Error: {error.message}</p>
        <button onClick={refetch} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="empty-container">
        <h2>No Users Found</h2>
        <button onClick={refetch} className="refresh-button">
          Refresh
        </button>
      </div>
    );
  }

  return <VitrualizedUsers users={data} />;
}
