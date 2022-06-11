import {deleteProtocol} from '../../features/protocols/protocolSlice';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { deleteTracker } from '../../features/trackers/trackerSlice';

function ProtocolItem({protocol, user}) {

  const dispatch = useDispatch();

  const deleteButtonClick = () => {
    dispatch(deleteProtocol(protocol._id));
    dispatch(deleteTracker());
  }

  return (
    <div className="protocol">
      <Link to={"/protocols/" + protocol._id}>
        <div>{new Date(protocol.createdAt).toLocaleDateString("en-US")}</div>
        <h2>{protocol.name}</h2>
      </Link>
      {user && user._id === protocol.user ? (
        <button
          onClick={()=> deleteButtonClick()}
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