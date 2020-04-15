import React, { ReactElement } from 'react'
import { NonFlexingView } from '../basicElements'

const Divider = (): ReactElement => {
    return (
        <NonFlexingView
            style={{ backgroundColor: '#000', height: 1, width: '100%', opacity: 0.12 }}
        />
    )
}

export default Divider
