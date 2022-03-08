import './TransactionMutation.css';

import { useNavigate, useParams } from 'react-router-dom';

import Container from '../components/Container';
import BackArrowIcon from '../components/icons/BackArrow';

export default function TransactionMutation() {
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const isCreating = id === 'new';

  return (
    <Container className="mutating">
      <div className="flex-row flex-center head">
        <h1>{isCreating ? 'Add' : 'Update'}</h1>
        <button className="button icon-button back-button" onClick={() => navigate('/')}>
          <BackArrowIcon />
        </button>
      </div>
    </Container>
  );
}
