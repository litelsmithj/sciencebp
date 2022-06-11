import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getProtocolById,
  deleteProtocol,
  resetProtocols,
} from "../features/protocols/protocolSlice";
import {getArticlesByProtocol, resetArticles} from '../features/articles/articleSlice';
import ArticleItem from '../components/articles/ArticleItem';
import Spinner from '../components/Spinner';
import ProtocolUpdateForm from '../components/protocols/ProtocolUpdateForm';
import {
  getProtocolTrackerByUser,
  resetTrackers,
  createTracker,
  deleteTracker
} from "../features/trackers/trackerSlice";

function ProtocolDetail() {
    const {protocolId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector(state=> state.auth);
    const { protocols, protocolsError, protocolsLoading, protocolsMessage } = useSelector(
      (state) => state.protocols
    );
    const { articles, articlesError, articlesLoading, articlesMessage } =
      useSelector((state) => state.articles);
    const { trackers, trackersError, trackersLoading, trackersMessage } =
      useSelector((state) => state.trackers);
    
    // Need to be useRef to use within useEffect - mutable objects
    var protocolAction = useRef();
    var articlesAction = useRef();
    var trackerAction = useRef();

    useEffect(() => {
      // Must create and call new function in useEffect to make async
      const fetchData = async () => {
        if (protocolsError) {
          console.log(protocolsMessage);
        }
        if (articlesError) {
          console.log(articlesMessage);
        }
        if (trackersError) {
          console.log(trackersMessage);
        }

        protocolAction.current = await dispatch(getProtocolById(protocolId));

        articlesAction.current = await dispatch(getArticlesByProtocol(protocolId));

        if (user) {
          trackerAction.current = await dispatch(getProtocolTrackerByUser(protocolId));
        }

        // If tracker not already created and user logged in, create new tracker & show
        if (user && protocolAction.current && trackerAction.current.payload.length === 0) {
          const protocol = protocolAction.current.payload._id;
          dispatch(
            createTracker({ protocol })
          );
          dispatch(getProtocolTrackerByUser(protocolId));
        }

        return () => {
          dispatch(resetProtocols());
          dispatch(resetArticles());
          dispatch(resetTrackers());
        };
      }
      
      if (!protocolAction.current && !articlesAction.current && (!user || !trackerAction.current)){
        fetchData();
      }
      
    }, [
      protocolsLoading,
      protocolsError,
      protocolsMessage,
      dispatch,
      protocolId,
      articlesLoading,
      articlesError,
      articlesMessage,
      trackersLoading,
      trackersError,
      trackersMessage,
      user
    ]);

    const deleteButtonClick = () => {
        dispatch(deleteProtocol(protocolId));
        dispatch(deleteTracker());
        navigate('/');
    };

    if (protocolsLoading || articlesLoading || trackersLoading) {
        return <Spinner/>
    }

    const protocol = protocols;
    const {name, createdAt, description} = protocol;

    const tracker = trackers[0];

    return (
      <>
        <h2>{name}</h2>
        <div>Created at: {new Date(createdAt).toLocaleDateString("en-US")}</div>
        <br />

        {description ? <div>{description}</div> : <p>No Description</p>}
        <br />

        {user ? (
          <>
            {trackers.length > 0 ? (
              <>Times Completed: {tracker.count}</>
            ) : (
              <></>
            )}

            {user._id === protocol.user ? (
              <>
                <ProtocolUpdateForm />

                <br />

                <button onClick={() => deleteButtonClick()}>Delete</button>
              </>
            ) : (<></>)
            }

            <br />
            <br />
          </>
        ) : (
          <>
            <p className="demo-tracker">Login to track progress</p>
            <br />
          </>
        )}

        <h3>Articles</h3>

        <section className="content">
          {articles.length > 0 ? (
            <div className="articles">
              {articles.map((article) => (
                <ArticleItem key={article._id} article={article} user={user} />
              ))}
            </div>
          ) : (
            <>There are no articles</>
          )}
        </section>
      </>
    );
}

export default ProtocolDetail