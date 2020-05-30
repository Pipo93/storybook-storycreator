import React, { ReactElement } from 'react'
import { Text, View } from 'react-native'

export type Props = {
    /** simpleObject is an object with simple data types like booleans, strings and numbers */
    simpleObject: {
        booleanValue: boolean
        /**
         * optional boolean which defaults to true
         *
         * @defaultValue true
         * */
        optionalBoolean?: boolean
        stringValue: string
        optionalString?: string
        numberValue: number
        optionalNumber?: number
        /**
         * @deprecated true
         * @deprecationNotes use optionalNumber instead
         * */
        deprecatedNumber?: number
    }
}

const WithObjectAsProp = (props: Props): ReactElement => {
    return (
        <View>
            <Text>{JSON.stringify(props, undefined, 2)}</Text>
        </View>
    )
}

export default WithObjectAsProp
