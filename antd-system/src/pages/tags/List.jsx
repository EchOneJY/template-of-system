import React, { Component } from 'react';
import CategoryAndTags from '../../components/CategoryAndTags'

class TagsList extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <CategoryAndTags showType="1"/>
        )
    }
}
 
export default TagsList;