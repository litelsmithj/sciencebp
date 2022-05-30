import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ProtocolItem from '../components/protocols/ProtocolItem';
import ArticleItem from "../components/articles/ArticleItem";
import Spinner from '../components/Spinner';
import {getProtocols, resetProtocols} from '../features/protocols/protocolSlice';
import {getArticles, resetArticles} from '../features/articles/articleSlice';
import ProtocolForm from '../components/protocols/ProtocolForm';
import ArticleForm from '../components/articles/ArticleForm';

function Dashboard() {
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const { protocols, isLoading, isError, message } = useSelector(
    (state) => state.protocols
  );
  const {articles} = useSelector((state) => state.articles);

  useEffect(()=> {
    if (isError){
      console.log(message);
    }

    dispatch(getProtocols());
    dispatch(getArticles());

    return () => {
      dispatch(resetProtocols());
      dispatch(resetArticles());
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
          <ProtocolForm />
        </>
      ) : (
        <></>
      )}

      <section className="content">
        {protocols.length > 0 ? (
          <div className="protocols">
            {protocols.map((protocol) => (
              <ProtocolItem
                key={protocol._id}
                protocol={protocol}
                user={user}
              />
            ))}
          </div>
        ) : (
          <>There are no protocols</>
        )}
      </section>
      <br />
      <section className="footer">
        <p>Articles</p>
      </section>

      {user ? (
        <>
          <ArticleForm />
        </>
      ) : (
        <></>
      )}

      <section className="content">
        {articles.length > 0 ? (
          <div className="articles">
            {articles.map((article) => (
              <ArticleItem key={article._id} article={article} user = {user} />
            ))}
          </div>
        ) : (
          <>There are no articles</>
        )}
      </section>
    </>
  );
}

export default Dashboard
