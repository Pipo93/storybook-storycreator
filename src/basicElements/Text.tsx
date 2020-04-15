import React, { FunctionComponent, ReactElement } from 'react'
import { Text as NativeText, TextStyle } from 'react-native'

type Props = {
    style?: TextStyle
}

const Text: FunctionComponent<Props> = ({ children, style }): ReactElement => {
    return <NativeText style={{ ...style }}>{children}</NativeText>
}

export default Text
