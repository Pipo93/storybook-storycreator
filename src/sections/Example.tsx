import React, { ComponentClass, FunctionComponent, ReactElement, useState } from 'react'
import { View, Text, ScrollView, ImageBackground } from 'react-native'
import { ContentLayout } from '../layouts'
import { ExampleConfig, VariantsBackground } from '../StoryCreator'

type Props<P> = ExampleConfig<P> & {
    component: FunctionComponent<P> | ComponentClass<P>
}

const defaultBackground: VariantsBackground = { type: 'COLOR', color: '#F0F4F7' }

type VariantBackgroundProps = {
    variantsBackground: VariantsBackground
    children: ReactElement
}

// TODO: move to extra file
const VariantBackground = ({
    children,
    variantsBackground,
}: VariantBackgroundProps): ReactElement => {
    if (variantsBackground.type === 'IMAGE') {
        const { src } = variantsBackground
        const source = typeof src === 'string' ? { uri: src } : src

        return (
            <ImageBackground
                source={source}
                style={{
                    flex: 1,
                    padding: 16,
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: 'blue',
                }}
                resizeMode="repeat"
            >
                {children}
            </ImageBackground>
        )
    }

    // color type
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: variantsBackground.color,
                padding: 16,
                alignItems: 'center',
                flexDirection: 'row',
            }}
        >
            {children}
        </View>
    )
}

const Example = <P,>({
    title,
    description,
    variants,
    variantsDirection,
    variantsBackground = defaultBackground,
    component,
}: Props<P>): ReactElement => {
    const [variantsContainerWidth, setContainerWidth] = useState(375)

    const Component = component

    return (
        <ContentLayout style={{ marginBottom: 32 }}>
            <View style={{ flexDirection: 'column', width: '100%' }}>
                <View style={{ flex: 1, paddingVertical: 16 }}>
                    <Text style={{ fontSize: 18 }}>{title}</Text>
                    {description ? <Text style={{ marginTop: 16 }}>{description}</Text> : null}
                </View>

                <VariantBackground variantsBackground={variantsBackground}>
                    <ScrollView
                        horizontal
                        onLayout={({ nativeEvent }): void => {
                            if (
                                nativeEvent.layout.width &&
                                nativeEvent.layout.width !== variantsContainerWidth
                            ) {
                                setContainerWidth(nativeEvent.layout.width)
                            }
                        }}
                        style={{ flexGrow: 1, flexDirection: variantsDirection }}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ flexDirection: variantsDirection, flexGrow: 1 }}>
                            {variants.map((props, index) => (
                                <View
                                    key={index}
                                    style={{
                                        paddingLeft:
                                            index !== 0 && variantsDirection === 'row' ? 8 : 0,
                                        paddingTop:
                                            index !== 0 && variantsDirection === 'column' ? 8 : 0,
                                        flexGrow: variantsDirection === 'column' ? 1 : undefined,
                                        maxWidth: variantsContainerWidth,
                                    }}
                                >
                                    <Component {...props} />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </VariantBackground>
            </View>
        </ContentLayout>
    )
}

export default Example
