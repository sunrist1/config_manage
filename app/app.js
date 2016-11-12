import React from 'react';
import {render} from 'react-dom';
import {Router,Route,hashHistory} from 'react-router'

// import components
import NoticePage from './comps/notice_page.js';   //提示页面
import QuestionsPage from './comps/questions_page.js';  // 问题列表页面
import EchartPage from './comps/echarts_page.js';  // 选择结果额 echarts展示页
// import AssetsPage from './comps/assets_page.js';  // 可投资资产选择
import ResultPage from './comps/result_page.js';  // 得出结果页面

render(
	(
		<Router history={hashHistory}>
			<Route path="/" component={NoticePage} />
			<Route path="/questions" component={QuestionsPage} />
			<Route path="/echarts_page/:result_arr" component={EchartPage} />
			<Route path="/result/:result_sum" component={ResultPage} />
		</Router>
	),
	document.getElementById('content')
)

			// <Route path="/assets_select/:asset" component={AssetsPage} />
