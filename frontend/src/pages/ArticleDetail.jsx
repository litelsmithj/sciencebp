import {useParams, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getArticleById,
  // deleteArticle,
  resetArticles,
} from "../features/articles/articleSlice";
import Spinner from '../components/Spinner';
// import articleUpdateForm from '../components/articles/articleUpdateForm';

function ArticleDetail() {
    const {articleId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector(state=> state.auth);
    const { articles, isError, isLoading, message } = useSelector(
      (state) => state.articles
    );
    
    useEffect(()=>{
        if (isError) {
            console.log(message);
        }

        dispatch(getArticleById(articleId));

        return () => {
            dispatch(resetArticles());
        }
    }, [isError, message, dispatch, articleId]);

    const deleteButtonClick = () => {
        // dispatch(deleteArticle(articleId));
        navigate('/');
    };

    if (isLoading) {
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

        {user && user._id === article.user ? (
          <>
            {/* <articleUpdateForm /> */}

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