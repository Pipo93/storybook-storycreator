import React, { FunctionComponent, ReactElement } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ContentLayout } from '../layouts'

type Value = string | boolean | number

type PropType = string | string[]

type Parameter = {
    type: PropType
    name: string
    defaultValue?: Value
}

type Signature = {
    parameters?: Parameter[]
    returns?: PropType
}

type Prop = {
    name: string
    type: PropType
    description?: string
    defaultValue?: Value
    signature?: Signature
    deprecated?: boolean
    propTypeEnum?: (string | number | boolean)[]
    properties?: PropsMap
    required?: string[]
}

type PropsMap = {
    [propName: string]: {
        type: PropType
        description?: string
        defaultValue?: string | boolean | number
        signature?: Signature
        deprecated?: boolean
        enum?: string[] | number[] | boolean[]
        properties?: PropsMap
        required?: string[]
        deprecationNotes?: string
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
            {typeof children === 'string' ? (
                <Text style={deprecated ? { color: 'red' } : undefined} numberOfLines={0}>
                    {children}
                </Text>
            ) : (
                children
            )}
        </View>
    )
}

const getPropTypeString = (propType: PropType): string => {
    return Array.isArray(propType) ? propType.join(' | ') : propType
}

type PropTypeObject = {
    [propName: string]:
        | {
              type: string | string[]
              defaultValue?: Value
              required?: true
              deprecated?: boolean
              deprecationNotes?: string
          }
        | PropTypeObject
}

const getPropTypesObject = (properties: PropsMap, required: string[] = []): PropTypeObject => {
    const obj: PropTypeObject = {}
    Object.keys(properties).forEach(propName => {
        const {
            type,
            properties: props,
            required: requiredProps,
            defaultValue,
            deprecated,
            deprecationNotes,
        } = properties[propName]
        if (type === 'object' && props) {
            obj[propName] = getPropTypesObject(props, requiredProps)
        } else {
            obj[propName] = {
                type: getPropTypeString(type),
                defaultValue,
                required: required.includes(propName) || undefined,
                deprecated,
                deprecationNotes: deprecated ? deprecationNotes : undefined,
            }
        }
    })
    return obj
}

const PropRow: FunctionComponent<Prop> = ({
    name,
    type,
    defaultValue,
    description,
    propTypeEnum,
    deprecated,
    signature,
    properties,
    required,
}): ReactElement => {
    let propType: string | ReactElement = getPropTypeString(type)
    if (propTypeEnum) {
        const typesEnum: string[] = propTypeEnum.map(t => {
            return typeof t === 'string' ? `'${t}'` : `${t}`
        })
        propType = (
            <View>
                <View>
                    <Text>enum</Text>
                </View>
                <View style={{ marginTop: 16, height: 1, backgroundColor: '#e5e5e5' }} />
                <View style={{ marginTop: 16 }}>
                    <Text style={{ color: '#777777' }}>{getPropTypeString(typesEnum)}</Text>
                </View>
            </View>
        )
    }
    if (propType === 'function' && signature) {
        propType = (
            <View>
                <View>
                    <Text>{propType}</Text>
                </View>
                <View style={{ marginTop: 16, height: 1, backgroundColor: '#e5e5e5' }} />
                {signature.parameters?.length ? (
                    <View style={{ marginTop: 16 }}>
                        <Text style={{ color: '#777777', textDecorationLine: 'underline' }}>
                            Parameters:
                        </Text>
                        <View>
                            {signature.parameters.map(p => (
                                <Text style={{ color: '#777777', marginTop: 8 }} key={p.name}>{`${
                                    p.name
                                }: ${getPropTypeString(p.type)}${
                                    p.defaultValue ? `(default = ${p.defaultValue})` : ''
                                }`}</Text>
                            ))}
                        </View>
                    </View>
                ) : null}
                <View style={{ marginTop: 16 }}>
                    <Text style={{ color: '#777777', textDecorationLine: 'underline' }}>
                        Return type:
                    </Text>
                    <View style={{ marginTop: 8 }}>
                        <Text style={{ color: '#777777' }}>
                            {signature.returns ? getPropTypeString(signature.returns) : 'void'}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    if (propType === 'object' && properties) {
        propType = (
            <View>
                <View>
                    <Text>object</Text>
                </View>
                <View style={{ marginTop: 16, height: 1, backgroundColor: '#e5e5e5' }} />
                <View style={{ marginTop: 16 }}>
                    <Text style={{ color: '#777777' }}>
                        {JSON.stringify(getPropTypesObject(properties, required), undefined, 4)}
                    </Text>
                </View>
            </View>
        )
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
                {propType}
            </TableCell>
            <TableCell deprecated={deprecated} width={150}>
                {`${defaultValue ?? ''}`}
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
            signature,
            deprecated,
            properties,
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
                signature={signature}
                properties={properties}
            />
        )
    })

    const optionalPropsRows = Object.keys(schema.optionalProps).map(propName => {
        const {
            type,
            defaultValue,
            description,
            enum: propTypeEnum,
            signature,
            deprecated,
            properties,
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
                signature={signature}
                properties={properties}
            />
        )
    })

    return (
        <ContentLayout style={{ marginBottom: 32 }}>
            {requiredPropsRows.length ? (
                <>
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
                </>
            ) : null}
            {optionalPropsRows.length ? (
                <>
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
                </>
            ) : null}
        </ContentLayout>
    )
}

export default PropsAPI
