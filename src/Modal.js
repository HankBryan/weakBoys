import React from 'react';

export function Modal(props){
    if (!props.show){
        return null;
    }
    return (<div className= "modal" onClick = {props.onClose}>
        <div className = "modal-content" onClick = {e => e.stopPropagation()}>
            <div className = "modal-header">
                <h4 className = "modal-title">{props.title}</h4>
            </div>
            <div className = "modal-body">
                {props.children}
            </div>
            <div className = "modal-footer">
                <button className = "button" onClick ={props.onClose}>{props.close}</button>
                {props.includeSubmit && <button className = "button" onClick ={props.onSubmit}>{props.submit}</button>}
            </div>
        </div>
    </div>);
}