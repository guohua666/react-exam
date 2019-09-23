/*
 * @Author: jiaze 
 * @Date: 2019-09-03 15:24:57 
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-11 15:22:20
 */

import dva from 'dva';
import App from './App';
import login from './store/login';
import { createBrowserHistory as createHistory } from 'history';
const app = dva({
    history: createHistory()
  });

app.model(login)
app.router(App);
app.start('#root');