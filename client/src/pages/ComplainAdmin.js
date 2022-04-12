// import hook
import React, { useEffect } from 'react';

import NavbarAdmin from '../components/NavbarAdmin';

import { io } from 'socket.io-client';

let socket;

export default function ComplainAdmin() {
  const title = 'Complain admin';
  document.title = 'DumbMerch | ' + title;

  useEffect(() => {
    io('http://localhost:5000');
  }, []);

  return (
    <>
      <NavbarAdmin title={title} />
    </>
  );
}
