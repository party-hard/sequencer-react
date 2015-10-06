'use strict';

var React = require('react/addons');
var SortableMixin = require('./react-sortable-mixin.js');
var PatternComponent = require('./PatternComponent');

var PatternList = React.createClass({
  mixins: [SortableMixin],
  sortableOptions: {
    model: 'patterns',
    ref: 'pattern'
  },
  getInitialState: function () {
    return {
      patterns: this.props.patterns,
      showEditForm: false
    };
  },
  handleSort: function (event) {
    this.props.onPatternMove(event.oldIndex, event.newIndex);
  },
  handlePatternDuplicate: function (pattern) {
    this.props.onPatternDuplicate(pattern);
  },
  render: function () {
    return (
      <ul ref='patterns' className='PatternList'>{
        this.state.patterns.map(function (pattern, patternKey) {
          return (
            <PatternComponent
              trackTempo={this.props.trackTempo}
              key={patternKey}
              newTrack={false}
              onPatternUpdate={this.props.onPatternUpdate}
              duplicate={this.handlePatternDuplicate.bind(this, pattern)}
              onDeletePattern={this.props.onDeletePattern}
              data={pattern}/>
          );
        }.bind(this))
      }</ul>
    );
  }
});

module.exports = PatternList;
