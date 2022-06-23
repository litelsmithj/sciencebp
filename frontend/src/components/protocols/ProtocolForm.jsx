import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {createProtocol} from '../../features/protocols/protocolSlice';

function ProtocolForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { protocolsError, protocolsMessage } = useSelector(state=> state.protocols);

    const onSubmit = (e)=> {
        e.preventDefault();

        if (protocolsError) {
          console.log(protocolsMessage);
        }

        dispatch(createProtocol({name, description}));

        setName('');
        setDescription('');

        navigate('/');
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
            <textarea
              id="description"
              name="description"
              value={description}
              rows="5"
              placeholder="Niche routines that improve your wellbeing e.g. salt in water for electrolytes"
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