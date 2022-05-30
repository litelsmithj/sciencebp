import {useParams, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getArticleById,
  deleteArticle,
  resetArticles,
} from "../features/articles/articleSlice";
import Spinner from '../components/Spinner';
import ArticleUpdateForm from '../components/articles/ArticleUpdateForm';

function ArticleDetail() {
    const {articleId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector(state=> state.auth);
    const { articles, articlesError, articlesLoading, articlesMessage } = useSelector(
      (state) => state.articles
    );
    
    useEffect(()=>{
        if (articlesError) {
            console.log(articlesMessage);
        }

        dispatch(getArticleById(articleId));

        return () => {
            dispatch(resetArticles());
        }
    }, [articlesError, articlesMessage, dispatch, articleId]);

    const deleteButtonClick = () => {
        dispatch(deleteArticle(articleId));
        navigate('/');
    };

    if (articlesLoading) {
        return <Spinner/>
    }

    const article = articles;
    const {title, createdAt, body} = article;

    return (
      <>
        <h2>{title}</h2>
        <div>Created at: {new Date(createdAt).toLocaleDateString("en-US")}</div>
        <br />

        {body ? <div>{body}</div> : <p>No body</p>}
        <br />

        {user && user._id === article.author ? (
          <>
            <ArticleUpdateForm />

            <br/>

            <button onClick={() => deleteButtonClick()}>Delete</button>
          </>
        ) : (
          <></>
        )}
      </>
    );
}

export default ArticleDetail