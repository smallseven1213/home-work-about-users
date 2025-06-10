import Counter from '../../../features/counter/Counter';
import BasicUsers from '../components/BasicUsers';

function Basic() {
  return (
    <div className="min-h-screen w-80 mx-auto">
      <h2>User List</h2>
      <Counter />
      <BasicUsers />
    </div>
  );
}

export default Basic;
