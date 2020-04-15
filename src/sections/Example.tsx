import React, { ComponentClass, FunctionComponent, ReactElement } from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import { ContentLayout } from '../layouts'

type Props<P> = {
    title: string
    description?: string
    exampleProps: P | P[]
    component: FunctionComponent<P> | ComponentClass<P>
}

const Example = <P,>({ title, description, exampleProps, component }: Props<P>): ReactElement => {
    const Component = component
    const isSmallDevice = Dimensions.get('window').width < 900

    return (
        <ContentLayout style={{ marginBottom: 32 }}>
            <ScrollView horizontal style={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
                <View
                    style={{
                        flexDirection: isSmallDevice ? 'column' : 'row',
                    }}
                >
                    <View style={{ width: isSmallDevice ? '100%' : 250, marginRight: 16 }}>
                        <Text style={{ fontSize: 18, marginBottom: 16 }}>{title}</Text>
                        {description ? (
                            <Text style={{ marginBottom: 16 }}>{description}</Text>
                        ) : null}
                    </View>
                    <View
                        style={{
                            width: isSmallDevice ? '100%' : 650,
                            backgroundColor: '#F0F4F7',
                            padding: 16,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        {Array.isArray(exampleProps) ? (
                            exampleProps.map((props, index) => (
                                <View key={index} style={{ paddingHorizontal: 8 }}>
                                    <Component {...props} />
                                </View>
                            ))
                        ) : (
                            <Component {...exampleProps} />
                        )}
                    </View>
                </View>
            </ScrollView>
        </ContentLayout>
    )
}

export default Example
