import React from 'react'
// import {deleteArticle} from '../../features/articles/articleSlice';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

function ArticleItem({article, user}) {
    const dispatch = useDispatch();

    return (
        <div className="article">
            <Link to = {"/article/"+article._id}>
                <div>{new Date(article.createdAt).toLocaleDateString("en-US")}</div>
                <h2>{article.title}</h2>
            </Link>
            {/* {user? (
                <button
                onClick={() => dispatch(deleteArticle(article._id))}
                className="close"
                >
                X
                </button>
            ) : (
                <></>
            )} */}
        </div>
    );
}

export default ArticleItem