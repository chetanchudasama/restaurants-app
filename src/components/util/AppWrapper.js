import React from 'react';

const AppWrapper = (props) => {
    return (
        <div className="page-wrapper noselect" id="page_wrapper">
            {props.children}
        </div>
    );
};

export default AppWrapper;