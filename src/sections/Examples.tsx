import React, { ComponentClass, FunctionComponent, ReactElement } from 'react'
import { ContentLayout } from '../layouts'
import { ExampleConfig } from '../StoryCreator'
import SectionHeadline from '../basicElements/SectionHeadline'
import { Example } from './index'

type Props<P> = {
    examples: ExampleConfig<P>[]
    component: FunctionComponent<P> | ComponentClass<P>
}

const Examples = <P,>({ examples, component }: Props<P>): ReactElement => {
    return (
        <>
            <ContentLayout style={{ marginVertical: 32 }}>
                <SectionHeadline>Examples</SectionHeadline>
            </ContentLayout>
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
