/**
 * Created by jasonmosley on 8/12/16.
 */
var TaskApp = React.createClass({
    getInitialState: function(){
    return {items: []};
    },
    updateItems: function(newItem){
        var allItems = this.state.items.concat([newItem]);
        this.setState({items: allItems});
    },
    render: function(){
        return (
            <div>
                <TaskForm onFormSubmit={this.updateItems}/>
                <TaskList items={this.state.items}/>
            </div>
        );
    }
});

var TaskForm = React.createClass({
    getInitialState: function() {
        return {item: ''};
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state.item);
        this.setState({item: ''});
        React.findDOMNode(this.refs.item).focus();
        return;
    },
    onChange: function(e) {
      this.setState({
          item: e.target.value
      });
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' ref='item' onChange={this.onChange} value={this.state.item}/>
                <input type='submit' value='Add'/>
            </form>
        )
    }
});

var TaskList= React.createClass({
    render: function() {
        var createItem = function(itemText) {
            return (
                <TaskListItem>(itemText)</TaskListItem>
            );
        };
        return <ul>(this.props.items.map(createItem)</ul>;
    }
});

var TaskListItem= React.createClass({
    render: function() {
        return (
            <li>(this.props.children)</li>
        )
    }
});