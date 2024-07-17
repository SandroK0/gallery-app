import React from 'react';
import Masonry from 'react-masonry-css';
import './MasonryLayout.css';

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

interface MasonryLayoutProps {
  children: React.ReactNode;
}

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ children }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {children}
    </Masonry>
  );
};

export default MasonryLayout;
