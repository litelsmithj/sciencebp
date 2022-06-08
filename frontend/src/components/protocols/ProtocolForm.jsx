import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createProtocol} from '../../features/protocols/protocolSlice';
import {createTracker} from '../../features/trackers/trackerSlice';

function ProtocolForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();

    const { protocolsLoading, protocolsError, protocolsMessage } = useSelector(state=> state.protocols);

    const onSubmit = async (e)=> {
        e.preventDefault();

        const action = await dispatch(createProtocol({name, description}));

        setName('');
        setDescription('');

        if (protocolsError) {
          console.log(protocolsMessage);
        }

        if (action && !protocolsLoading && !protocolsError) {
          const protocol = action.payload._id;
          dispatch(
            createTracker({ protocol })
          );
        }
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