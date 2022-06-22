import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createArticle} from '../../features/articles/articleSlice';

function ArticleForm() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [protocol, setProtocol] = useState(null);

    const dispatch = useDispatch();
    const {protocols} = useSelector(state => state.protocols);

    const onSubmit = (e)=> {
        e.preventDefault();

        dispatch(createArticle({title, body, protocol}));

        setTitle('');
        setBody('');
        setProtocol(null);
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
            <textarea
              id="body"
              name="body"
              value={body}
              rows = "5"
              placeholder='Share a science-based story related or unrelated to a specific protocol'
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="protocol">Choose a protocol:</label>
            <select
              name="protocol"
              id="protocol"
              onChange={(e) => setProtocol(e.target.value)}
            >
              <option value={null}>None</option>
              {protocols.length > 0 ? (
                protocols.map((proto) => (
                  <option key={proto._id} value={proto._id}>
                    {proto.name}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
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