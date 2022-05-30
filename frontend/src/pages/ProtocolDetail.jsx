import {useParams, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getProtocolById,
  deleteProtocol,
  resetProtocols,
} from "../features/protocols/protocolSlice";
import Spinner from '../components/Spinner';
import ProtocolUpdateForm from '../components/protocols/ProtocolUpdateForm';

function ProtocolDetail() {
    const {protocolId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector(state=> state.auth);
    const {protocols} = useSelector(state=> state.protocols);
    const {isError, isLoading, message} = useSelector(state => state.ui);
    
    useEffect(()=>{
        if (isError) {
            console.log(message);
        }

        dispatch(getProtocolById(protocolId));

        return () => {
            dispatch(resetProtocols());
        }
    }, [isError, message, dispatch, protocolId]);

    const deleteButtonClick = () => {
        dispatch(deleteProtocol(protocolId));
        navigate('/');
    };

    if (isLoading) {
        return <Spinner/>
    }

    const protocol = protocols;
    const {name, createdAt, description} = protocol;

    return (
      <>
        <h2>{name}</h2>
        <div>Created at: {new Date(createdAt).toLocaleDateString("en-US")}</div>
        <br />

        {description ? <div>{description}</div> : <p>No Description</p>}
        <br />

        {user && user._id === protocol.user ? (
          <>
            <ProtocolUpdateForm />

            <br/>

            <button onClick={() => deleteButtonClick()}>Delete</button>
          </>
        ) : (
          <></>
        )}
      </>
    );
}

export default ProtocolDetail