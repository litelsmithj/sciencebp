import {deleteProtocol} from '../../features/protocols/protocolSlice';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

function ProtocolItem({protocol, user}) {

  const dispatch = useDispatch();

  return (
    <div className="protocol">
      <Link to={"/protocol/" + protocol._id}>
        <div>{new Date(protocol.createdAt).toLocaleDateString("en-US")}</div>
        <h2>{protocol.name}</h2>
      </Link>
      {user && user._id === protocol.user ? (
        <button
          onClick={() => dispatch(deleteProtocol(protocol._id))}
          className="close"
        >
          X
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProtocolItem