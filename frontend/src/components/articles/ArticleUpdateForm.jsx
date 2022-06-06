import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateArticle} from '../../features/articles/articleSlice';

function ArticleUpdateForm() {
    let { _id, title, body } = useSelector(
      (state) => state.articles.articles
    );
    
    const [newTitle, setNewTitle] = useState(title);
    const [newBody, setNewBody] = useState(body);
    const [newProtocol, setNewProtocol] = useState(null);

    const dispatch = useDispatch();
    const { protocols } = useSelector((state) => state.protocols);

    const onSubmit = (e)=> {
        e.preventDefault();

        dispatch(updateArticle({_id, title: newTitle, body: newBody}));

        setNewTitle(newTitle);
        setNewBody(newBody);
        setNewProtocol(newProtocol);
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
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <input
              type="text"
              id="body"
              name="body"
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="protocol">Edit protocol:</label>
            <select
              name="protocol"
              id="protocol"
              onChange={(e) => setNewProtocol(e.target.value)}
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
          </div> */}
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Edit Protocol
            </button>
          </div>
        </form>
      </section>
    );
}

export default ArticleUpdateForm