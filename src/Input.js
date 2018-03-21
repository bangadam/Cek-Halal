import React, { Component } from 'react';
import Button from './Button';

export default class Input extends Component {
	render() {
		const {OnChange, OnSubmit} = this.props;

		return (
			<div>
				<form onSubmit={OnSubmit}>
					<div className="col-md-4 col-xs-12">
						<div className="form-group">
							<select onChange={OnChange} name="menu" className="form-control">
								<option>-Pilih-</option>
								<option value="nama_produk">Nama Produk</option>
								<option value="nama_produsen">Nama Produsen</option>
								<option value="nomor_sertifikat">Nomor Sertifikat</option>
							</select>
						</div>
					</div>
					<div className="col-md-4 col-xs-12">
						<input type="text" placeholder="Masukkan" onChange={OnChange} name="query" className="form-control"/>
					</div>
					<div className="col-md-4 col-xs-12">
						<Button nameButton="Cari"/>
					</div>
				</form>
			</div>
		)
	}
}