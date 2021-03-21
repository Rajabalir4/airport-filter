import React from 'react'

export default function Checkbox(props) {
    return (
        <div className="checkbox-container" onClick={props.handleCheck}>{props.label}
            <input type="checkbox" checked={props.checked} onChange/>
            <span class="checkmark"></span>
        </div>
    )
}
