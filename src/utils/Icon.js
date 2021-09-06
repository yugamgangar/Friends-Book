import React from 'react'
import Icons from './Icons'

export default function Icon({ className, icon }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            className={className || ''}
            viewBox={Icons[icon].viewBox}
            dangerouslySetInnerHTML={{ __html: Icons[icon].data }}
        />
    )
}
