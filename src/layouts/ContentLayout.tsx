import React, { FunctionComponent, ReactElement } from 'react'
import { View, ViewStyle } from 'react-native'

type ContentLayoutProps = {
    style?: ViewStyle
}

const ContentLayout: FunctionComponent<ContentLayoutProps> = ({
    children,
    style,
}): ReactElement => {
    return (
        <View style={{ flexDirection: 'row', flexGrow: 1, backgroundColor: '#fff', ...style }}>
            <View style={{ width: '10%' }} />
            <View style={{ flex: 1 }}>{children}</View>
            <View style={{ width: '10%', flexShrink: 0 }} />
        </View>
    )
}

export default ContentLayout
