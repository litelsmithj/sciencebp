import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import ProtocolItem from '../components/ProtocolItem';
import Spinner from '../components/Spinner';
import {getProtocols, reset} from '../features/protocols/protocolSlice';
import ProtocolForm from '../components/ProtocolForm';

function Dashboard() {
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const {protocols, isLoading, isError, message} = useSelector((state) => state.protocols);

  useEffect(()=> {
    if (isError){
      console.log(message);
    }

    dispatch(getProtocols());

    return () => {
      dispatch(reset());
    }

  }, [user, dispatch, isError, message]);

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Protocols</p>
      </section>

      {user ? (
        <>
          <ProtocolForm/>
        </>
      ): (<></>)}

      <section className="content">
        {protocols.length > 0 ? (
          <div className="protocols">
            {protocols.map((protocol)=> (
              <ProtocolItem key = {protocol._id} protocol = {protocol} user = {user}/>
            ))}
          </div>
        ) : (
          <></>
        )}
      </section>
    </>
  )
}

export default Dashboard
