/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

import './style.css';
import {
  TASK_LIST, display, createTask, selectTask,
} from './modules/tasks.js';

display(TASK_LIST);
createTask(TASK_LIST);
selectTask(TASK_LIST);
