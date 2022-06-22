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
  deleteTracker,
  updateTracker,
  trackerExists,
} from "../features/trackers/trackerSlice";
import { FaTrash } from "react-icons/fa";

function ProtocolDetail() {
  const { protocolId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var today = new Date();
  var day = today.getDay();

  var diff = today.getDate() - day + (day === 0 ? -6 : 1);

  var startOfWeek = new Date(today.setDate(diff));
  var month = String(startOfWeek.getMonth() + 1).padStart(2, "0");
  var monDayOfMonth = String(startOfWeek.getDate()).padStart(2, "0");
  var dateString = month + '/' + monDayOfMonth;

  const { user } = useSelector((state) => state.auth);
  const { protocols, protocolsLoading, protocolsError, protocolsMessage } =
    useSelector((state) => state.protocols);
  const { articles, articlesLoading, articlesError, articlesMessage } =
    useSelector((state) => state.articles);
  const { trackersError, trackersMessage } = useSelector(
    (state) => state.trackers
  );

  // Need to be useRef to use within useEffect - mutable objects
  var protocolAction = useRef();
  var articlesAction = useRef();
  var trackerAction = useRef();
  var count = useRef();

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
      articlesAction.current = await dispatch(
        getArticlesByProtocol(protocolId)
      );

      if (user) {
        
        if (await dispatch(trackerExists({ protocol: protocolId, dateString }))){
          
        } else {
          await dispatch(createTracker({ protocol: protocolId, dateString })); // create if doesn't exist
          trackerAction.current = await dispatch(
            getProtocolTrackerByUser(protocolId)
          );
        }
      }

      count.current = trackerAction.current
        ? trackerAction.current.payload[0].count
        : "";

      return () => {
        dispatch(resetProtocols());
        dispatch(resetArticles());
        dispatch(resetTrackers());
      };
    };

    if (
      !protocolAction.current &&
      !articlesAction.current &&
      (!user || !trackerAction.current)
    ) {
      fetchData();
    }
  }, [
    protocolsError,
    protocolsMessage,
    dispatch,
    protocolId,
    articlesError,
    articlesMessage,
    trackersError,
    trackersMessage,
    user,
    dateString
  ]);

  const protocol = protocols;
  const { name, createdAt, description } = protocol;

  // trackerAction.current included so that spinner is rendered initially while trackers are loading, not when updating
  if (protocolsLoading || articlesLoading || (user && !trackerAction.current)) {
    return <Spinner />;
  }

  const deleteButtonClick = () => {
    dispatch(deleteProtocol(protocolId));
    dispatch(deleteTracker());
    navigate("/");
  };

  const dayClick = (e) => {
    if (e.target.checked) {
      count.current += 1;
    } else {
      count.current -= 1;
    }

    dispatch(
      updateTracker({
        _id: trackerAction.current.payload[0]._id,
        date: dateString,
        key: e.target.id,
        value: e.target.checked,
        count: count.current,
      })
    );
    dispatch(getProtocolTrackerByUser(protocolId));
  };

  var days;

  if (user){
    days = trackerAction.current.payload[0].days.find(day => day.date === dateString);
  }

  return (
    <>
      <h2>{name}</h2>
      <div>Created at: {new Date(createdAt).toLocaleDateString("en-US")}</div>
      <br />

      {description ? <div>{description}</div> : <p>No Description</p>}
      <br />

      {user ? (
        <>
          <div className="tracker">
            <>Times Completed: {count.current}</>
            <br />
            {trackerAction.current ? (
              <>
                <br />
                Week of {dateString}
                <br />
                {Object.keys(days.values).map((day) => (
                  <div key={day} className="tracker-day">
                    <input
                      type="checkbox"
                      id={day}
                      onClick={(e) => dayClick(e)}
                      defaultChecked={days.values[day]}
                    ></input>
                    <label htmlFor={day}>{day}</label>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>

          {user._id === protocol.user ? (
            <>
              <ProtocolUpdateForm />

              <br />
              <button className = "btn-delete btn" onClick={() => deleteButtonClick()}>
                <FaTrash/> Delete
              </button>
            </>
          ) : (
            <></>
          )}

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