import React, { ComponentClass, FunctionComponent, ReactElement, ReactNode, useState } from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ContentLayout } from '../layouts'
import SectionHeadline from '../basicElements/SectionHeadline'
import Checkbox from '../basicElements/Checkbox'
import PropRow from '../components/Playground/PropRow'
import TextInput from '../basicElements/TextInput'
import { CopyToClipBoard } from '../components'
import { PropsObject } from './PropsAPI'

// import SyntaxHighlighter from 'react-native-syntax-highlighter';

type PlaygroundProps<P> = {
    Component: FunctionComponent<P> | ComponentClass<P>
    initialProps: P
    callbackPropPrinted?: { [key: string]: string }
    schema: PropsObject
    componentName: string
}

// TODO: add support for multiple types (string[])
type SnippedProps<P> = [string, P[keyof P] | string, string | undefined | string[]][]
const generateCodeSnipped = <P,>(
    componentName: string,
    props: SnippedProps<P>,
    children?: ReactNode
): string => {
    const propsSnipped = props
        .map(prop => {
            const [name, value, type] = prop
            if (value === undefined) {
                return ''
            }

            if (type === 'function') {
                return `\n  ${name}={${value}}`
            }

            if (typeof value === 'string') {
                return `\n  ${name}="${value}"`
            }
            if (typeof value === 'object') {
                return `\n  ${name}={${JSON.stringify(value)}}`
            }
            return `\n  ${name}={${value}}`
        })
        .join('')
    const codeSnipped = `<${componentName}${propsSnipped}${
        children ? `\n>\n  ${children}\n</${componentName}>` : '\n/>'
    }`
    return codeSnipped
}

const Playground = <P,>({
    Component,
    initialProps,
    callbackPropPrinted = {},
    schema,
    componentName,
}: PlaygroundProps<P>): ReactElement => {
    const [playgroundProps, setPlaygroundProps] = useState(initialProps)
    const [showBasicProps, setShowBasicProps] = useState(true)
    const [showCallbackProps, setShowCallbackProps] = useState(true)

    let basicPropsCount = 0
    let callbackPropsCount = 0
    const allProps = { ...schema.requiredProps, ...schema.optionalProps }
    const snippedProps: SnippedProps<P> = []
    let children = undefined

    const basicPropsRows: ReactNode[] = []
    const callbackPropsRows: ReactNode[] = []

    Object.keys(allProps).forEach(propName => {
        const { type, enum: propTypeEnum } = allProps[propName]

        // TODO: check other solutions to prevent as any type-cast
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const currentValue = playgroundProps[propName as keyof P] as any
        const isRequired = !!schema.requiredProps[propName]

        if (propName === 'children') {
            children = currentValue
        } else if (type === 'function' && callbackPropPrinted[propName]) {
            snippedProps.push([propName, callbackPropPrinted[propName], type])
        } else {
            snippedProps.push([propName, currentValue, type])
        }

        if (propTypeEnum) {
            const typesEnum = propTypeEnum as string[] // needed to map over enum

            basicPropsCount++
            basicPropsRows.push(
                <PropRow key={propName} even={basicPropsCount % 2 === 0} propName={propName}>
                    <View>
                        {typesEnum.map((value, index) => (
                            <View key={index} style={{ flexDirection: 'row', height: 30 }}>
                                <Checkbox
                                    onPress={(): void =>
                                        setPlaygroundProps({
                                            ...playgroundProps,
                                            [propName]: value,
                                        })
                                    }
                                    checked={value === currentValue}
                                />
                                <View style={{ alignItems: 'center', marginLeft: 8 }}>
                                    <Text>{value}</Text>
                                </View>
                            </View>
                        ))}
                        {isRequired ? null : (
                            <TouchableOpacity
                                onPress={(): void => {
                                    setPlaygroundProps({
                                        ...playgroundProps,
                                        [propName]: undefined,
                                    })
                                }}
                            >
                                <Text>Clear</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </PropRow>
            )
        } else {
            if (type === 'boolean') {
                basicPropsCount++
                basicPropsRows.push(
                    <PropRow key={propName} even={basicPropsCount % 2 === 0} propName={propName}>
                        <Checkbox
                            checked={!!currentValue}
                            onPress={(): void =>
                                setPlaygroundProps({
                                    ...playgroundProps,
                                    [propName]: !currentValue,
                                })
                            }
                        />
                    </PropRow>
                )
            }

            if (type === 'string') {
                basicPropsCount++
                basicPropsRows.push(
                    <PropRow key={propName} even={basicPropsCount % 2 === 0} propName={propName}>
                        <TextInput
                            value={currentValue}
                            onChangeText={(text): void => {
                                setPlaygroundProps({ ...playgroundProps, [propName]: text })
                            }}
                        />
                    </PropRow>
                )
            }

            if (type === 'number') {
                basicPropsCount++
                basicPropsRows.push(
                    <PropRow key={propName} even={basicPropsCount % 2 === 0} propName={propName}>
                        <TextInput
                            keyboardType="numeric"
                            value={currentValue}
                            onChangeText={(text): void => {
                                setPlaygroundProps({
                                    ...playgroundProps,
                                    [propName]: parseFloat(text),
                                })
                            }}
                        />
                    </PropRow>
                )
            }

            if (type === 'function') {
                callbackPropsCount++
                callbackPropsRows.push(
                    <PropRow key={propName} even={callbackPropsCount % 2 === 0} propName={propName}>
                        <View>
                            {!isRequired && (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginBottom: 8,
                                    }}
                                >
                                    <Text style={{ marginRight: 8 }}>Active?</Text>
                                    <Checkbox
                                        checked={!!currentValue}
                                        onPress={(): void =>
                                            setPlaygroundProps({
                                                ...playgroundProps,
                                                [propName]: !!currentValue
                                                    ? undefined
                                                    : initialProps[propName as keyof P],
                                            })
                                        }
                                    />
                                </View>
                            )}
                            <Text>Try in preview</Text>
                        </View>
                    </PropRow>
                )
            }

            if (type === 'object') {
                // TODO: add support for objects
                basicPropsCount++
                basicPropsRows.push(
                    <PropRow key={propName} even={basicPropsCount % 2 === 0} propName={propName}>
                        <Text>Type {type} is not yet supported</Text>
                    </PropRow>
                )
            }
            // TODO: check if other types are possible
        }
    })

    const codeSnipped = generateCodeSnipped(componentName, snippedProps, children)
    return (
        <ContentLayout style={{ marginBottom: 32 }}>
            {basicPropsRows.length > 0 ? (
                <>
                    <TouchableOpacity
                        onPress={(): void => setShowBasicProps(!showBasicProps)}
                        activeOpacity={1}
                        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
                    >
                        <SectionHeadline>Basic Props</SectionHeadline>
                        <Text style={{ color: '#3899EC', marginLeft: 16 }}>
                            {showBasicProps ? 'Hide' : 'Expand'}
                        </Text>
                    </TouchableOpacity>
                    {showBasicProps ? basicPropsRows : null}
                </>
            ) : null}

            {callbackPropsRows.length > 0 ? (
                <>
                    <TouchableOpacity
                        onPress={(): void => setShowCallbackProps(!showCallbackProps)}
                        activeOpacity={1}
                        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
                    >
                        <SectionHeadline>Callback Props</SectionHeadline>
                        <Text style={{ color: '#3899EC', marginLeft: 16 }}>
                            {showCallbackProps ? 'Hide' : 'Expand'}
                        </Text>
                    </TouchableOpacity>
                    {showCallbackProps ? callbackPropsRows : null}
                </>
            ) : null}

            <View style={{ height: 1, backgroundColor: '#C1E4FE', marginVertical: 16 }} />
            <SectionHeadline>Preview</SectionHeadline>
            <View style={{ padding: 16, backgroundColor: '#e5e5e5', margin: 16 }}>
                <Component {...playgroundProps} />
            </View>

            <View style={{ height: 1, backgroundColor: '#C1E4FE', marginVertical: 16 }} />

            <SectionHeadline>Code</SectionHeadline>
            {Platform.OS === 'web' ? (
                <SyntaxHighlighter
                    customStyle={{ backgroundColor: '#f5f5f5', padding: 16, overflow: 'scroll' }}
                    language="typescript"
                    style={coy}
                    highlighter="prism"
                    wrapLines
                >
                    {codeSnipped}
                </SyntaxHighlighter>
            ) : (
                <View style={{ marginVertical: 32 }}>
                    <Text style={{ color: '#FF8080' }}>
                        Syntax highlighting is not yet available on native side
                    </Text>
                </View>
            )}
            <CopyToClipBoard textToCopy={codeSnipped} />
        </ContentLayout>
    )
}

export default Playground
