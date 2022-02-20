import React from 'react';
import { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import './index.scss';

function CustomAccordian({ title = 'Introduction', children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className='custom-accordian'>
      <div className='upper' onClick={() => setOpen(!open)}>
        <span>{title}</span>

        {open ? <DownOutlined /> : <UpOutlined />}
      </div>

      {open && children}
    </div>
  );
}

export default CustomAccordian;
