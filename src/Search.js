import React, { Component } from 'react';
import Input from './Input';
import List from './List';
import Button from './Button';
import axios from 'axios';
import cheerio from 'cheerio';

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

	scrapData(data) {
		const $ = cheerio.load(data, {
					 normalizeWhitespace: true,
    				 xmlMode: true
				});

		var nama_produk,
			nama_produsen,
			nomor_sertifikat,
			berlaku_hingga,
			json,
			produsen_dan_berlaku;
		var dataku = [];

		$('td').filter(function() {
		var data = $(this);
			nama_produk = data.children().eq(0).text();
			nomor_sertifikat = data.children().eq(1).text().split(":")[1];
			produsen_dan_berlaku = data.children().eq(3).text();
			nama_produsen = produsen_dan_berlaku.split(':')[1];
			berlaku_hingga = produsen_dan_berlaku.split(':')[2];
			json = {
				nama_produk: nama_produk,
				nama_produsen: nama_produsen,
				nomor_sertifikat: nomor_sertifikat,
				berlaku_hingga: berlaku_hingga
			};
			dataku.push(json);
		})
		dataku.splice(0, 1)
		return dataku;
	}

	OnSubmit(event) {
		event.preventDefault();
		const {menu, query, page} = this.state;
		if (menu === '') {
			alert('Pilih Menu Dahulu');
		} else {
			// http://api.agusadiyanto.net/halal/?menu=...&query=...&page=...
		 	// https://halalmui.org/mui14/index.php/main/produk_halal_detail/'+menu+'/'+query+'/Y/'+page

			axios.get('https://halalmui.org/mui14/index.php/main/produk_halal_detail/'+menu+'/'+query+'/Y/'+page, {crossDomain: true})
			.then(response => {
				let data = response.data;
				console.log(data)
				if (data.match(/no result found/g)) {
					this.setState({show: false})
					alert(query+' not found')
				}else {
					let dataku = this.scrapData(data);

					this.setState({results: dataku, show: true})
				}
			})
		}
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
		axios.get('https://halalmui.org/mui14/index.php/main/produk_halal_detail/'+menu+'/'+query+'/Y/'+page)
			.then(response => {
				let newResults = response.data;
					newResults = this.scrapData(newResults)
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