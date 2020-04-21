import React, { FunctionComponent, ReactElement } from 'react'
import { View, Text } from 'react-native'
import { Touchable } from '.'

type Props = {
    children: string
    marginRight?: number
    onPress: () => void
}

const OutlinedButton: FunctionComponent<Props> = ({
    children,
    marginRight,
    onPress,
}): ReactElement => {
    return (
        <View
            style={{
                flexGrow: 0,
                marginRight,
                maxWidth: '100%',
                borderWidth: 1,
                borderColor: '#3899EC40',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 8,
                borderRadius: 4,
            }}
        >
            <Touchable onPress={onPress}>
                <Text style={{ fontSize: 12, color: '#3899EC' }}>{children}</Text>
            </Touchable>
        </View>
    )
}

export default OutlinedButton
