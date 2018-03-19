import React, {Component} from 'react';

export default class List extends Component {
	render() {
		const nama_produk = this.props.value.nama_produk;
		const nama_produsen = this.props.value.nama_produsen;
		const berlaku_hingga = this.props.value.berlaku_hingga;
		const nomor_sertifikat = this.props.value.nomor_sertifikat;

		return (
			<div className="col-md-12 col-xs-12" style={{'marginTop': '5px'}}>
				<div className="panel panel-primary">
					<div className="panel-body">
						<table className="table table-hover table-striped">
							<tbody>
								<tr>
									<td>Nama Produk</td>
									<td>:</td>
									<td>{nama_produk}</td>
								</tr>
								<tr>
									<td>Nama Produsen</td>
									<td>:</td>
									<td>{nama_produsen}</td>
								</tr>
								<tr>
									<td>Berlaku Hingga</td>
									<td>:</td>
									<td>{berlaku_hingga}</td>
								</tr>
								<tr>
									<td>Nomor Sertifikat</td>
									<td>:</td>
									<td>{nomor_sertifikat}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}