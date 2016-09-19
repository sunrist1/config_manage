import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

// css
import '../static/style/notice_page.css'

export default class NoticePage extends React.Component{
	render(){
		return(
			<div className="notice_content">
				<h2>重要提示：</h2>
				<p>
					1、请投资者认真阅读问卷内容，了解评分规则，并确认所填写内容表达真实。
				</p>
				<p>
					2、亿基金向客户履行风险承受能力评估等适当性职责，并不能取代您自己
					的投资判断，也不会降低金融产品或金融服务的固有风险。无论投资者是否根据
					调查结果进行投资，均属投资者的独立行为，相应的风险亦由投资者独立承担。
					同时， 与金融产品或金融服务相关的投资风险、履约责任以及费用等将由您自行
					承担。		
				</p>
				<p>
					3、亿基金根据您提供的信息对您进行风险承受能力评估，开展适当性工作。
					您应当如实提供相关信息及证明材料，并对所提供的信息和证明材料的真实性、
					准确性、有效性、完整性负责，亿基金不承担任何责任或由此而造成的损失。</p>
				<p>
					4、亿 基金 提醒您：当您的各项状况、信息发生重大变化时，应当及时告知本
					公司，以便本公司及时更新您的重大变化信息。本公司建议：此时需对您所投资
					的金融产品及时进行重新审视， 以确保您的投资决定与您可承受的投资风险程度
					等实际情况一致。
				</p>
				<p>5、 本问卷共设计了 13 道问题。</p>
				<button>
					<Link className="linkBtn" to="/questions">同意</Link>
				</button>
			</div>
		)
	}
}