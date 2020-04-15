import React, { FunctionComponent, ReactElement } from 'react'
import { View, ViewStyle } from 'react-native'

type Style = ViewStyle & {
    flexGrow: never
}

type Props = {
    style?: ViewStyle
}

const NonFlexingView: FunctionComponent<Props> = ({ style, children }): ReactElement => {
    return <View style={{ display: 'flex', flexGrow: 0, ...style }}>{children}</View>
}

export default NonFlexingView
