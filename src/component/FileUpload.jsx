import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudDownload from '@material-ui/icons/CloudDownload';


import '../css/dropzone.css';

const useStyles = theme => ({
  root: {
    width: '100%',
  },
});

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hightlight: false,
      files:[],
    };
    this.fileInputRef = React.createRef();
  }

  openFileDialog = () => {
    this.fileInputRef.current.click();
  }

  onFilesAdded = (event) => {
    const files = event.target.files;
    if (!this.props.viewOnly) {
      this.updateFileList(files);
    }
  }

  onDragOver = (evt) => {
    evt.preventDefault();
    this.setState({ hightlight: true });
  }

  onDragLeave = () => {
    this.setState({ hightlight: false });
  }

  onDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (!this.props.viewOnly) {
      this.updateFileList(files);
    }
    this.setState({ hightlight: false });
  }

  updateFileList = (list) => {
    const array = this.state.files;
    for (var i=0; i < list.length; i++) {
      array.push(list.item(i));
    }
    this.setState({ files: array });
  }

  renderUplodedFileEach = () => {
    let result = [];
    let filecount = 0;
    
    if(this.props.uploadedFiles && this.props.uploadedFiles.length > 0) {
      this.props.uploadedFiles.forEach((file, index) => {
        filecount++;
        result.push(<ListItem key={'FileUpload-Previously-'+index} button dense={true}><ListItemIcon><CloudDownload/></ListItemIcon><ListItemText primary={file.name} primaryTypographyProps={{variant:'body2'}}/></ListItem>);
      })
    }

    if(this.state.files && this.state.files.length > 0) {
      this.state.files.forEach((file, index) => {
        filecount++;
        result.push(<ListItem key={'FileUpload-Newly-'+index} button dense={true}><ListItemIcon><CloudDownload/></ListItemIcon><ListItemText primary={file.name} primaryTypographyProps={{variant:'body2'}}/></ListItem>);
      })
    } 
    
    if(filecount === 0){
      result.push(<ListItem button dense={true}><ListItemText primary='None' primaryTypographyProps={{variant:'body2'}}/></ListItem>);      
    }
    return result;
  }

  renderUplodedFiles = () => {
    return (
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Typography variant="body2">Uploaded File(s):</Typography>
        <List component="nav" dense={true}>
          {this.renderUplodedFileEach()}
        </List>
      </Grid>
    )
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="flex-start">
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <div
              className={`dropzone ${this.state.hightlight ? "dropzone-highlight" : ""}`}
              onDragOver={this.onDragOver}
              onDragLeave={this.onDragLeave}
              onDrop={this.onDrop}
              onClick={this.openFileDialog}
            >
              <input
                ref={this.fileInputRef}
                className="FileInput"
                type="file"
                multiple
                onChange={this.onFilesAdded}
              />
              <Typography variant="body2">Drag 'n' Drop / </Typography>
              <Typography variant="body2">Click to select file here</Typography>
              <Typography variant="body2">{'(< 10MB)'}</Typography>
            </div>
          </Grid>
          {this.renderUplodedFiles()}
        </Grid>
        <Grid container justify="flex-start">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography color="secondary" variant="subtitle1">Notes:</Typography>
            <Typography color="secondary" variant="body2">Please provide doctor certificate if you take sick leave more than one day.</Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(FileUpload);