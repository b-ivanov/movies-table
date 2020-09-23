import React from 'react';
import {connect} from 'react-redux';
import AppUtils from '../app-utils';
import MovieRecord from '../inerfaces/MovieRecord';

/**The NewRecordForm component renders a form for creating and editin records */
class NewRecordForm extends React.Component {
	/**Removes the red border from an input field */
	removeRedBorder (ev:any) {
		ev.target.style.boder = "";
	};

	/**Reads all feilds in the form and validates them. If errors are found a corresponding message appears */
	getFormData (checkForDuplicate:boolean) {
		let recordObj:any = {};
		let inputs:any = document.querySelectorAll("form.recordEditForm input");
		let hasErrors:boolean = false;
		for (const key in inputs) {
			if (Object.prototype.hasOwnProperty.call(inputs, key)) {
				let element:any = inputs[key];
				if (element.value === "") {
					hasErrors = true;
					element.style.border = "1px solid red";
				} else {
					if (element.type === "number") {
						recordObj[element.name] = parseFloat(element.value);
					} else {
						recordObj[element.name] = element.value;
					}
				}
			}
		}
		const props:any = this.props;
		if (checkForDuplicate && AppUtils.getIndexOfRecord(props.moviesDB, "title", recordObj.title) >= 0) {
			window.alert("A record with the same name already exists!");
			return null;
		} else {
			if (hasErrors) {
				window.alert("All fields are required!");
				return null;
			} else {
				return recordObj;
			}
		}
	};
	
	/**Calls dispatch for hiding the form */
	closeForm () {
		const props:any = this.props;
		props.dispatch({ 
			type: "TOGGLE_FORM_DISPLAY",
			showForm: false
		});
	};

	/**Calls dispatch for creating or changing a record to the table */
	submitNewData (event:any, recordIndex:number) {
		event.preventDefault();
		const props:any = this.props;
		const isNewRecord:boolean = recordIndex === null;
		let recordData:MovieRecord|null = this.getFormData(isNewRecord);
		if (recordData  !== null) {
			if (isNewRecord) {
				props.dispatch({ 
					type: "RECORD_CREATE",
					showForm: false,
					recordIndexForEdit: null,
					recordUpdate: recordData
				});
			} else {
				props.dispatch({ 
					type: "RECORD_UPDATE",
					showForm: false,
					recordIndexForEdit: null,
					recordUpdate: recordData
				});
			}
		}
	};

	/**Component render function */
	render () {
		const props:any = this.props;
		if (props.showForm) {
			let dummyRecord:any = {
				id: props.moviesDB.length + 50,
				title: "",
				director: "",
				distributor: "",
				imdb_rating: "",
				imdb_votes: ""
			};
			let heading:string = "New movie record";
			const recordInd:number = props.recordIndexForEdit;
			if (recordInd !== null) {
				heading = "Edit movie record";
				dummyRecord = props.moviesDB[recordInd];
			}
			return (<div className="formOverlay">
				<form className="recordEditForm">
					<h1>{heading}</h1>
					<label>Title</label>
					<input name="title" type="text" placeholder="The punisher" onFocus={(event:any) => {this.removeRedBorder(event)}} defaultValue={dummyRecord.title}/>
					<label>Director</label>
					<input name="director" type="text" placeholder="Jonathan Hensleigh" onFocus={(event:any) => {this.removeRedBorder(event)}} defaultValue={dummyRecord.director}/>
					<label>Distributor</label>
					<input name="distributor" type="text" placeholder="Netflix" onFocus={(event:any) => {this.removeRedBorder(event)}} defaultValue={dummyRecord.distributor}/>
					<label>IMDB Rating</label>
					<input name="imdb_rating" type="number" min="0" max="10" step='0.1' placeholder="8.5" onFocus={(event:any) => {this.removeRedBorder(event)}} defaultValue={dummyRecord.imdb_rating}/>
					<label>IMDB Votes</label>
					<input name="imdb_votes" type="number" min="0" step='1' placeholder="175879" onFocus={(event:any) => {this.removeRedBorder(event)}} defaultValue={dummyRecord.imdb_votes}/>
					<label className="hiddenElement">ID</label>
					<input className="hiddenElement" name="id" type="number" defaultValue={dummyRecord.id}/>
					<div className="buttonsContainer">
						<button className="uiBtn green" onClick={(event:any) => {this.submitNewData(event, recordInd)}}>Save</button>
						<button className="uiBtn" onClick={() => {this.closeForm()}}>Cancel</button>
					</div>
				</form>
			</div>);
		} else {
			return '';
		}
		
	}
};

export default connect(AppUtils.mapStateToProps)(NewRecordForm);