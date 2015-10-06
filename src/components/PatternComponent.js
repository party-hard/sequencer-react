'use strict';

var React = require('react/addons');
var Settings = require('./Settings');
var PatternForm = require('./PatternForm');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      showForm: false,
      data: this.props.data
    };
  },
  showEditForm: function () {
    this.state.showForm = true;
    this.setState(this.state);
  },
  duplicate: function () {
    this.props.duplicate(this.state.data);
  },
  hideForm: function () {
    this.state.showForm = false;
    this.setState(this.state);
  },
  handleSubmit: function (data) {
    this.hideForm();
    this.props.onPatternUpdate(data);
  },
  deletePattern: function (patternId) {
   this.props.onDeletePattern(patternId);
  },
  render: function () {
    return (
      <li key={this.props.patternKey}>
        {this.state.showForm ?
          <PatternForm
            trackTempo={this.props.trackTempo}
            data={this.props.data}
            newTrack={false}
            onSubmit={this.handleSubmit}
            hideForm={this.hideForm}/> :
          <div className="inner">
            {this.props.data.name}&nbsp;&nbsp;{this.props.data.beat}/{this.props.data.noteValue}
            <div className="custom">
              {
                this.props.data.customTempo ?
                <span>custom</span> :
                <span>general</span>
              }
            </div>
            <div className="tempo">{this.props.data.tempo}</div>
            <div className="duplicate">
              <a href="#" onClick={this.props.duplicate}>duplicate</a>
            </div>
            <div className="edit">
              <a href="#" onClick={this.showEditForm}>edit</a>
            </div>
            <div className="delete">
              <a href="#" onClick={this.deletePattern.bind(this, this.props.data.id)}>delete</a>
            </div>
            <ul>
              {
                this.props.data.lines.map(function (line, key){
                  return <li key={key}>{line.bufferIdx + ' ' + Settings.subDivisionNames[line.subDivision]}</li>;
                })
              }
            </ul>
          </div>
        }
      </li>
    );
  }
});
