'use strict';

var React = require('react/addons');
var LoopsComponent = require('./LoopsComponent');
var PatternForm = require('components/PatternForm');
var BeatsComponent = require('./BeatsComponent');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      showForm: false
    };
  },
  showEditForm: function () {
    this.state.showForm = true;
    this.setState(this.state);
  },
  hideForm: function () {
    this.state.showForm = false;
    this.setState(this.state);
  },
  handleSubmit: function (pattern) {
    this.hideForm();
    this.props.onPatternUpdate(pattern);
  },
  handleCancel: function (pattern) {
    this.hideForm();
    this.props.onCancel(pattern);
  },
  handleLoopsChange: function (counter) {
    console.log(counter);
  },
  deletePattern: function () {
    this.props.onDeletePattern(this.props.data.id);
  },
  renderForm: function () {
    return (
      <PatternForm
        trackTempo={this.props.trackTempo}
        data={this.props.data}
        newTrack={false}
        onCancel={this.handleCancel}
        onSubmit={this.handleSubmit}
        hideForm={this.hideForm}/>
    );
  },
  handlePatternInsert: function (beat, position) {
    this.props.data.insertBeat(beat, position);
    this.setState(this.state);
    this.props.onPatternUpdate(this.props.data);
  },
  handlePatternRemove: function (beatId) {
    this.props.data.deleteBeat(beatId);
    if (this.props.data.beats.length === 0) {
      this.deletePattern();
    }
    this.props.onPatternUpdate(this.props.data);
    this.setState(this.state);
  },
  handlePatternMove: function (newIndex, oldIndex) {
    this.props.data.moveBeat(newIndex, oldIndex);
    this.setState(this.state);
    this.props.onPatternUpdate(this.props.data);
  },
  handleDuplicate: function () {
    this.props.duplicate(this.props.data.id);
  },
  renderPattern: function () {
    return (
      <div className="inner">
        <LoopsComponent onValueChange={this.handleLoopsChange} data={this.props.data.counter}/>
        <div className="handle">{this.props.data.name}</div>
        <div className="custom">
          { this.props.data.tempoIsCustom
            ? <span>custom</span>
            : <span>general</span> }
        </div>
        <div className="tempo">{this.props.data.tempo}</div>
        <div className="duplicate">
          <a href="#" onClick={this.handleDuplicate}>duplicate</a>
        </div>
        <div className="edit">
          <a href="#" onClick={this.showEditForm}>edit</a>
        </div>
        <div className="delete">
          <a href="#" onClick={this.deletePattern}>delete</a>
        </div>
        <BeatsComponent
          patternId={this.props.data.id}
          patternName={this.props.data.name}
          onSort={this.handleBeatsSort}
          onPatternInsert={this.handlePatternInsert}
          onPatternRemove={this.handlePatternRemove}
          onPatternMove={this.handlePatternMove}
          data={this.props.data.beats}/>
      </div>
    );
  },
  render: function () {
    return (
      this.state.showForm
        ? this.renderForm()
        : this.renderPattern()
    );
  }
});
