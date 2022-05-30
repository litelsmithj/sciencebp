import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createProtocol} from '../../features/protocols/protocolSlice';

function ProtocolForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();

    const onSubmit = (e)=> {
        e.preventDefault();

        dispatch(createProtocol({name, description}));

        setName('');
        setDescription('');
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Add Protocol
            </button>
          </div>
        </form>
      </section>
    );
}

export default ProtocolForm