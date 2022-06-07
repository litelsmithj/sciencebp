import {useParams, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
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
    
    useEffect(()=>{
        if (protocolsError) {
            console.log(protocolsMessage);
        }
        if (articlesError) {
          console.log(articlesMessage);
        }

        dispatch(getProtocolById(protocolId));
        dispatch(getArticlesByProtocol(protocolId));

        return () => {
            dispatch(resetProtocols());
            dispatch(resetArticles());
        }
    }, [protocolsError, protocolsMessage, dispatch, protocolId, articlesError, articlesMessage]);

    const deleteButtonClick = () => {
        dispatch(deleteProtocol(protocolId));
        navigate('/');
    };

    if (protocolsLoading || articlesLoading) {
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

            <br />

            <button onClick={() => deleteButtonClick()}>Delete</button>

            <br />
            <br />
          </>
        ) : (
          <></>
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