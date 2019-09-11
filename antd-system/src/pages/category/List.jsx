import React, { Component } from 'react';
import CategoryAndTags from '../../components/CategoryAndTags'

class CategoryList extends Component {
    constructor(props) {
        super(props);
      
    }

    render() { 
        return (
            <CategoryAndTags showType="0"/>
        )
    }
}
 
export default CategoryList;