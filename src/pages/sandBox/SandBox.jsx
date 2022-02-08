import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../redux/auth/reducer/modalReducer';

function SandBox() {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.test);
  return (
    <div>
      <Button
        content='Open Modal'
        onClick={() =>
          dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))
        }
      />
    </div>
  );
}

export default SandBox;
