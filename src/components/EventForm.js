
import firebase from "../firebase/firebase";
import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {Button, Alert} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../scss/eventsForm.scss";
import moment from "moment";


export default class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name ? props.name : "",
      desc: props.desc ? props.desc : "",
      startDate: props.timeStamp ? moment.unix(props.timeStamp).toDate() : new Date(),
      img: props.img ? props.img : "",
      editorHtml: props.editorHtml ? props.editorHtml : "",
      imgalt: props.imgalt ? props.imgalt : "",
      mountedEditor: false
    };
    this.quillRef = null;
    this.reactQuillRef = null;
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.attachQuillRefs = this.attachQuillRefs.bind(this);
  }
  
  componentDidMount () {
    this.attachQuillRefs()
  }
  
  componentDidUpdate () {
    this.attachQuillRefs()
  }
  
  attachQuillRefs() {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    if (this.quillRef != null) return;
    const quillRef = this.reactQuillRef.getEditor();
    if (quillRef != null) this.quillRef = quillRef;
  }
  
  handleClick = () => {
    var range = this.quillRef.getSelection();
    let position = range ? range.index : 0;
    this.quillRef.insertText(position, 'Hello, World! ')
  }
  
  handleChange (html) {
    this.setState({ editorHtml: html });
  }
  imgURL = (e) => {
    const insertURL = e.target.value;
    this.setState({insertURL});
  }

  imageHandler = () =>{
    const range = this.quillRef.getSelection(true);
    this.quillRef.setSelection(range.index + 1);
    this.quillRef.insertEmbed(range.index, 'image',this.state.insertURL); 
  }

  handleUpload = (e) =>{
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const metadata = {
        customMetadata:{
          alt: this.state.imgalt
        }
      }
      firebase.storage().ref("images/"+image.name).put(image, metadata).then(() => {
        firebase.storage().ref("images").child(image.name).getDownloadURL().then((url) => {
          this.setState(() => ({img:url}))
        });
        firebase.storage().ref("images").child(image.name).getMetadata().then((metadata) =>
          metadata.customMetadata.alt && this.setState(() => ({imgalt:metadata.customMetadata.alt}))
        )
      });
    }
  }

  
  handleNameChange = (e) =>{
    const name = e.target.value;
    this.setState(() => ({name}))
  };

  handleDateChange = (date) =>{
    this.setState(() => ({
      startDate: date,
      date: moment(date).format("D. M. YYYY H:mm"),
      timeStamp: parseInt(moment(date).format("X"))
    }));
  };

  handleDescChange = (e) =>{
    const desc = e.target.value;
    this.setState(() => ({desc}))
  };

  handleAltChange = (e) => {
    const imgalt = e.target.value;
    this.setState(() => ({imgalt}))
  }

  onSubmit = (e) =>{
    e.preventDefault();
    this.props.onSubmit({
        name: this.state.name,
        date: this.state.date,
        timeStamp: this.state.timeStamp,
        desc:this.state.desc,
        img: this.state.img,
        editorHtml: this.state.editorHtml,
        imgalt: this.state.imgalt
    })
  }

  render () {
    const modules = {
      toolbar:{
        container:  [['bold', 'italic', 'underline', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['formula','link'],
        ['clean'],[{ 'align': [] }],[{"color" : [] }]],
        handlers:{
          image: this.imageHandler
        }
      },
      clipboard: {
        matchVisual: false,
      }
    }

   const formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'image', 'indent',
      'link', 'video', "align", "color"
    ]
    return (
      <div>
        <div className="container">
          <form onSubmit={this.onSubmit} className="properties-form">
                <label>Název</label> <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
                <label>Datum</label> 
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="d. M. yyyy HH:mm"
                  timeCaption="Čas"
                />
                <label>Perex</label> <textarea name="description" value={this.state.desc} onChange={this.handleDescChange}/>
                <label>Popisek náhledového obrázku</label> <input type="text" onChange={this.handleAltChange} value={this.state.imgalt}></input>  
                <label>Náhledový obrázek</label> <input type="file" onChange={this.handleUpload} />
                <img className="admin-preview" src={this.state.img} alt="" />
                <label>Vložte url obrázku:</label><input type="text" className="url-input" onChange={this.imgURL}></input>
                <Button onClick={this.imageHandler}>Vložit</Button>
                <div className="row">
                  <div className="col-4">
                    <h2>Článek</h2>
                  </div>
                  <div className="col-4  ml-auto create-btn-div">
                    <Button type="submit" className="">{this.props.btn}</Button>
                  </div>

                </div>
          </form>
          {this.props.uploaded && <Alert color="success">Událost byla úspěšně nahrána</Alert>}
          <ReactQuill 
            ref={(el) => { this.reactQuillRef = el }}
            theme='snow'
            onChange={this.handleChange}
            modules={modules}
            formats={formats}
            defaultValue={this.state.editorHtml}
            />
        </div>
      </div>
     )
  }
}