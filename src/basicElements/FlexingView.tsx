import React, { FunctionComponent, ReactElement } from 'react'
import { View, ViewStyle } from 'react-native'

type Props = {
    style?: ViewStyle
}

const FlexingView: FunctionComponent<Props> = ({ style, children }): ReactElement => {
    return <View style={{ display: 'flex', flexGrow: 1, ...style }}>{children}</View>
}

export default FlexingView
