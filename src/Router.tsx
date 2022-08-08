import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import NotFoundPage from 'modules/errors/NotFoundPage';
import IndexPage from 'modules/home/IndexPage';

const Router: FC = () => (
  <Routes>
    <Route path="/" element={<IndexPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default Router;
