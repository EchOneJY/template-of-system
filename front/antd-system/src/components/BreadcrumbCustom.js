import React from 'react'
import { Breadcrumb } from 'antd';

const BreadcrumbCustom = ({first, second}) => {

    return ( 
        <span>
            <Breadcrumb style={{ margin: '12px 0' }}>
                    {<Breadcrumb.Item>{first}</Breadcrumb.Item> || ''}
                    {<Breadcrumb.Item>{second}</Breadcrumb.Item> || ''}
            </Breadcrumb>
        </span>
    );
}
 
export default BreadcrumbCustom