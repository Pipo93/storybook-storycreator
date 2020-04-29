import React, { FunctionComponent, ReactElement } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ContentLayout } from '../layouts'

type Prop = {
    name: string
    type: string | string[]
    description?: string
    defaultValue?: string | boolean | number
    deprecated?: boolean
    propTypeEnum?: string[] | number[] | boolean[]
}

type PropsMap = {
    [propName: string]: {
        type: string | string[]
        description?: string
        defaultValue?: string | boolean | number
        deprecated?: boolean
        enum?: string[] | number[] | boolean[]
    }
}

export type PropsObject = {
    requiredProps: PropsMap
    optionalProps: PropsMap
}

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

const TableCell: FunctionComponent<{ width: number; deprecated?: boolean }> = ({
    children,
    width,
    deprecated,
}): ReactElement => {
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
            <Text style={deprecated ? { color: 'red' } : undefined} numberOfLines={0}>
                {children}
            </Text>
        </View>
    )
}

const PropRow: FunctionComponent<Prop> = ({
    name,
    type,
    defaultValue,
    description,
    propTypeEnum,
    deprecated,
}): ReactElement => {
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
        <View
            style={{
                flexDirection: 'row',
                borderLeftWidth: 1,
                borderColor: '#0000001F',
            }}
        >
            <TableCell deprecated={deprecated} width={200}>
                {name}
            </TableCell>
            <TableCell deprecated={deprecated} width={200}>
                {Array.isArray(propType) ? propType.join(', ') : propType}
            </TableCell>
            <TableCell deprecated={deprecated} width={150}>
                {defaultValue}
            </TableCell>
            <TableCell deprecated={deprecated} width={300}>
                {deprecated ? `Deprecated: ${description}` : description}
            </TableCell>
        </View>
    )
}

const PropsAPI: FunctionComponent<{ schema: PropsObject }> = ({ schema }): ReactElement | null => {
    const requiredPropsRows = Object.keys(schema.requiredProps).map(propName => {
        const {
            type,
            defaultValue,
            description,
            enum: propTypeEnum,
            deprecated,
        } = schema.requiredProps[propName]

        return (
            <PropRow
                key={propName}
                name={propName}
                type={type}
                defaultValue={defaultValue}
                description={description}
                propTypeEnum={propTypeEnum}
                deprecated={deprecated}
            />
        )
    })

    const optionalPropsRows = Object.keys(schema.optionalProps).map(propName => {
        const {
            type,
            defaultValue,
            description,
            enum: propTypeEnum,
            deprecated,
        } = schema.optionalProps[propName]

        return (
            <PropRow
                key={propName}
                name={propName}
                type={type}
                defaultValue={defaultValue}
                description={description}
                propTypeEnum={propTypeEnum}
                deprecated={deprecated}
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
