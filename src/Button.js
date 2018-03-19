import React, {Component} from 'react';

export default class Button extends Component {
	render() {
		const {nameButton, onClick} = this.props;
		return (
			<div style={{'marginTop' : '10px', 'marginBottom': '10px'}}>
				<button className="btn btn-primary btn-block" onClick={onClick}>{nameButton}</button>
			</div>
		)
	}
}