import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateProtocol} from '../../features/protocols/protocolSlice';

function ProtocolUpdateForm() {
    let { _id, name, description } = useSelector(
      (state) => state.protocols.protocols
    );
    
    const [newName, setNewName] = useState(name);
    const [newDescription, setNewDescription] = useState(description);

    const dispatch = useDispatch();

    const onSubmit = (e)=> {
        e.preventDefault();

        dispatch(updateProtocol({_id, name: newName, description: newDescription}));

        setNewName(newName);
        setNewDescription(newDescription);
    };

    return (
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newDescription}
              rows="5"
              placeholder="Niche routines that improve your wellbeing e.g. salt in water for electrolytes"
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Edit Protocol
            </button>
          </div>
        </form>
      </section>
    );
}

export default ProtocolUpdateForm