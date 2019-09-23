/*
 * @Author: jiaze 
 * @Date: 2019-09-03 15:24:36 
 * @Last Modified by:   jiaze 
 * @Last Modified time: 2019-09-03 15:24:36 
 */

import React from 'react';
import {Router} from 'dva/router';
import '@/assets/css/app/App.css';
import {MapRouter,route} from './router';

function App({history}) {
  return (
    <div className="App">
      <Router history={history}>
       <MapRouter route={route} />
      </Router>
    </div>
  );
}

export default App;
