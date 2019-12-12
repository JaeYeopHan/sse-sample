import React from 'react';
import { render } from 'react-dom';
import App from './App';

import * as sse from './core/sse'

sse.init(() => render(<App />, document.getElementById("root")))
