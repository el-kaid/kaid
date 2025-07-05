import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineScene = () => {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden">
      <Spline 
        scene="https://prod.spline.design/K9NzpExHvXrLYYj7/scene.splinecode"
        onLoad={() => console.log('Spline scene loaded!')}
        onError={(error) => console.error('Spline error:', error)}
      />
    </div>
  );
};

export default SplineScene;