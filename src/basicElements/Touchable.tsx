import React, { FunctionComponent, ReactElement } from 'react'
import { TouchableOpacity } from 'react-native'

type Props = {
    onPress?: () => void
}

const Touchable: FunctionComponent<Props> = ({ children, onPress }): ReactElement => {
    return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
}

export default Touchable
