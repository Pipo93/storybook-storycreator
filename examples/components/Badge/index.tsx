import React, { ReactElement, FunctionComponent } from 'react'
import { Text, View } from 'react-native'

export type BadgeProps = {
    /** Number shown inside the badge */
    children: number
    /** The type refers to the backgroundColor of the badge */
    type: 'black' | 'red'
    /** testID e.g. to be used with Detox or @testing-library/react */
    testID?: string
}

const Badge: FunctionComponent<BadgeProps> = ({ children, type, testID }): ReactElement | null => (
    <View style={{ flexDirection: 'row' }} testID={testID}>
        <View
            style={{
                backgroundColor: type,
                borderRadius: 8,
                width: `${children}`.length === 1 ? 16 : undefined,
                paddingHorizontal: `${children}`.length === 1 ? 0 : 4,
            }}
        >
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 11,
                    lineHeight: 16,
                    color: '#fff',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                }}
                allowFontScaling={false}
            >
                {`${children}`}
            </Text>
        </View>
    </View>
)

export default Badge
