import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Tipos from 'prop-types';

import './layout.css';

function Layout({ title, children, ...props }) {
  return (
    <div className="layout">
      <Header className="layout-header" {...props} />
      <main className="layout-main">
        <h1 className="layout-title">{title}</h1>
        <section className="layout-content">{children}</section>
      </main>
      <Footer className="layout-footer" {...props} />
    </div>
  );
}

Layout.protoTypes = {
  title: Tipos.string,
  children: Tipos.node,
};

export default Layout;
