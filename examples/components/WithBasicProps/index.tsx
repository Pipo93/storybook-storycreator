import React, { ReactElement } from 'react'
import { Text, View } from 'react-native'

export type Props = {
    /** required boolean prop */
    booleanValue: boolean
    /**
     * optional boolean which defaults to true
     *
     * @defaultValue true
     **/
    optionalBoolean?: boolean
    /** required string prop */
    stringValue: string
    /**
     * optional string which defaults to 'placeholder'
     *
     * @defaultValue placeholder
     **/
    optionalString?: string
    /** required number prop */
    numberValue: number
    /**
     * optional number which defaults to 42
     *
     * @defaultValue 42
     **/
    optionalNumber?: number
    /**
     * use optionalNumber instead
     *
     * @deprecated true
     * */
    deprecatedNumber?: number
}

const WithBasicProps = (props: Props): ReactElement => {
    return (
        <View>
            <Text>{JSON.stringify(props, undefined, 2)}</Text>
        </View>
    )
}

export default WithBasicProps
