import React, { FunctionComponent, ReactElement } from 'react'
import { Text, View } from 'react-native'

type Props = {
    even: boolean
    propName: string
}

const PropRow: FunctionComponent<Props> = ({ propName, children, even }): ReactElement => {
    return (
        <View
            style={{
                flexDirection: 'row',
                minHeight: 50,
                backgroundColor: even ? '#fff' : '#F6F8FA',
                paddingHorizontal: 16,
            }}
        >
            <View style={{ flex: 1, padding: 16 }}>
                <Text>{propName}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', padding: 16 }}>{children}</View>
        </View>
    )
}

export default PropRow
