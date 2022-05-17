import React from "react";
import ContentLoader from "react-content-loader";

const ChefCardLoader = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={600}
    viewBox="0 0 400 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="100" height="30" />
    <rect x="0" y="40" rx="3" ry="3" width="200" height="20" />
    <rect x="0" y="70" rx="3" ry="3" width="200" height="20" />
    <rect x="0" y="100" rx="3" ry="3" width="200" height="20" />
    <rect x="0" y="140" rx="3" ry="3" width="350" height="20" />
    <rect x="0" y="180" rx="3" ry="3" width="350" height="20" />
    <rect x="0" y="220" rx="3" ry="3" width="350" height="20" />
    <rect x="0" y="260" rx="3" ry="3" width="350" height="20" />
    <rect x="0" y="300" rx="3" ry="3" width="350" height="20" />
    <rect x="0" y="340" rx="3" ry="3" width="350" height="20" />
    <rect x="0" y="380" rx="3" ry="3" width="350" height="20" />
    <rect x="0" y="420" rx="3" ry="3" width="350" height="20" />
    <rect x="0" y="460" rx="3" ry="3" width="350" height="20" />
    <circle cx="300" cy="60" r="60" />
  </ContentLoader>
);

export default ChefCardLoader;
