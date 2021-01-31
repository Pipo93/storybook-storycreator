import React, { ReactElement } from 'react'
import { View, TouchableOpacity } from 'react-native'

type Props = {
    checked: boolean
    onPress?: (value: boolean) => void
}
const Checkbox = ({ checked, onPress }: Props): ReactElement => {
    return (
        <TouchableOpacity
            onPress={(): void => onPress && onPress(checked)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
            <View
                style={{
                    width: 16,
                    height: 16,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: '#3899EC',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <View
                    style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: checked ? '#3899EC' : undefined,
                    }}
                />
            </View>
        </TouchableOpacity>
    )
}

export default Checkbox
