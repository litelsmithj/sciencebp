import {useParams, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getArticleById,
  deleteArticle,
  resetArticles,
} from "../features/articles/articleSlice";
import { getProtocols, resetProtocols } from '../features/protocols/protocolSlice';
import Spinner from '../components/Spinner';
import ArticleUpdateForm from '../components/articles/ArticleUpdateForm';
import { FaTrash } from "react-icons/fa";

function ArticleDetail() {
  const { articleId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { articles, articlesError, articlesLoading, articlesMessage } =
    useSelector((state) => state.articles);
  const { protocols, protocolsError, protocolsLoading, protocolsMessage } =
    useSelector((state) => state.protocols);

  useEffect(() => {
    if (articlesError) {
      console.log(articlesMessage);
    }
    if (protocolsError) {
      console.log(protocolsMessage);
    }

    dispatch(getArticleById(articleId));
    dispatch(getProtocols());

    return () => {
      dispatch(resetArticles());
      dispatch(resetProtocols());
    };
  }, [articlesError, articlesMessage, dispatch, articleId, protocolsError, protocolsMessage]);

  const article = articles;
  const { title, createdAt, body, protocol } = article;

  let fullProtocol;
  if (protocols.length > 0) {
    protocols.forEach((proto) => {
      if (proto._id === protocol){
        fullProtocol = proto;
      }
    })
  };

  const deleteButtonClick = () => {
    dispatch(deleteArticle(articleId));
    navigate("/");
  };

  if (articlesLoading || protocolsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h2>{title}</h2>
      <h3>{fullProtocol ? 'Topic: ' + fullProtocol.name : ''}</h3>
      <div>Created at: {new Date(createdAt).toLocaleDateString("en-US")}</div>
      <br />

      {body ? <div>{body}</div> : <p>No body</p>}
      <br />

      {user && user._id === article.author ? (
        <>
          <ArticleUpdateForm />

          <br />

          <button className= "btn-delete btn" onClick={() => deleteButtonClick()}>
            <FaTrash/> Delete
          </button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ArticleDetail