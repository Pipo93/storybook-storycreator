import React, { FunctionComponent, ReactElement } from 'react'
import { Text, TouchableOpacity } from 'react-native'

export type Props = {
    /**
     * callback function with return type void and no input parameters
     *
     * @TJS-type function
     *
     * @signature {
     *    "parameters": [],
     *    "returns": ["void"]
     * }
     */
    onPressVoid: () => void
    /**
     * callback function with return type void and two input parameters
     *
     * @TJS-type function
     *
     * @signature {
     *    "parameters": [{ "name": "msg", "type": "string" }, { "name": "isValid", "type": "boolean" }],
     *    "returns": ["void"]
     * }
     */
    onPressVoidWithParams: (msg: string, isValid: boolean) => void
    /**
     * callback function with multiple return types
     *
     * @TJS-type function
     *
     * @signature {
     *    "returns": ["number", "string", "{ test: 42 }"]
     * }
     */
    onMultipleReturnTypes: () => number | string | { test: 42 }
}

const WithFunctionAsProp: FunctionComponent<Props> = ({
    onPressVoid,
    onPressVoidWithParams,
    onMultipleReturnTypes,
}): ReactElement => {
    const onPress = (): void => {
        onPressVoid()
        onPressVoidWithParams('onPressVoidWithParams triggered', true)
        onMultipleReturnTypes()
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <Text>Function as Prop</Text>
        </TouchableOpacity>
    )
}

export default WithFunctionAsProp
