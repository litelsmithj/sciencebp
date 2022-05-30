import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createArticle} from '../../features/articles/articleSlice';

function ArticleForm() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState("");

    const dispatch = useDispatch();

    const onSubmit = (e)=> {
        e.preventDefault();

        dispatch(createArticle({title, body}));

        setTitle('');
        setBody('');
    };

    return (
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <input
              type="text"
              id="body"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Add Article
            </button>
          </div>
        </form>
      </section>
    );
}

export default ArticleForm