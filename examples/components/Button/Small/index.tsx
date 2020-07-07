import React, { FunctionComponent, ReactElement } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ButtonTypes } from '../ButtonTypes'

export type SmallButtonProps = {
    /** text shown inside of the button */
    children: string
    /**
     * callback function triggered when button is pressed
     *
     * @TJS-type function
     */
    onPress?: () => void
} & ButtonTypes

const SmallButton: FunctionComponent<SmallButtonProps> = ({
    children,
    type = 'black',
    onPress,
}): ReactElement => {
    return (
        <TouchableOpacity style={{ flexGrow: 0, flexDirection: 'row' }} onPress={onPress}>
            <View
                style={{
                    backgroundColor: type,
                    borderRadius: 8,
                    height: 44,
                    justifyContent: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 4,
                    flexGrow: 0,
                }}
            >
                <Text
                    style={{
                        color: type !== 'white' ? 'white' : 'black',
                        fontSize: 14,
                        lineHeight: 16,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    {children}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default SmallButton
