import React, { FunctionComponent, ReactElement } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ContentLayout } from '../layouts'

type PropsMap = {
    [propName: string]: {
        type: string
        description?: string
        defaultValue?: string | number | boolean
        enum?: string[] | number[] | boolean[]
    }
}

export type PropsObject = {
    requiredProps: PropsMap
    optionalProps: PropsMap
}

// const DUMMY_PROPS: PropsObject = {
//     requiredProps: {
//         children: {
//             description: 'Number shown inside the badge',
//             type: 'number',
//         },
//         type: {
//             description: 'The type refers to the backgroundColor of the badge',
//             enum: ['primary', 'primaryVariant', 'secondary', 'surface'],
//             type: 'string',
//         },
//     },
//     optionalProps: {
//         testID: {
//             description: 'testID e.g. to be used with Detox or @testing-library/react',
//             type: 'string',
//         },
//     },
// }

const HeaderCell: FunctionComponent<{ width: number }> = ({ children, width }): ReactElement => {
    return (
        <View
            style={{
                backgroundColor: '#FBFBFB',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 16,
                borderRightWidth: 1,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#0000001F',
                width,
            }}
        >
            <Text>{children}</Text>
        </View>
    )
}

const TableCell: FunctionComponent<{ width: number }> = ({ children, width }): ReactElement => {
    return (
        <View
            style={{
                justifyContent: 'center',
                padding: 16,
                borderRightWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#0000001F',
                width,
            }}
        >
            <Text numberOfLines={0}>{children}</Text>
        </View>
    )
}

type Prop = {
    name: string
    type: string
    description?: string
    defaultValue?: string | boolean | number
}
const PropRow: FunctionComponent<Prop> = ({
    name,
    type,
    defaultValue,
    description,
}): ReactElement => {
    return (
        <View
            style={{
                flexDirection: 'row',
                borderLeftWidth: 1,
                borderColor: '#0000001F',
            }}
        >
            <TableCell width={200}>{name}</TableCell>
            <TableCell width={200}>{type}</TableCell>
            <TableCell width={150}>{defaultValue}</TableCell>
            <TableCell width={300}>{description}</TableCell>
        </View>
    )
}

const PropsAPI: FunctionComponent<{ schema: PropsObject }> = ({ schema }): ReactElement | null => {
    const requiredPropsRows = Object.keys(schema.requiredProps).map(propName => {
        const { type, defaultValue, description, enum: propTypeEnum } = schema.requiredProps[
            propName
        ]

        let propType = type
        if (propTypeEnum) {
            // TODO: pass this to PropRow and highlight enum values by background color for example
            propType = 'oneOf: \n'
            propTypeEnum.forEach((t: string | boolean | number): void => {
                const propTypePrinted = type === 'string' ? `'${t}'` : t
                propType += `${propTypePrinted}, `
            })
        }
        return (
            <PropRow
                key={propName}
                name={propName}
                type={propType}
                defaultValue={defaultValue}
                description={description}
            />
        )
    })

    const optionalPropsRows = Object.keys(schema.optionalProps).map(propName => {
        const { type, defaultValue, description } = schema.optionalProps[propName]

        return (
            <PropRow
                key={propName}
                name={propName}
                type={type}
                defaultValue={defaultValue}
                description={description}
            />
        )
    })

    return (
        <ContentLayout style={{ marginBottom: 32 }}>
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 21 }}>Required Props</Text>
            </View>
            <ScrollView horizontal style={{ flexGrow: 1 }}>
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderLeftWidth: 1,
                            borderColor: '#0000001F',
                        }}
                    >
                        <HeaderCell width={200}>Name</HeaderCell>
                        <HeaderCell width={200}>Type</HeaderCell>
                        <HeaderCell width={150}>Default Value</HeaderCell>
                        <HeaderCell width={300}>Description</HeaderCell>
                    </View>
                    {requiredPropsRows}
                </View>
            </ScrollView>
            <View style={{ marginBottom: 16, marginTop: 32 }}>
                <Text style={{ fontSize: 21 }}>Optional Props</Text>
            </View>
            <ScrollView horizontal style={{ flexGrow: 1 }}>
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderLeftWidth: 1,
                            borderColor: '#0000001F',
                        }}
                    >
                        <HeaderCell width={200}>Name</HeaderCell>
                        <HeaderCell width={200}>Type</HeaderCell>
                        <HeaderCell width={150}>Default Value</HeaderCell>
                        <HeaderCell width={300}>Description</HeaderCell>
                    </View>
                    {optionalPropsRows}
                </View>
            </ScrollView>
        </ContentLayout>
    )
}

export default PropsAPI
