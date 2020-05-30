import React, { ComponentClass, FunctionComponent, ReactElement } from 'react'
import { View } from 'react-native'
import { ContentLayout } from '../layouts'
import { ExampleConfig } from '../StoryCreator'
import SectionHeadline from '../basicElements/SectionHeadline'
import { Example } from './index'

type Props<P> = {
    examples: ExampleConfig<P>[]
    component: FunctionComponent<P> | ComponentClass<P>
    headline?: string
}

const Examples = <P,>({ examples, component, headline = 'Examples' }: Props<P>): ReactElement => {
    return (
        <>
            {headline ? (
                <ContentLayout style={{ marginVertical: 32 }}>
                    <SectionHeadline>{headline}</SectionHeadline>
                </ContentLayout>
            ) : (
                <View style={{ height: 32 }} />
            )}
            {examples.map(
                ({ title, description, variants, variantsDirection, variantsBackground }) => (
                    <Example
                        key={title}
                        title={title}
                        description={description}
                        variants={variants}
                        variantsDirection={variantsDirection}
                        variantsBackground={variantsBackground}
                        component={component}
                    />
                )
            )}
        </>
    )
}

export default Examples
