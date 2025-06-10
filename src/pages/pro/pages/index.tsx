import Counter from '../../../features/counter/Counter';
import ProUsers from '../components/ProUsers';

function Pro() {
  return (
    <div className="min-h-screen w-80 mx-auto">
      <h2>User List</h2>
      <Counter />
      <ProUsers />
    </div>
  );
}

export default Pro;
