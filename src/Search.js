import React, { Component } from 'react';
import Input from './Input';
import List from './List';
import Button from './Button';
import axios from 'axios';

export default class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menu: '',
			query: '',
			results: '',
			page: 0,
			show: false
		}

		this.OnChange = this.OnChange.bind(this);
		this.OnSubmit = this.OnSubmit.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	OnChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	OnSubmit(event) {
		event.preventDefault();
		const {menu, query, page} = this.state;
		if (menu === '') {
			alert('Pilih Menu Dahulu');
		}
		axios.get('http://api.agusadiyanto.net/halal/?menu='+menu+'&query='+query+'&page='+page)
			.then(response => {
				this.setState({results: response.data.data, show: true})
				if (response.data.status === "error") {
					this.setState({show: false})
					alert(query+' Tidak ditemukan');
				}
			})
			.catch(error => alert('Error'))
	}

	getAllData() {
		if (this.state.results instanceof Array) {
			return this.state.results.map(function(value, key) {
				return <List value={value} key={key}/>
			})
		}
	}

	onClick() {
		let {menu, query, page, results} = this.state;
		page = (page + 10);
		axios.get('https://api.agusadiyanto.net/halal/?menu='+menu+'&query='+query+'&page='+page)
			.then(response => {
				const newResults = response.data.data;
				results.push(...newResults);
				this.setState({results: results, page: page});
			})
			.catch(error => alert('Tidak ada data lagi'))
	}

	render() {
		const {show} = this.state;
		return (
			<div>
				<Input OnChange={this.OnChange} OnSubmit={this.OnSubmit}/>
				<hr/>
				{this.getAllData()}
				{show ? <Button nameButton="Load More" onClick={this.onClick}/> : ' '}
			</div>
		)
	}
}