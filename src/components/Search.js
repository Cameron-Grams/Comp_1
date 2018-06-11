import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {AutoComplete} from 'antd'

/**
 * Component supplies an alternative to the map for
 * selecting an airport to view delays
 * Contains a simple auto-complete component
 */
class Search extends Component {
    static propTypes = {
        dataSource: PropTypes.arrayOf(PropTypes.string),
        handleSelect: PropTypes.func,
    };

    onSelect = (value) => {
        console.log('onSelect', value);
    };

    handleSearch = (inputValue, option) => {
        return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    };

    render() {
        const {dataSource, handleSelect} = this.props;
        return (
            <AutoComplete
                dataSource={dataSource}
                style={{width: 200}}
                onSelect={handleSelect}
                placeholder="Enter Airport Code"
                filterOption={this.handleSearch}
            />
        );
    }
}

export default Search
