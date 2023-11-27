import React from 'react';
import './assets/styles/theme/Variables.css';
import './assets/styles/theme/General.css';
import IntroSection from './view-containers/IntroSection';
import MainSection from "./view-containers/MainSection";
import FooterSection from "./view-containers/FooterSection";

const App = () => {
  return (
      <div className="App">
          <IntroSection/>
          <MainSection/>
          <FooterSection/>
      </div>
  );
};

export default App;
