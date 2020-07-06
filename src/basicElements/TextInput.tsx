import React, { ReactElement } from 'react'
import { View, TextInput as RNTextInput, KeyboardTypeOptions } from 'react-native'

type Props = {
    keyboardType?: KeyboardTypeOptions
    value: string
    placeholder?: string
    onChangeText?: (text: string) => void
}

const TextInput = ({ value, placeholder, onChangeText, keyboardType }: Props): ReactElement => {
    return (
        <View style={{ flex: 1 }}>
            <RNTextInput
                keyboardType={keyboardType}
                style={{
                    height: 44,
                    padding: 8,
                    borderWidth: 1,
                    borderRadius: 6,
                    borderColor: '#C1E4FE',
                }}
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
            />
        </View>
    )
}

export default TextInput
